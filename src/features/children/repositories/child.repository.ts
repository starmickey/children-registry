// src/features/children/repositories/child.repository.ts
import { prisma } from "@/lib/prisma";

export const childRepository = {
  /**
   * Fetches unique children registered in a specific academic year.
   * Leverages Prisma's relational filtering to execute SQL INNER JOIN / EXISTS clauses.
   */
  async findRegisteredByYear(filters?: {
    year?: number;
    classroomId?: number;
    searchQuery?: string;
  }) {
    const { year, classroomId, searchQuery } = filters ?? {};

    return await prisma.child.findMany({
      // 1. SELECT PRUNING: Only pull fields needed by the UI (avoids SELECT *)
      select: {
        id: true,
        firstName: true,
        lastName: true,
        // Include matching classroom details for context
        registrations: {
          where: {
            class: {
              ...(year && {
                year,
              }),
              ...(classroomId && {
                classroom: {
                  id: classroomId,
                },
              }),
            },
          },
          include: {
            class: {
              include: {
                classroom: {},
              },
            },
          },
        },
      },

      // 2. INNER JOIN / RELATION FILTER: Evaluates at the DB level
      where: {
        registrations: {
          some: {
            class: {
              year,
              classroom: {
                ...(classroomId ? { id: classroomId } : {}),
              },
            },
          },
        },
        // Optional search filter by name
        ...(searchQuery
          ? {
              OR: [
                { alias: { contains: searchQuery, mode: "insensitive" } },
                { firstName: { contains: searchQuery, mode: "insensitive" } },
                { lastName: { contains: searchQuery, mode: "insensitive" } },
              ],
            }
          : {}),
      },

      // 3. SORTING: Sort by last name then first name
      orderBy: [{ firstName: "asc" }, { lastName: "asc" }],
    });
  },

  async getChildById(id: number) {
    return prisma.child.findUnique({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        alias: true,
        birthDate: true,
        identityCardNumber: true,
        firstClassDate: true,
        address: true,
      },
      where: { id, removedAt: null },
    });
  },

  async getChildRelationships(childId: number) {
    return prisma.relationship.findMany({
      select: {
        childId: true,
        relationshipType: {
          select: {
            id: true,
            name: true,
          },
        },
        contact: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            identityCardNumber: true,
            phones: {
              where: {
                removedAt: null,
              },
            },
          },
        },
      },
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
    });
  },

  async getChildPinGrants(childId: number) {
    return prisma.pinGrant.findMany({
      select: {
        childId: true,
        grantedAt: true,
        pin: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      where: {
        childId,
        removedAt: null,
      },
      orderBy: [
        {
          grantedAt: "desc",
        },
        { createdAt: "desc" },
      ],
    });
  },

  async getChildPermissionTypes(childId: number) {
    return prisma.permissionType.findMany({
      where: {
        enabled: true,
        removedAt: null,
      },
      select: {
        id: true,
        name: true,
        shortName: true,
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
  },

  async getChildLatestRegistration(childId: number) {
    return prisma.registration.findFirst({
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
  },

  async getDiseases(childId: number) {
    return prisma.diseaseAsignation.findMany({
      select: {
        childId: true,
        diseaseId: true,
        notes: true,
        disease: {
          select: {
            id: true,
            name: true,
            description: true,
          },
        },
      },
      where: {
        childId,
        removedAt: null,
        disease: {
          removedAt: null,
        },
      },
    });
  },
};

export type RegisteredChildDbResult = Awaited<
  ReturnType<typeof childRepository.findRegisteredByYear>
>[number];

export type GetChildByIdDbResult = Awaited<
  ReturnType<typeof childRepository.getChildById>
>;

export type GetChildRelationshipsDbResult = Awaited<
  ReturnType<typeof childRepository.getChildRelationships>
>;

export type GetChildPinGrantsDbResult = Awaited<
  ReturnType<typeof childRepository.getChildPinGrants>
>;

export type GetChildPermissionTypesDbResult = Awaited<
  ReturnType<typeof childRepository.getChildPermissionTypes>
>;

export type GetChildLatestRegistrationDbResult = Awaited<
  ReturnType<typeof childRepository.getChildLatestRegistration>
>;

export type GetChildDiseaseAssignationsDbResult = Awaited<
  ReturnType<typeof childRepository.getDiseases>
>;
