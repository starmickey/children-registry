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

export const getChildById = async (id: number) =>
  prisma.child.findUnique({
    where: { id, removedAt: null },
  });

export const getChildContacts = async (childId: number) =>
  prisma.relationship.findMany({
    where: {
      childId,
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
  });

export const getChildPins = async (childId: number) =>
  prisma.pinGrant.findMany({
    where: {
      childId,
      removedAt: null,
    },
    include: {
      pin: true,
    },
  });

export const getChildPermissions = async (childId: number) =>
  prisma.permissionType.findMany({
    where: {
      enabled: true,
      removedAt: null,
    },
    include: {
      permissions: {
        where: {
          childId,
          removedAt: null,
        },
        take: 1,
        orderBy: {
          createdAt: "desc"
        }
      },
    },
  });

export const getChildClassroom = async (childId: number) =>
  prisma.registration.findFirst({
    where: {
      childId,
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
  });
