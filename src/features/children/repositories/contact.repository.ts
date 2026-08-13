import { prisma } from "@/lib/prisma";
import { CreateContactDto } from "../types";
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
};
