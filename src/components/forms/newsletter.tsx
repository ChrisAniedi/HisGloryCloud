"use client";

import { useActionState, startTransition } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { submitForm } from "@/app/actions";
import { initialFormState, type FormState } from "@/lib/forms/schemas";
import { cn } from "@/lib/utils";

export function NewsletterForm({ className }: { className?: string }) {
  const [state, action, pending] = useActionState<FormState, FormData>(submitForm.bind(null, "newsletter"), initialFormState);
  const done = state.status === "success";

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        startTransition(() => action(fd));
      }}
      className={cn("w-full", className)}
    >
      <div aria-hidden className="absolute -left-[9999px] h-0 overflow-hidden">
        <input type="text" name="company" tabIndex={-1} autoComplete="off" />
      </div>
      <label htmlFor="nl-email" className="sr-only">Email address</label>
      <div
        className={cn(
          "flex h-14 items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] p-1.5 pl-5 transition-colors focus-within:border-glory-400/70",
          state.status === "error" && "border-ember-500/60"
        )}
      >
        <input
          id="nl-email"
          name="email"
          type="email"
          required
          disabled={done}
          autoComplete="email"
          placeholder={done ? "Subscribed — thank you!" : "Your email address"}
          aria-invalid={state.status === "error" || undefined}
          aria-describedby="nl-msg"
          className="min-w-0 flex-1 bg-transparent text-[15px] text-bone-50 outline-none placeholder:text-bone-100/40"
        />
        <button
          type="submit"
          disabled={pending || done}
          aria-label="Subscribe"
          className="group grid h-full shrink-0 place-items-center rounded-full bg-glory-400 px-5 text-sm font-medium text-ink-950 transition-colors hover:bg-glory-300 disabled:opacity-80"
        >
          {pending ? <Loader2 className="size-4 animate-spin" /> : done ? <Check className="size-4" /> : (
            <span className="flex items-center gap-1.5">Subscribe <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" /></span>
          )}
        </button>
      </div>
      <p id="nl-msg" aria-live="polite" className={cn("mt-3 min-h-5 pl-5 text-xs", state.status === "error" ? "text-ember-400" : "text-bone-100/50")}>
        {state.status === "error" ? state.errors?.email ?? state.message : state.status === "success" ? state.message : "News and updates from the Glory Tent. No spam."}
      </p>
    </form>
  );
}
