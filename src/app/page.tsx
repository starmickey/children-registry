import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  return (
    <div className="base-layout">
      <div className="centered-layout">
        <main className="min-w-full">
          <h1 className="title">Infancia y Adolescencia Misionera</h1>

          <section>
            <Link href="/children">
              <Card role="button">
                <CardHeader>
                  <CardTitle className="uppercase text-center font-bold">
                    Niños
                  </CardTitle>
                </CardHeader>
              </Card>
            </Link>
          </section>
        </main>
      </div>
    </div>
  );
}
