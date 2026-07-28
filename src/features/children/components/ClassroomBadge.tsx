import { Badge } from "@/components/ui/badge";
import { ClassroomDto } from "../types";
import { useRender } from "@base-ui/react";
import { cn } from "@/lib/utils";

const variants = {
  default: [
    "bg-cyan-600 text-cyan-50 dark:bg-cyan-200 dark:text-cyan-950",
    "bg-purple-600 text-purple-50 dark:bg-purple-200 dark:text-purple-950",
  ],
  outline: [
    "border-cyan-600 text-cyan-600 dark:border-cyan-200 dark:text-cyan-200",
    "border-purple-600 text-purple-600 dark:border-purple-200 dark:text-purple-200",
  ],
};

export function getClassroomBadgeStyle(classroomId: number, variant?: keyof typeof variants): string {
  // Deterministically select a color using modulo
  const PALETTE = variants[variant ?? 'default'];
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
