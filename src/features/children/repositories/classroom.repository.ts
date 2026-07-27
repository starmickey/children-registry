import { prisma } from "@/lib/prisma";

export const classroomRepository = {
  async getClassesByYear(year: number) {
    return prisma.class.findMany({
      select: {
        id: true,
        year: true,
        classroom: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      where: {
        year,
        removedAt: null,
      },
    });
  },
};
