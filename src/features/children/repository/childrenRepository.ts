import { prisma } from "@/lib/prisma";

export const searchChildren = async (searchString?: string) =>
  searchString && searchString.trim()
    ? prisma.child.findMany({
        where: {
          OR: [
            // 1. The first name or surname starts directly with the string
            { firstName: { startsWith: searchString, mode: "insensitive" } },
            { lastName: { startsWith: searchString, mode: "insensitive" } },

            // 2. A secondary word inside the field starts with the string (e.g., "Mary Jo")
            {
              firstName: { contains: ` ${searchString}`, mode: "insensitive" },
            },
            { lastName: { contains: ` ${searchString}`, mode: "insensitive" } },
          ],
          removedAt: null,
        },
        orderBy: {
          firstName: "asc",
        },
      })
    : prisma.child.findMany({
        where: { removedAt: null },
        orderBy: {
          firstName: "asc",
        },
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
              classroom: true,
            },
          },
        },
      },
      childRelationships: {
        where: {
          removedAt: null,
          relationshipType: {
            removedAt: null,
          },
          contact: {
            removedAt: null,
          },
        },
        include: {
          relationshipType: true,
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
      pinGrants: {
        where: {
          removedAt: null,
        },
        include: {
          pin: true,
        },
      },
    },
  });
