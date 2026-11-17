import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md font-semibold transition-colors duration-150 outline-none disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-[3px] focus-visible:ring-ring/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-red text-white hover:bg-red-dark",
        dark: "bg-ink text-paper hover:bg-ink-soft",
        outline: "border border-ink/25 bg-transparent text-ink hover:border-ink/50 hover:bg-ink/[0.04]",
        light: "bg-paper text-ink hover:bg-white",
        "outline-light": "border border-paper/40 text-paper hover:border-paper hover:bg-paper/10",
        secondary: "bg-secondary text-secondary-foreground hover:bg-sand-deep",
        ghost: "hover:bg-ink/5",
        link: "rounded-none text-red underline-offset-4 hover:underline",
        destructive: "bg-destructive text-white hover:bg-red-dark",
      },
      size: {
        default: "h-11 px-5 text-[15px]",
        sm: "h-9 px-3.5 text-sm",
        lg: "h-12 px-6 text-base",
        xl: "h-13 px-7 text-base",
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
  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { Button, buttonVariants };
