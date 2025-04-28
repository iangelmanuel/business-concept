import * as React from "react"
import { cn } from "@/lib"
import { type VariantProps, cva } from "class-variance-authority"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        outline: "text-foreground",
        pending:
          "border-transparent bg-yellow-500 text-destructive-foreground hover:bg-yellow-500/80",
        processing:
          "border-transparent bg-gray-500 text-destructive-foreground hover:bg-gray-500/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        success:
          "border-transparent bg-emerald-500 text-destructive-foreground hover:bg-emerald-500/80",
        shipped:
          "border-transparent bg-sky-500 text-destructive-foreground hover:bg-sky-500/80",
        delivered:
          "border-transparent bg-orange-500 text-destructive-foreground hover:bg-orange-500/80",
        admin:
          "border-transparent bg-purple-500 text-destructive-foreground hover:bg-purple-500/80",
        user: "border-transparent bg-indigo-600 text-destructive-foreground hover:bg-indigo-600/80"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
