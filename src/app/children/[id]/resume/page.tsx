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
import {
  CakeIcon,
  NotebookIcon,
  PhoneIcon,
  Star,
  UserIcon,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft as ArrowLeft } from "lucide-react";
import {
  IdentityCardNumberFormat,
  PhoneFormat,
} from "@/components/ui/numeric-format";
import { calculateAge } from "@/lib/utils";
import { PhoneCallButton, WhatsAppButton } from "@/components/social-buttons";
import { FaWhatsapp as WhatsAppIcon } from "react-icons/fa";
import { Typography } from "@/components/ui/typography";

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

  const sortedContacts = [
    ...(child.contacts.filter(
      (c) => c.relationShip.toLowerCase() === "madre",
    ) ?? []),
    ...(child.contacts.filter(
      (c) => c.relationShip.toLowerCase() === "padre",
    ) ?? []),
    ...(child.contacts.filter(
      (c) =>
        c.relationShip.toLowerCase() !== "madre" &&
        c.relationShip.toLowerCase() !== "padre",
    ) ?? []),
  ];

  return (
    <>
      <header className="header flex w-full justify-between items-center">
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
      
      <main className="container">
        <Typography level="h1" variant="main-title">
          {child.firstName} {child.lastName}
        </Typography>

        <section className="grid grid-cols-1 gap-4 w-full">
          <Card>
            <CardHeader>
              <CardTitle role="heading" aria-level={2}>
                General
              </CardTitle>
            </CardHeader>
            <CardContent>
              {child.identityCardNumber && (
                <Item size="sm">
                  <ItemMedia variant="icon">
                    <NotebookIcon />
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle>
                      <span className="font-bold">DNI:</span>{" "}
                      <IdentityCardNumberFormat
                        value={child.identityCardNumber}
                      />
                    </ItemTitle>
                  </ItemContent>
                </Item>
              )}
              {child.birthDate && (
                <Item size="sm">
                  <ItemMedia variant="icon">
                    <CakeIcon />
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle>
                      {child.birthDate?.toLocaleDateString("es-ES")}{" "}
                      <span className="text-muted-foreground">
                        ({calculateAge(child.birthDate)} años)
                      </span>
                    </ItemTitle>
                  </ItemContent>
                </Item>
              )}
            </CardContent>
          </Card>

          {child.contacts.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle role="heading" aria-level={2}>
                  Autorizados a retirarlo adicionales
                </CardTitle>
              </CardHeader>
              <CardContent>
                {sortedContacts.map((contact, idx) => (
                  <Item key={idx}>
                    <ItemMedia variant="icon">
                      <UserIcon />
                    </ItemMedia>
                    <ItemContent>
                      <ItemTitle>
                        {contact.firstName} {contact.lastName} (
                        {contact.relationShip})
                      </ItemTitle>
                      <ItemDescription className="flex flex-col gap-1">
                        {contact.phones.map((phone, i) => (
                          <PhoneFormat key={i} value={phone.number} />
                        ))}
                        {contact.identityCardNumber && (
                          <span>
                            DNI:{" "}
                            <IdentityCardNumberFormat
                              value={contact.identityCardNumber}
                            />
                          </span>
                        )}
                      </ItemDescription>
                    </ItemContent>
                    {contact.phones.length > 0 && (
                      <>
                        <ItemMedia variant="icon">
                          <WhatsAppButton
                            type="button"
                            variant="link"
                            size="icon-sm"
                            phone={contact.phones[0].number}
                            className="items-start"
                          >
                            <WhatsAppIcon />
                          </WhatsAppButton>
                        </ItemMedia>
                        <ItemMedia variant="icon">
                          <PhoneCallButton
                            type="button"
                            variant="link"
                            size="icon-sm"
                            phone={contact.phones[0].number}
                            className="items-start"
                          >
                            <PhoneIcon />
                          </PhoneCallButton>
                        </ItemMedia>
                      </>
                    )}
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
    </>
  );
}
