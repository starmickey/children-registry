import Header, { ReturnButton } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaCircleCheck } from "react-icons/fa6";

export default function Page() {
  return (
    <>
      <Header>
        <ReturnButton href="/children" />
      </Header>
      <main className="container flex flex-col items-center mt-32">
        <p className="text-3xl text-success font-bold font-heading mb-16 text-center">
          ¡Guardado!
        </p>

        <FaCircleCheck className="w-32 h-32 text-success mb-16" />

        <div className="flex flex-col items-center gap-4">
          <Link href="/children">
            <Button size="lg" className="w-24">
              Volver
            </Button>
          </Link>
        </div>
      </main>
    </>
  );
}
