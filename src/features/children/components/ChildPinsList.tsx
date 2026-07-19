import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Item, ItemMedia, ItemContent, ItemTitle } from "@/components/ui/item";
import { Star } from "lucide-react";
import { getChildPinsService } from "../children.service";

export default async function ChildPinsList({ childId }: { childId: number }) {
  const pins = await getChildPinsService(childId);

  if (pins.length === 0) {
    return <></>;
  }
  
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
              <ItemTitle>{pin.pinName}</ItemTitle>
            </ItemContent>
          </Item>
        ))}
      </CardContent>
    </Card>
  );
}
