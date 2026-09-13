import { baseChildSchema, contactSchema, createChildSchema } from "../update-child-schema";

describe("Update child schema tests", () => {
  describe("baseChildSchema tests", () => {
    const validData = {
      firstName: "John",
      lastName: "Doe",
      alias: "Johnny",
      address: "123 Main St",
      classId: 2,
      identityCardNumber: "123456789",
      birthDate: new Date("2010-01-01"),
      contacts: [
        {
          firstName: "Jane",
          lastName: "Doe",
          relationShip: 1,
          phones: [{ number: "123-456-7890" }],
        },
      ],
    };

    it("should validate a valid child object", () => {
      const result = baseChildSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });
  });

  describe("createChildSchema tests", () => {
    const validData = {
      firstName: "John",
      lastName: "Doe",
      alias: "Johnny",
      address: "123 Main St",
      classId: 2,
      identityCardNumber: "123456789",
      birthDate: new Date("2010-01-01"),
      contacts: [
        {
          firstName: "Jane",
          lastName: "Doe",
          relationShip: 1,
          phones: [{ number: "123-456-7890" }],
        },
      ],
    };

    it("should remove empty contacts from the array", () => {
      const result = createChildSchema.safeParse({
        ...validData,
        contacts: [
          ...validData.contacts,
          {
            firstName: "",
            lastName: "",
            relationShip: null,
            phones: [],
          },
        ],
      });

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.contacts?.length).toBe(1);
      }
    });
  });

  describe("contactSchema tests", () => {
    const validContact = {
      firstName: "Jane",
      lastName: "Doe",
      relationShip: 1,
      phones: [{ number: "123-456-7890" }],
    };

    it("should validate a valid contact object", () => {
      const result = contactSchema.safeParse(validContact);
      expect(result.success).toBe(true);
    });

    it("should pass if everything is empty", () => {
      const result = contactSchema.safeParse({
        firstName: "",
        lastName: "",
        relationShip: null,
        phones: [],
      });
      expect(result.success).toBe(true);
    });

    it("should fail if firstName is empty and lastName is not", () => {
      const result = contactSchema.safeParse({
        ...validContact,
        firstName: "",
      });
      expect(result.success).toBe(false);
    });

    it("should remove empty phones from the array", () => {
      const result = contactSchema.safeParse({
        ...validContact,

        phones: [{ number: "123-456-7890" }, { number: "" }],
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.phones?.length).toBe(1);
        expect(result.data.phones?.[0].number).toBe("123-456-7890");
      }
    });
  });
});
