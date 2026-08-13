import z from "zod";

export const createChildSchema = z.object({
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
  contacts: z
    .array(
      z.object({
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
              number: z.string().optional(),
            }),
          )
          .optional(),
      }),
    )
    .optional(),
});

export const defaultCreateChildContactValues = {
  firstName: "",
  lastName: "",
  relationShip: 0,
  phones: [
    {
      number: "",
    },
  ],
};

export const defaultCreateChildValues: Partial<CreateChildInput> = {
  contacts: [defaultCreateChildContactValues],
};

export type CreateChildInput = z.infer<typeof createChildSchema>;
export type CreateChildOutput = z.output<typeof createChildSchema>;
