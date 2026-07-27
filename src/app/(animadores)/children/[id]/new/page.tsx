import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { User } from "lucide-react";

export default function Page() {
  return (
    <main className="container">
      <Card>
        <CardContent className="flex flex-col">
          <div className="flex">
            <div>
              <User className="h-5 mt-1.5 text-primary" />
            </div>
            <div>
              <Input placeholder="Nombre" />
              <Input placeholder="Apellido" />
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
