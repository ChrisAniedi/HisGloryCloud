"use client";

import { createContext, useActionState, useContext, useId, useRef, startTransition, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { submitForm } from "@/app/actions";
import { initialFormState, type FormKind, type FormState } from "@/lib/forms/schemas";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioChip } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

const ErrorsCtx = createContext<Record<string, string>>({});
const useFieldError = (name: string) => useContext(ErrorsCtx)[name];

/* ------------------------------------------------------------------ */

export function SiteForm({
  kind,
  submitLabel,
  children,
  className,
  successTitle = "Received with joy",
  successAction,
}: {
  kind: FormKind;
  submitLabel: string;
  children: React.ReactNode;
  className?: string;
  successTitle?: string;
  successAction?: React.ReactNode;
}) {
  const action = submitForm.bind(null, kind);
  const [state, formAction, pending] = useActionState<FormState, FormData>(action, initialFormState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "error") {
      toast.error(state.message);
      // Move focus to the first invalid control for keyboard & SR users.
      const first = state.errors && Object.keys(state.errors)[0];
      if (first) {
        const root = formRef.current;
        const el =
          root?.querySelector<HTMLElement>(`#${CSS.escape(first)} button, #${CSS.escape(first)}`) ??
          root?.querySelector<HTMLElement>(`input[name="${first}"]:not([aria-hidden]), textarea[name="${first}"]`) ??
          root?.querySelector<HTMLElement>(`[data-field="${first}"] button`);
        el?.focus();
      }
    }
  }, [state]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      {state.status === "success" ? (
        <motion.div
          key="ok"
          initial={{ opacity: 0, scale: 0.96, filter: "blur(8px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className={cn("relative flex flex-col items-center px-4 py-14 text-center", className)}
          role="status"
        >
          <div className="relative mb-8 grid size-20 place-items-center">
            <span className="absolute inset-0 animate-ping rounded-full bg-glory-400/30 [animation-duration:2.4s]" />
            <span className="absolute inset-0 rounded-full bg-glory-400/20 blur-xl" />
            <span className="relative grid size-20 place-items-center rounded-full bg-glory-400 text-ink-950">
              <Check className="size-9" strokeWidth={2.5} />
            </span>
          </div>
          <h3 className="font-serif text-4xl">{successTitle}</h3>
          <p className="mt-3 max-w-md text-muted-foreground">{state.message}</p>
          {successAction && <div className="mt-8">{successAction}</div>}
        </motion.div>
      ) : (
        <motion.form
          key="form"
          ref={formRef}
          exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            startTransition(() => formAction(fd));
          }}
          className={cn("grid gap-6", className)}
        >
          <ErrorsCtx.Provider value={state.errors ?? {}}>
            {/* Honeypot — invisible to people, irresistible to bots */}
            <div aria-hidden className="absolute -left-[9999px] h-0 overflow-hidden">
              <label>
                Company <input type="text" name="company" tabIndex={-1} autoComplete="off" />
              </label>
            </div>
            {children}
            <div className="flex flex-col-reverse items-start gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-muted-foreground">Your details are kept private and used only to follow up with you.</p>
              <Button type="submit" size="lg" disabled={pending} className="w-full sm:w-auto">
                {pending ? <Loader2 className="animate-spin" /> : null}
                {pending ? "Sending…" : submitLabel}
                {!pending && <ArrowRight className="transition-transform group-hover/button:translate-x-0.5" />}
              </Button>
            </div>
          </ErrorsCtx.Provider>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */

function FieldShell({
  id,
  label,
  hint,
  error,
  required,
  className,
  children,
  as = "div",
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
  as?: "div" | "fieldset";
}) {
  const Wrapper = as;
  const LabelEl =
    as === "fieldset" ? (
      <legend className="mb-3 text-sm font-medium">
        {label}
        {required && <span className="ml-0.5 text-glory-500">*</span>}
      </legend>
    ) : (
      <Label htmlFor={id} className="mb-2.5">
        {label}
        {required && <span className="-ml-1.5 text-glory-500">*</span>}
      </Label>
    );
  return (
    <Wrapper className={cn("flex min-w-0 flex-col", className)}>
      {LabelEl}
      {children}
      <AnimatePresence initial={false}>
        {error ? (
          <motion.p
            id={`${id}-error`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-2 text-xs text-ember-400"
          >
            {error}
          </motion.p>
        ) : hint ? (
          <p className="mt-2 text-xs text-muted-foreground">{hint}</p>
        ) : null}
      </AnimatePresence>
    </Wrapper>
  );
}

type Base = { name: string; label: string; hint?: string; required?: boolean; className?: string };

export function TextField({
  name,
  label,
  hint,
  required,
  className,
  ...props
}: Base & Omit<React.ComponentProps<typeof Input>, "name">) {
  const id = useId();
  const error = useFieldError(name);
  return (
    <FieldShell id={id} label={label} hint={hint} error={error} required={required} className={className}>
      <Input
        id={id}
        name={name}
        required={required}
        aria-invalid={!!error || undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
    </FieldShell>
  );
}

export function TextAreaField({
  name,
  label,
  hint,
  required,
  className,
  ...props
}: Base & Omit<React.ComponentProps<typeof Textarea>, "name">) {
  const id = useId();
  const error = useFieldError(name);
  return (
    <FieldShell id={id} label={label} hint={hint} error={error} required={required} className={className}>
      <Textarea
        id={id}
        name={name}
        required={required}
        aria-invalid={!!error || undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
    </FieldShell>
  );
}

export function SelectField({
  name,
  label,
  hint,
  required,
  className,
  options,
  placeholder = "Select…",
}: Base & { options: readonly string[]; placeholder?: string }) {
  const id = useId();
  const error = useFieldError(name);
  return (
    <FieldShell id={id} label={label} hint={hint} error={error} required={required} className={className}>
      <Select name={name} required={required}>
        <SelectTrigger id={id} data-field={name} aria-invalid={!!error || undefined}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((o) => (
            <SelectItem key={o} value={o}>
              {o}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FieldShell>
  );
}

export function ChoiceField({ name, label, hint, required, className, options }: Base & { options: readonly string[] }) {
  const id = useId();
  const error = useFieldError(name);
  return (
    <FieldShell as="fieldset" id={id} label={label} hint={hint} error={error} required={required} className={className}>
      <RadioGroup id={name} name={name} required={required} className="flex flex-wrap gap-2" aria-invalid={!!error || undefined}>
        {options.map((o) => (
          <RadioChip key={o} value={o}>
            {o}
          </RadioChip>
        ))}
      </RadioGroup>
    </FieldShell>
  );
}

export function CheckField({ name, label, hint, className }: Omit<Base, "required">) {
  const id = useId();
  const error = useFieldError(name);
  return (
    <div className={cn("flex flex-col", className)}>
      <div className="flex items-start gap-3">
        <Checkbox id={id} name={name} aria-invalid={!!error || undefined} className="mt-0.5" />
        <Label htmlFor={id} className="leading-snug font-normal text-muted-foreground">
          {label}
        </Label>
      </div>
      {(error || hint) && <p className={cn("mt-2 pl-8 text-xs", error ? "text-ember-400" : "text-muted-foreground")}>{error ?? hint}</p>}
    </div>
  );
}

export function FormRow({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("grid gap-6 sm:grid-cols-2", className)}>{children}</div>;
}
