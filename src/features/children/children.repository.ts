import { prisma } from "@/lib/prisma";

type SearchChildrenParams = {
  search?: string;
  classroomId?: number;
};

export const searchChildren = async (params: SearchChildrenParams) =>
  prisma.child
    .findMany({
      where: {
        ...(params.search &&
          params.search.trim() && {
            OR: [
              // 1. The first name or surname starts directly with the string
              {
                firstName: { startsWith: params.search, mode: "insensitive" },
              },
              { lastName: { startsWith: params.search, mode: "insensitive" } },

              // 2. A secondary word inside the field starts with the string (e.g., "Mary Jo")
              {
                firstName: {
                  contains: ` ${params.search}`,
                  mode: "insensitive",
                },
              },
              {
                lastName: {
                  contains: ` ${params.search}`,
                  mode: "insensitive",
                },
              },
            ],
          }),
        removedAt: null,
      },
      include: {
        ...(params.classroomId && {
          registrations: {
            where: { removedAt: null },
            orderBy: { createdAt: "desc" },
            take: 1,
            include: {
              class: {
                include: {
                  classroom: true,
                },
              },
            },
          },
        }),
      },
      orderBy: {
        firstName: "asc",
      },
    })
    .then((children) => 
      children.filter(
        (child) =>
          params.classroomId == null ||
          child.registrations?.[0]?.class?.classroom.id === params.classroomId,
      )
    );

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
          createdAt: "desc",
        },
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
