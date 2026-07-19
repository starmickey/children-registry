import Link from "next/link";
import { Button } from "../ui/button";
import { ChevronLeft as ArrowLeft } from "lucide-react";

export default function ReturnButton({ href }: { href: string }) {
  return (
    <Link href={href}>
      <Button type="button" variant="ghost" size="icon-sm">
        <ArrowLeft />
      </Button>
    </Link>
  );
}
