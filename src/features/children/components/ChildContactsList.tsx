import { WhatsAppButton, PhoneCallButton } from "@/components/ui/social-buttons";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Item,
  ItemMedia,
  ItemContent,
  ItemTitle,
  ItemDescription,
} from "@/components/ui/item";
import {
  PhoneFormat,
  IdentityCardNumberFormat,
} from "@/components/ui/numeric-format";
import { UserIcon, PhoneIcon } from "lucide-react";
import { FaWhatsapp as WhatsAppIcon } from "react-icons/fa";
import { getChildContactsService } from "../children.service";

export default async function ChildContactsList({
  childId,
}: {
  childId: number;
}) {
  const contacts = await getChildContactsService(childId);

  const sortedContacts = [
    ...(contacts.filter((c) => c.relationShip.toLowerCase() === "madre") ?? []),
    ...(contacts.filter((c) => c.relationShip.toLowerCase() === "padre") ?? []),
    ...(contacts.filter(
      (c) =>
        c.relationShip.toLowerCase() !== "madre" &&
        c.relationShip.toLowerCase() !== "padre",
    ) ?? []),
  ];

  if (contacts.length === 0) {
    return <></>;
  }

  return (
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
                {contact.firstName} {contact.lastName} ({contact.relationShip})
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
  );
}
