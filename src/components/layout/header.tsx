import { cn } from "@/lib/utils";
import { ChevronLeft as ArrowLeft } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { Button } from "../ui/button";

export default function Header({
  className,
  ...props
}: React.ComponentProps<"header">) {
  return (
    <header
      className={cn("header flex mb-4 items-center", className)}
      {...props}
    />
  );
}

export function ReturnButton({ href }: { href: string }) {
  return (
    <Link href={href}>
      <Button type="button" variant="ghost" size="icon-sm">
        <ArrowLeft />
      </Button>
    </Link>
  );
}