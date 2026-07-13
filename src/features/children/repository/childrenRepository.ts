import { prisma } from "@/lib/prisma";

export const getChildren = async () =>
  prisma.child.findMany({
    where: { removedAt: null },
  });

export const getChildResume = async (id: number) =>
  prisma.child.findUnique({
    where: { id, removedAt: null },
    include: {
      registrations: {
        where: {
          removedAt: null,
          class: {
            removedAt: null,
          },
        },
        orderBy: [
          {
            class: {
              year: "desc",
            },
          },
          {
            createdAt: "desc",
          },
        ],
        take: 1,
        include: {
          class: {
            include: {
              classRoom: true,
            },
          },
        },
      },
      childRelations: {
        where: {
          removedAt: null,
          relationShipType: {
            removedAt: null,
          },
          contact: {
            removedAt: null,
          },
        },
        include: {
          relationShipType: true,
          contact: {
            include: {
              phones: {
                where: {
                  removedAt: null,
                },
              },
            },
          },
        },
      },
      pinOtorgations: {
        where: {
          removedAt: null,
        },
        include: {
          pin: true,
        },
      },
    },
  });
