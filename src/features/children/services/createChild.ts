import { prisma } from "@/lib/prisma";
import { childRepository } from "../repositories/child.repository";
import { CreateChildOutput } from "../schemas/update-child-schema";
import { CreateChildDto, CreateContactDto } from "../types";
import { contactRepository } from "../repositories/contact.repository";

function mapToCreateChildDto(data: CreateChildOutput): CreateChildDto {
  return {
    firstName: data.firstName,
    lastName: data.lastName,
    alias: data.alias ?? undefined,
    address: data.address ?? undefined,
    identityCardNumber: data.identityCardNumber ?? undefined,
    birthDate: data.birthDate ?? undefined,
  };
}

function mapToCreateContactDto(
  data: NonNullable<CreateChildOutput["contacts"]>[number],
): CreateContactDto {
  return {
    firstName: data.firstName,
    lastName: data.lastName,
    identityCardNumber: data.identityCardNumber ?? undefined,
  };
}

export async function createChild(data: CreateChildOutput) {
  return await prisma.$transaction(async (tx) => {
    // Create the child
    const child = await childRepository.create(mapToCreateChildDto(data), tx);

    // Register to class
    const registerClassPromise = childRepository.registerToClass(
      child.id,
      data.classId,
      tx,
    );

    const contactPromises = (data.contacts ?? []).map(async (contactData) => {
      // Create contact
      const contact = await contactRepository.create(
        mapToCreateContactDto(contactData),
        tx,
      );

      const contactSubTasks: Promise<unknown>[] = [];

      // Relate contact to child
      if (contactData.relationShip) {
        contactSubTasks.push(
          childRepository.addRelationship(
            child.id,
            contact.id,
            contactData.relationShip,
            tx,
          ),
        );
      }

      // Create phone numbers
      const validPhones = (contactData.phones ?? []).filter((p) =>
        p.number?.trim(),
      );

      for (const phone of validPhones) {
        contactSubTasks.push(
          contactRepository.addPhone(contact.id, phone.number!, tx),
        );
      }

      // Execute relationship and phones concurrently
      await Promise.all(contactSubTasks);
    });

    // Fire class registration and all contact threads concurrently
    await Promise.all([registerClassPromise, ...contactPromises]);

    return child;
  });
}
