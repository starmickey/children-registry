"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function ChildrenFetchAllRegisteredButton() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function handleClick(): void {
    const params = new URLSearchParams(searchParams);

    params.set("ya", "true");

    router.replace(`${pathname}?${params.toString()}`);

    console.log(params.toString())
  }

  return (
    <Button
      type="button"
      variant="outline"
      className="mt-6 w-full h-16"
      onClick={handleClick}
    >
      Buscar en años anteriores
    </Button>
  );
}
