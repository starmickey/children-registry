import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

export const typographyVariants = cva(
  "text-foreground",
  {
    variants: {
      variant: {
        "gigantic-title": "text-5xl font-heading font-bold uppercase text-center mb-10 mt-8 ",
        "main-title": "text-2xl  text-center mb-10 mt-8",
        "H1": "text-lg font-bold",
      },
    },
    defaultVariants: {
      variant: "main-title",
    },
  }
)

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span"

export interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  level?: HeadingLevel
}

export const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, level = "p", variant = "main-title", children, ...props }, ref) => {
    // 1. Tell TypeScript this is a valid React element type
    const Comp = level as React.ElementType

    const appliedVariant = variant;

    return (
      <Comp
        // 2. Safely cast the ref to the base HTMLElement type
        ref={ref as React.Ref<HTMLElement>}
        className={cn(typographyVariants({ variant: appliedVariant, className }))}
        {...props}
      >
        {children}
      </Comp>
    )
  }
)

Typography.displayName = "Typography"