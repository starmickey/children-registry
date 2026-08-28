import { prisma } from "@/lib/prisma";
import { CreateContactDto, UpsertContactDto } from "../types";
import { Prisma } from "../../../../generated/prisma/client";

export const contactRepository = {
  async create(
    data: CreateContactDto,
    client: Prisma.TransactionClient = prisma,
  ) {
    return client.contact.create({
      data,
    });
  },

  async upsert(
    { id, ...data }: UpsertContactDto,
    client: Prisma.TransactionClient = prisma,
  ) {
    return client.contact.upsert({
      where: { id, removedAt: null },
      update: data,
      create: data,
    });
  },

  async delete(id: number, client: Prisma.TransactionClient = prisma) {
    return client.contact.update({
      where: { id, removedAt: null },
      data: {
        removedAt: new Date(),
      },
    });
  },

  async addPhone(
    contactId: number,
    phoneNumber: string,
    client: Prisma.TransactionClient = prisma,
  ) {
    return client.phone.create({
      data: {
        number: phoneNumber,
        contactId,
      },
    });
  },

  async updatePhone(
    id: number,
    phoneNumber: string,
    client: Prisma.TransactionClient = prisma,
  ) {
    return client.phone.update({
      where: { id, removedAt: null },
      data: { number: phoneNumber },
    });
  },

  async removePhone(id: number, client: Prisma.TransactionClient = prisma) {
    return client.phone.update({
      where: { id, removedAt: null },
      data: { removedAt: new Date() },
    });
  },

  async removePhones(contactId: number, client: Prisma.TransactionClient = prisma) {
    return client.phone.updateMany({
      where: { contactId, removedAt: null },
      data: { removedAt: new Date() },
    });
  },
};
