import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { getChildResumeParamsSchema } from "@/features/children/schemas/childrenSchemas";
import { getChildResumeService } from "@/features/children/services/getChildResume";
import { CakeIcon, PhoneIcon, Star, User } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft as ArrowLeft } from "lucide-react";

export default async function ResumePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const parsing = getChildResumeParamsSchema.safeParse(await params);

  if (!parsing.success) {
    notFound();
  }

  const { id } = parsing.data;

  const child = await getChildResumeService(id);

  if (!child) {
    notFound();
  }

  return (
    <div className="base-layout">
      <div className="centered-layout">
        <header className="flex w-full justify-between items-center">
          <Link href="/children">
            <Button variant="ghost" size="icon-sm">
              <ArrowLeft />
            </Button>
          </Link>
          {child.class?.classRoom && (
            <Badge>
              {child.class.classRoom.alias ?? child.class.classRoom.name}
            </Badge>
          )}
        </header>

        <main className="min-w-full">
          <h1 className="title">
            {child.firstName} {child.lastName}
          </h1>

          <section className="grid grid-cols-1 gap-4 w-full">
            <Card>
              <CardHeader>
                <CardTitle role="heading" aria-level={2}>
                  General
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Item size="sm">
                  <ItemMedia variant="icon">
                    <User />
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle>{child.identityCardNumber}</ItemTitle>
                  </ItemContent>
                </Item>
                <Item size="sm">
                  <ItemMedia variant="icon">
                    <CakeIcon />
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle>
                      {child.birthDate?.toLocaleDateString("es-ES")}
                    </ItemTitle>
                  </ItemContent>
                </Item>
              </CardContent>
            </Card>

            {child.contacts.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle role="heading" aria-level={2}>
                    Contactos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {child.contacts.map((contact, idx) => (
                    <Item key={idx}>
                      <ItemMedia variant="icon">
                        <PhoneIcon />
                      </ItemMedia>
                      <ItemContent>
                        <ItemTitle>
                          {contact.phones.map((phone, i) => (
                            <div key={i}>{phone.number}</div>
                          ))}
                        </ItemTitle>
                        <ItemDescription>
                          {contact.firstName} {contact.lastName} (
                          {contact.relationShip})
                        </ItemDescription>
                      </ItemContent>
                    </Item>
                  ))}
                </CardContent>
              </Card>
            )}

            {child.pins.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle role="heading" aria-level={2}>
                    Insignias
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {child.pins.map((pin, idx) => (
                    <Item key={idx} size="sm">
                      <ItemMedia variant="icon">
                        <Star />
                      </ItemMedia>
                      <ItemContent>
                        <ItemTitle>{pin.pinName}</ItemTitle>
                      </ItemContent>
                    </Item>
                  ))}
                </CardContent>
              </Card>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
