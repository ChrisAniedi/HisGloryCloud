"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Copy } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function CopyButton({ value, label = "Copy", className }: { value: string; label?: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          toast.success("Account number copied", { description: value });
          setTimeout(() => setCopied(false), 2200);
        } catch {
          toast.error("Couldn’t copy. Please copy it manually.");
        }
      }}
      className={cn(
        "inline-flex h-10 items-center gap-2 rounded-full border border-ink/20 bg-white px-4 text-sm font-semibold transition-colors hover:border-ink/50",
        className
      )}
      aria-label={`${label}: ${value}`}
    >
      <span className="relative grid size-4 place-items-center">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span key={copied ? "c" : "n"} initial={{ scale: 0, rotate: -45 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0 }}>
            {copied ? <Check className="size-4 text-red" /> : <Copy className="size-4" />}
          </motion.span>
        </AnimatePresence>
      </span>
      {copied ? "Copied" : label}
    </button>
  );
}
