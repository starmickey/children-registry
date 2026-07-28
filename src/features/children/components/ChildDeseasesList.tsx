import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChildDiseaseDto } from "../types";
import { Item, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item";
import { CiMedicalCase } from "react-icons/ci";

export default function ChildDiseasesList({
  diseases,
}: {
  diseases: ChildDiseaseDto[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle role="heading" aria-level={2}>
          Enfermedades
        </CardTitle>
      </CardHeader>
      <CardContent>
        {diseases.length > 0 ? (
          diseases.map((disease, idx) => (
            <Item key={idx} size="sm" className="text-destructive">
              <ItemMedia variant="icon">
                <CiMedicalCase />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>{disease.name}</ItemTitle>
              </ItemContent>
            </Item>
          ))
        ) : (
          <Item size="sm" className="text-success">
            <ItemContent>Sin enfermedades registradas</ItemContent>
          </Item>
        )}
      </CardContent>
    </Card>
  );
}
