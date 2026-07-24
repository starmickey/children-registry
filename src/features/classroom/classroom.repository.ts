import { prisma } from "@/lib/prisma";

export async function getClassrooms() {
  return prisma.classroom.findMany({
    where: {
      removedAt: null,
    },
  });
}
