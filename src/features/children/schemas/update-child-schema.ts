import z from "zod";

// BASE CHILD SCHEMA

type CompleteContact = {
  id?: number;
  firstName: string;
  lastName: string;
  identityCardNumber?: string;
  relationShip: number;
  phones?: {
    id?: number;
    number?: string;
  }[];
};

function isCompleteContact<
  T extends { firstName?: string; lastName?: string; relationShip?: number },
>(contact: T): contact is T & CompleteContact {
  return Boolean(
    contact.firstName?.trim() &&
    contact.lastName?.trim() &&
    contact.relationShip &&
    contact.relationShip > 0,
  );
}

export const actionSchema = z.enum(["create", "update", "delete"]);

export const contactSchema = z
  .object({
    id: z.number().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    identityCardNumber: z.string().optional(),
    relationShip: z.coerce.number().optional(),
    phones: z
      .array(
        z.object({
          id: z.number().optional(),
          number: z.string().optional(),
        }),
      )
      .optional(),
  })
  .superRefine((data, ctx) => {
    const firstName = data.firstName?.trim() || "";
    const lastName = data.lastName?.trim() || "";
    const relationShip = data.relationShip;

    const hasFirst = firstName.length > 0;
    const hasLast = lastName.length > 0;
    const hasRelation =
      relationShip !== undefined && !isNaN(relationShip) && relationShip > 0;

    const isAllEmpty = !hasFirst && !hasLast && !hasRelation;
    const isAllFilled = hasFirst && hasLast && hasRelation;

    if (!isAllEmpty && !isAllFilled) {
      const message = "Campo obligatorio";

      if (!hasFirst) {
        ctx.addIssue({
          code: "custom",
          message,
          path: ["firstName"],
        });
      }
      if (!hasLast) {
        ctx.addIssue({
          code: "custom",
          message,
          path: ["lastName"],
        });
      }
      if (!hasRelation) {
        ctx.addIssue({
          code: "custom",
          message,
          path: ["relationShip"],
        });
      }
    }
  })
  .transform((data) => ({
    ...data,
    firstName: data.firstName?.trim(),
    lastName: data.lastName?.trim(),
    phones: data.phones?.filter((phone) => phone.number?.trim()),
  }));

export const baseChildSchema = z.object({
  firstName: z
    .string({ error: "Campo obligatorio" })
    .min(1, { message: "Campo obligatorio" })
    .transform((firstName) => firstName.trim()),
  lastName: z
    .string({ error: "Campo obligatorio" })
    .min(1, { message: "Campo obligatorio" })
    .transform((lastName) => lastName.trim()),
  alias: z.string().optional(),
  address: z.string().optional(),
  classId: z.coerce
    .number({ error: "Campo obligatorio" })
    .min(1, { message: "Campo obligatorio" }),
  identityCardNumber: z.string().optional(),
  birthDate: z.date().nullable().optional(),
  contacts: z.array(contactSchema).optional(),
});

// CREATE CHILD

export const createChildSchema = baseChildSchema.transform((data) => ({
  ...data,
  firstName: data.firstName.trim(),
  lastName: data.lastName.trim(),
  contacts: data.contacts?.filter(isCompleteContact),
}));

export const defaultCreateChildContactValues = {
  firstName: "",
  lastName: "",
  relationShip: null as unknown as number,
  phones: [
    {
      number: "",
    },
  ],
};

export const defaultCreateChildValues = {
  contacts: [defaultCreateChildContactValues],
};

export type CreateChildInput = z.infer<typeof createChildSchema>;
export type CreateChildOutput = z.output<typeof createChildSchema>;

// EDIT CHILD

export const editChildSchema = baseChildSchema
  .extend({
    id: z.number(),
  })
  .transform((data) => ({
    ...data,
    firstName: data.firstName.trim(),
    lastName: data.lastName.trim(),
    contacts: data.contacts?.filter(isCompleteContact),
  }));

export type EditChildInput = z.infer<typeof editChildSchema>;
export type EditChildOutput = z.output<typeof editChildSchema>;
