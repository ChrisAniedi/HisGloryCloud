import { CopyButton } from "./copy-button";
import { giving } from "@/lib/site";
import { cn } from "@/lib/utils";

/** Account details set out plainly, with a one-tap copy of the number. */
export function BankDetails({ className }: { className?: string }) {
  const formatted = giving.accountNumber.replace(/(\d{4})(\d{3})(\d{3})/, "$1 $2 $3");
  return (
    <div className={cn("rounded-[20px] border border-line bg-white p-6 md:p-8", className)}>
      <dl className="grid gap-5">
        <div>
          <dt className="text-sm text-muted">Bank</dt>
          <dd className="mt-0.5 text-lg font-semibold">{giving.bank}</dd>
        </div>
        <div>
          <dt className="text-sm text-muted">Account name</dt>
          <dd className="mt-0.5 text-lg font-semibold">{giving.accountName}</dd>
        </div>
        <div>
          <dt className="text-sm text-muted">Account number</dt>
          <dd className="mt-1 flex flex-wrap items-center gap-4">
            <span className="text-[2.1rem] leading-none font-medium tracking-[-0.02em] tabular-nums">{formatted}</span>
            <CopyButton value={giving.accountNumber} label="Copy number" />
          </dd>
        </div>
      </dl>
    </div>
  );
}
