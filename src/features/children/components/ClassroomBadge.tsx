import { Badge } from "@/components/ui/badge";
import { ClassroomDto } from "../types";
import { useRender } from "@base-ui/react";
import { cn } from "@/lib/utils";

// Fixed explicit color assignments by classroom ID
const CLASSROOM_EXPLICIT_COLORS: Record<number, string> = {
  1: "bg-cyan-600 text-cyan-50 dark:bg-cyan-200 dark:text-cyan-950",
  2: "bg-purple-600 text-purple-50 dark:bg-purple-200 dark:text-purple-950",
  3: "bg-emerald-600 text-emerald-50 dark:bg-emerald-200 dark:text-emerald-950",
  4: "bg-amber-600 text-amber-50 dark:bg-amber-200 dark:text-amber-950",
  5: "bg-rose-600 text-rose-50 dark:bg-rose-200 dark:text-rose-950",
};

// Fallback palette for any dynamic classroom IDs
const PALETTE = [
  "bg-blue-600 text-blue-50 dark:bg-blue-200 dark:text-blue-950",
  "bg-emerald-600 text-emerald-50 dark:bg-emerald-200 dark:text-emerald-950",
  "bg-purple-600 text-purple-50 dark:bg-purple-200 dark:text-purple-950",
  "bg-amber-600 text-amber-50 dark:bg-amber-200 dark:text-amber-950",
  "bg-rose-600 text-rose-50 dark:bg-rose-200 dark:text-rose-950",
  "bg-cyan-600 text-cyan-50 dark:bg-cyan-200 dark:text-cyan-950",
];

export function getClassroomBadgeStyle(classroomId: number): string {
  if (CLASSROOM_EXPLICIT_COLORS[classroomId]) {
    return CLASSROOM_EXPLICIT_COLORS[classroomId];
  }
  // Deterministically select a color using modulo
  const index = Math.abs(classroomId) % PALETTE.length;
  return PALETTE[index];
}

export default function ClassroomBadge({
  classroom,
  className,
  ...props
}: {
  classroom: ClassroomDto;
} & Omit<useRender.ComponentProps<"span">, "children">) {
  return (
    <Badge
      className={cn(getClassroomBadgeStyle(classroom.id), className)}
      {...props}
    >
      {classroom.name}
    </Badge>
  );
}
