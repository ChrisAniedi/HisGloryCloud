"use client";

import { useActionState, startTransition } from "react";
import { Check, Loader2 } from "lucide-react";
import { submitForm } from "@/app/actions";
import { initialFormState, type FormState } from "@/lib/forms/schemas";
import { cn } from "@/lib/utils";

/** Email sign-up, styled for the dark footer. */
export function NewsletterForm({ className, stacked = false }: { className?: string; stacked?: boolean }) {
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
      <div className={cn("flex flex-col gap-2", !stacked && "sm:flex-row")}>
        <input
          id="nl-email"
          name="email"
          type="email"
          required
          disabled={done}
          autoComplete="email"
          placeholder={done ? "Subscribed. Thank you!" : "Your email address"}
          aria-invalid={state.status === "error" || undefined}
          aria-describedby="nl-msg"
          className={cn(
            "h-12 min-w-0 flex-1 rounded-full border bg-white/5 px-5 text-white outline-none placeholder:text-white/45 focus:border-white/60",
            state.status === "error" ? "border-red-on-ink" : "border-white/15"
          )}
        />
        <button
          type="submit"
          disabled={pending || done}
          className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-cream px-6 font-semibold text-night transition-colors hover:bg-white disabled:opacity-80"
        >
          {pending ? <Loader2 className="size-4 animate-spin" /> : done ? <Check className="size-4" /> : null}
          {done ? "Done" : "Subscribe"}
        </button>
      </div>
      <p id="nl-msg" aria-live="polite" className={cn("mt-2 min-h-5 text-sm", state.status === "error" ? "text-red-on-ink" : "text-white/55")}>
        {state.status === "error" ? state.errors?.email ?? state.message : state.status === "success" ? state.message : ""}
      </p>
    </form>
  );
}
