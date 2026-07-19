import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Item, ItemMedia, ItemContent, ItemTitle } from "@/components/ui/item";
import { IdentityCardNumberFormat } from "@/components/ui/numeric-format";
import { calculateAge } from "@/lib/utils";
import { NotebookIcon, CakeIcon } from "lucide-react";
import { ChildDTO } from "../children.dto";

export default function ChildGeneralDataCard({ child }: { child: ChildDTO }) {
  return (
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
      </CardContent>
    </Card>
  );
}
