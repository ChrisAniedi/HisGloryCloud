import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/button relative inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-[color,background-color,border-color,box-shadow,transform] duration-300 ease-[var(--ease-glory)] outline-none disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-[3px] focus-visible:ring-ring/50 active:scale-[0.98] [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-[0_0_0_1px_rgba(255,255,255,0.08)_inset,0_10px_30px_-10px_var(--color-glory-500)] hover:bg-[color-mix(in_oklab,var(--primary)_88%,white)]",
        glory:
          "bg-glory-400 text-ink-950 shadow-[0_0_0_1px_rgba(255,255,255,0.25)_inset,0_12px_40px_-12px_var(--color-glory-400)] hover:bg-glory-300",
        ember:
          "bg-ember-500 text-white shadow-[0_12px_40px_-14px_var(--color-ember-500)] hover:bg-ember-400",
        outline:
          "border border-border bg-transparent hover:bg-foreground/5 hover:border-foreground/25",
        glass:
          "border border-white/15 bg-white/[0.06] text-bone-50 backdrop-blur-md hover:bg-white/[0.12] hover:border-white/25",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-foreground/5",
        link: "rounded-none text-foreground underline-offset-4 hover:underline",
        destructive: "bg-destructive text-white hover:bg-destructive/90",
      },
      size: {
        default: "h-11 px-6",
        sm: "h-9 px-4 text-[13px]",
        lg: "h-13 px-8 text-[15px]",
        xl: "h-15 px-9 text-base",
        icon: "size-11",
        "icon-sm": "size-9",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "button";
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
