import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Item, ItemMedia, ItemContent, ItemTitle } from "@/components/ui/item";
import { Check, X } from "lucide-react";
import { ChildPermissionDto } from "../types";

export default async function ChildPermissionList({
  permissions,
}: {
  permissions: ChildPermissionDto[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle role="heading" aria-level={2}>
          Autorizaciones
        </CardTitle>
      </CardHeader>
      <CardContent>
        {permissions.map((permission, idx) => (
          <Item
            key={idx}
            size="sm"
            className={permission.hasIt ? "text-success" : "text-destructive"}
          >
            <ItemMedia variant="icon">
              {permission.hasIt ? <Check /> : <X />}
            </ItemMedia>
            <ItemContent>
              <ItemTitle>{permission.name}</ItemTitle>
            </ItemContent>
          </Item>
        ))}
      </CardContent>
    </Card>
  );
}
