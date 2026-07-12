import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { childIdSchema } from "@/lib/schemas";
import { CakeIcon, DotIcon, PhoneIcon, Star, User } from "lucide-react";
import { notFound } from "next/navigation";

export default async function ResumePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const parsing = childIdSchema.safeParse(await params);

  if (!parsing.success) {
    notFound();
  }

  const { id } = parsing.data;

  const child = await prisma.child.findUnique({
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
          }
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
          }
        },
      },
      pinOtorgations: {
        where: {
          removedAt: null,
        },
        include: {
          pin: true,
        },
      }
    },
  });

  if (!child) {
    notFound();
  }

  const latestRegistration = child.registrations[0];
  const latestClass = latestRegistration?.class;
  const latestClassRoom = latestClass?.classRoom;

  return (
    <section className="base-layout">
      <div className="flex w-full justify-end">
        {latestClassRoom && (
          <Badge>{latestClassRoom.alias ?? latestClassRoom.name}</Badge>
        )}
      </div>

      <h1 className="base-title">
        {child.firstName} {child.lastName}
      </h1>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 w-full max-w-full">
        <Card className="w-full max-w-md text-left">
          <CardHeader>
            <CardTitle>
              <h2>General</h2>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-[auto_1fr] items-center gap-2">
              <User />
              {child.identityCardNumber}
              <CakeIcon />
              <div className="w-full text-left">
                {child.birthDate?.toLocaleDateString("es-ES")}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              <h2>Contactos</h2>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {child.childRelations.map((relation, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <PhoneIcon />
                <span>{relation.contact.phones.map((phone) => phone.number).join(", ")}</span>
                <DotIcon />
                <span className="text-muted">{relation.contact.firstName} {relation.contact.lastName} ({relation.relationShipType.name})</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              <h2>Insignias</h2>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {child.pinOtorgations.map((otorgation, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <Star />
                <span>{otorgation.pin.name}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </section>
  );
}
