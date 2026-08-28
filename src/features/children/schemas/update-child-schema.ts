import z from "zod";

// BASE CHILD SCHEMA

export const actionSchema = z.enum(["create", "update", "delete"]);

export const contactSchema = z.object({
  id: z.number().optional(),
  firstName: z
    .string({ error: "Campo obligatorio" })
    .min(1, { message: "Campo obligatorio" })
    .transform((firstName) => firstName.trim()),
  lastName: z
    .string({ error: "Campo obligatorio" })
    .min(1, { message: "Campo obligatorio" })
    .transform((lastName) => lastName.trim()),
  identityCardNumber: z.string().optional(),
  relationShip: z.coerce
    .number({ error: "Campo obligatorio" })
    .min(1, { message: "Campo obligatorio" }),
  phones: z
    .array(
      z.object({
        id: z.number().optional(),
        number: z.string().optional(),
      }),
    )
    .optional(),
});

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
  birthDate: z.date().optional(),
  contacts: z.array(contactSchema).optional(),
});

// CREATE CHILD

export const createChildSchema = baseChildSchema;

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

export const editChildSchema = baseChildSchema.extend({
  id: z.number(),
});

export type EditChildInput = z.infer<typeof editChildSchema>;
export type EditChildOutput = z.output<typeof editChildSchema>;
