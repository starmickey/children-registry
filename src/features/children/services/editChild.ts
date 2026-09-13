import { prisma } from "@/lib/prisma";
import {
  childRepository,
  GetChildRelationshipsDbResult,
} from "../repositories/child.repository";
import { EditChildOutput } from "../schemas/update-child-schema";
import { EditChildDto, UpsertContactDto } from "../types";
import { contactRepository } from "../repositories/contact.repository";

function mapToEditChildDto(data: EditChildOutput): EditChildDto {
  return {
    id: data.id,
    firstName: data.firstName,
    lastName: data.lastName,
    alias: data.alias ?? undefined,
    address: data.address ?? undefined,
    identityCardNumber: data.identityCardNumber ?? undefined,
    birthDate: data.birthDate ?? undefined,
  };
}

function mapToUpsertContactDto(
  data: NonNullable<EditChildOutput["contacts"]>[number],
): UpsertContactDto {
  if (!data.firstName || !data.lastName) {
    throw new Error("Contact first and last names are required");
  }

  return {
    id: data.id,
    firstName: data.firstName,
    lastName: data.lastName,
    identityCardNumber: data.identityCardNumber ?? undefined,
  };
}

type ContactAction =
  | (NonNullable<EditChildOutput["contacts"]>[number] & {
      action: "create";
    })
  | (NonNullable<EditChildOutput["contacts"]>[number] & {
      action: "update";
    })
  | {
      action: "delete";
      id: number;
      relationShip: number;
    };

function defineContactsActions(
  previous: GetChildRelationshipsDbResult,
  current: EditChildOutput["contacts"],
): ContactAction[] {
  return [
    ...(current?.map((newContact) => ({
      ...newContact,
      action:
        newContact.id && previous.find((p) => p.contact.id === newContact.id)
          ? ("update" as const)
          : ("create" as const),
    })) ?? []),

    ...previous
      .filter((p) => !current?.find((c) => c.id === p.contact.id))
      .map((p) => ({
        action: "delete" as const,
        id: p.contact.id,
        relationShip: p.relationshipType.id,
      })),
  ];
}

type ContactInput = NonNullable<EditChildOutput["contacts"]>[number];
type PhoneInput = NonNullable<ContactInput["phones"]>[number];
type PreviousContact = GetChildRelationshipsDbResult[number];

function getValidPhones(contact: ContactInput) {
  return (contact.phones ?? []).filter(
    (phone): phone is PhoneInput & { number: string } =>
      Boolean(phone.number?.trim()),
  );
}

function findPreviousContact(
  previousContacts: GetChildRelationshipsDbResult,
  contactId: number,
): PreviousContact | undefined {
  return previousContacts.find((contact) => contact.contact.id === contactId);
}

  /**
   * Synchronizes a contact's phones. Existing IDs are updated, new entries are
   * inserted, and active phones omitted from the form are soft-deleted.
   */
function syncContactPhones(
  contactId: number,
  contact: ContactInput,
  previousContact: PreviousContact | undefined,
  tx: Parameters<typeof contactRepository.addPhone>[2],
): Promise<unknown>[] {
  const validPhones = getValidPhones(contact);

  const phoneTasks = validPhones.map((phone) => {
    const previousPhone = previousContact?.contact.phones.find(
      (savedPhone) => savedPhone.id === phone.id,
    );

    return previousPhone
      ? contactRepository.updatePhone(previousPhone.id, phone.number, tx)
      : contactRepository.addPhone(contactId, phone.number, tx);
  });

  if (!previousContact) {
    return phoneTasks;
  }

  const submittedPhoneIds = new Set(
    validPhones.flatMap((phone) => (phone.id ? [phone.id] : [])),
  );

  const removedPhoneTasks = previousContact.contact.phones
    .filter((phone) => !submittedPhoneIds.has(phone.id))
    .map((phone) => contactRepository.removePhone(phone.id, tx));

  return [...phoneTasks, ...removedPhoneTasks];
}

function syncContactRelationship(
  childId: number,
  contactId: number,
  relationshipTypeId: number,
  previousContact: PreviousContact | undefined,
  tx: Parameters<typeof childRepository.addRelationship>[3],
): Promise<unknown>[] {
  const previousRelationshipId = previousContact?.relationshipType.id;

  if (!previousRelationshipId || previousRelationshipId === relationshipTypeId) {
    return [];
  }

  return [
    childRepository.removeRelationship(
      childId,
      contactId,
      previousRelationshipId,
      tx,
    ),
    childRepository.addRelationship(childId, contactId, relationshipTypeId, tx),
  ];
}

async function processContactAction(
  childId: number,
  contactData: ContactAction,
  previousContacts: GetChildRelationshipsDbResult,
  tx: Parameters<typeof contactRepository.addPhone>[2],
) {
    if (contactData.action === "create") {
      const contact = await contactRepository.create(
        mapToUpsertContactDto(contactData),
        tx,
      );

      const tasks: Promise<unknown>[] = [
        childRepository.addRelationship(
          childId,
          contact.id,
          contactData.relationShip,
          tx,
        ),
        ...syncContactPhones(contact.id, contactData, undefined, tx),
      ];

      await Promise.all(tasks);
      return;
    }

    if (contactData.action === "update") {
      const contact = await contactRepository.upsert(
        mapToUpsertContactDto(contactData),
        tx,
      );
      const previousContact = findPreviousContact(previousContacts, contact.id);

      const tasks: Promise<unknown>[] = [
        ...syncContactRelationship(
          childId,
          contact.id,
          contactData.relationShip,
          previousContact,
          tx,
        ),
        ...syncContactPhones(contact.id, contactData, previousContact, tx),
      ];

      await Promise.all(tasks);
      return;
    }

    const contact = await contactRepository.delete(contactData.id, tx);

    await Promise.all([
      contactRepository.removePhones(contact.id, tx),
      childRepository.removeRelationship(
        childId,
        contact.id,
        contactData.relationShip,
        tx,
      ),
    ]);
}

export async function editChild(data: EditChildOutput) {
  return await prisma.$transaction(async (tx) => {
    // Create the child
    const child = await childRepository.edit(mapToEditChildDto(data), tx);

    // Register to class
    const registerClassPromise = childRepository.upsertRegistrationToClass(
      child.id,
      data.classId,
      tx,
    );

    // Update contacts
    const previousContacts = await childRepository.getChildRelationships(
      data.id,
    );

    const contactsActions = defineContactsActions(
      previousContacts,
      data.contacts,
    );

    const contactPromises = contactsActions.map((contactData) =>
      processContactAction(child.id, contactData, previousContacts, tx),
    );

    // Fire class registration and all contact threads concurrently
    await Promise.all([registerClassPromise, ...contactPromises]);

    return child;
  });
}
