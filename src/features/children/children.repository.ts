import { prisma } from "@/lib/prisma";

type SearchChildrenParams = {
  search?: string;
  classroomId?: number;
};

export const searchChildren = async (params: SearchChildrenParams) => {
  let matchingChildIds: number[] | undefined = undefined;

  // 1. If classroomId filter is supplied, resolve child IDs whose LATEST registration matches it
  if (params.classroomId != null) {
    const latestRegistrations = await prisma.registration.findMany({
      where: {
        removedAt: null,
        child: { removedAt: null },
        class: { removedAt: null },
      },
      orderBy: [
        { childId: "asc" },
        { createdAt: "desc" },
      ],
      distinct: ["childId"], // Guarantees 1 row per child (their latest registration)
      select: {
        childId: true,
        class: {
          select: {
            classroomId: true,
          },
        },
      },
    });

    matchingChildIds = latestRegistrations
      .filter((reg) => reg.class.classroomId === params.classroomId)
      .map((reg) => reg.childId);
  }

  // 2. Fetch children at Database level
  return prisma.child.findMany({
    where: {
      removedAt: null,

      // Apply the latest classroom filter if active
      ...(matchingChildIds !== undefined && {
        id: { in: matchingChildIds },
      }),

      // Apply search query across names
      ...(params.search &&
        params.search.trim() && {
          OR: [
            // 1. First name or surname starts directly with search string
            { firstName: { startsWith: params.search, mode: "insensitive" } },
            { lastName: { startsWith: params.search, mode: "insensitive" } },

            // 2. Secondary word inside field starts with search string (e.g., "Mary Jo")
            { firstName: { contains: ` ${params.search}`, mode: "insensitive" } },
            { lastName: { contains: ` ${params.search}`, mode: "insensitive" } },
          ],
        }),
    },
    include: {
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
    },
    orderBy: {
      firstName: "asc",
    },
  });
};

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
