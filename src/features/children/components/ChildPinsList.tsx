import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Item,
  ItemMedia,
  ItemContent,
  ItemTitle,
  ItemSeparator,
} from "@/components/ui/item";
import { Calendar, Star } from "lucide-react";
import { PinDto } from "../types";
import { calculateAge } from "@/lib/utils";

export default async function ChildPinsList({
  pins,
  firstClassDate,
}: {
  pins: PinDto[];
  firstClassDate?: Date;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle role="heading" aria-level={2}>
          Insignias
        </CardTitle>
      </CardHeader>
      <CardContent>
        {pins.length > 0 ? (

          pins.map((pin, idx) => (
            <Item key={idx} size="sm">
            <ItemMedia variant="icon">
              <Star />
            </ItemMedia>
            <ItemContent>
            <ItemTitle>{pin.name}</ItemTitle>
            </ItemContent>
            </Item>
          ))
        ) : (
           <Item  size="sm">
            <ItemContent>
            No ha recibido insignias aún
            </ItemContent>
            </Item>
        )}

        {firstClassDate && (
          <>
            <ItemSeparator />

            <Item size="sm" className="text-muted-foreground">
              <ItemMedia variant="icon">
                <Calendar />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>
                  Inicio en IAM: {firstClassDate?.toLocaleDateString("es-ES")} (
                  {calculateAge(firstClassDate)} años)
                </ItemTitle>
              </ItemContent>
            </Item>
          </>
        )}
      </CardContent>
    </Card>
  );
}
