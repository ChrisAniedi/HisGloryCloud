import * as React from "react";
import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-12 w-full min-w-0 rounded-md border border-input bg-white px-4 py-2 text-[15px] transition-[color,box-shadow,border-color,background-color] outline-none placeholder:text-muted-foreground/70 selection:bg-primary selection:text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50 file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
        "hover:border-foreground/25 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/25 focus-visible:outline-none",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20",
       
        className
      )}
      {...props}
    />
  );
}

export { Input };
