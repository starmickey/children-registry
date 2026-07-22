import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container flex flex-col justify-center items-center">
      <Typography level="h2" variant="gigantic-title">
        ¡Ups!
      </Typography>
      <p>Esa página no existe</p>
      <Button size="lg" className="mt-8">
        <Link href="/">Volver a Home</Link>
      </Button>
    </main>
  );
}
