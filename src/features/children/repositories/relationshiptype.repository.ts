import { prisma } from "@/lib/prisma";

export const relationshipTypeRepository = {
  async getRelationShipTypes() {
    return prisma.relationshipType.findMany({
      select: {
        id: true,
        name: true,
      },
      where: {
        removedAt: null,
      },
    });
  },
};
