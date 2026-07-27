import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Item, ItemMedia, ItemContent, ItemTitle } from "@/components/ui/item";
import { Star } from "lucide-react";
import { PinDto } from "../types";

export default async function ChildPinsList({ pins }: { pins: PinDto[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle role="heading" aria-level={2}>
          Insignias
        </CardTitle>
      </CardHeader>
      <CardContent>
        {pins.map((pin, idx) => (
          <Item key={idx} size="sm">
            <ItemMedia variant="icon">
              <Star />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>{pin.name}</ItemTitle>
            </ItemContent>
          </Item>
        ))}
      </CardContent>
    </Card>
  );
}
