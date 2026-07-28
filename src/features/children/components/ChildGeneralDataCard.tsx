import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Item, ItemMedia, ItemContent, ItemTitle } from "@/components/ui/item";
import { IdentityCardNumberFormat } from "@/components/ui/numeric-format";
import { calculateAge } from "@/lib/utils";
import { NotebookIcon, CakeIcon, House, User } from "lucide-react";
import { ChildDto } from "../types";

export default function ChildGeneralDataCard({ child }: { child: ChildDto }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle role="heading" aria-level={2}>
          General
        </CardTitle>
      </CardHeader>
      <CardContent>
        {child.alias && (
          <Item size="sm">
            <ItemMedia variant="icon">
              <User />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>
                <span className="font-bold">Alias:</span> <i>{child.alias}</i>
              </ItemTitle>
            </ItemContent>
          </Item>
        )}
        {child.identityCardNumber && (
          <Item size="sm">
            <ItemMedia variant="icon">
              <NotebookIcon />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>
                <span className="font-bold">DNI:</span>{" "}
                <IdentityCardNumberFormat value={child.identityCardNumber} />
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
        {child.address && (
          <Item size="sm">
            <ItemMedia variant="icon">
              <House />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>{child.address}</ItemTitle>
            </ItemContent>
          </Item>
        )}
      </CardContent>
    </Card>
  );
}
