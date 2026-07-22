"use client"; // Error components must be Client Components

import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="container flex flex-col justify-center items-center">
      <Typography level="h2" variant="gigantic-title">
        ¡Error!
      </Typography>
      <p>Se produjo un error inesperado</p>
      <Button
        size="lg"
        className="mt-8"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Reintentar
      </Button>
    </main>
  );
}
