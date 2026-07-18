import { cn } from "@/lib/utils";
import { ButtonProps, buttonVariants } from "./button";
import { TypographyProps, typographyVariants } from "./typography";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  );
}

function ButtonSkeleton({
  variant,
  size,
  className,
  ...props
}: ButtonProps & React.ComponentProps<"div">) {
  return (
    <Skeleton
      className={cn(
        buttonVariants({ variant, size, className }),
        "animate-pulse rounded-md bg-muted",
        className,
      )}
      {...props}
    />
  );
}

function TypographySkeleton({
  className,
  variant = "main-title",
  ...props
}: TypographyProps & React.ComponentProps<"div">) {
  const variantClasses = typographyVariants({ variant, className });

  return (
    <Skeleton
      className={cn(variantClasses, "block h-8 w-48", variantClasses.includes("text-center") ? "m-auto" : "")}
      {...props}
    />
  );
}

export { Skeleton, ButtonSkeleton, TypographySkeleton };
