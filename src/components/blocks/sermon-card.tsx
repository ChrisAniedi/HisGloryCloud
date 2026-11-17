import Image from "next/image";
import { Play } from "lucide-react";
import type { Message } from "@/lib/youtube";
import { church } from "@/lib/site";
import { cn } from "@/lib/utils";

const year = (iso: string) => new Date(iso).getFullYear();
const date = (iso: string) => new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "Africa/Lagos" }).format(new Date(iso));

/** A sermon as a card: the thumbnail, the year and preacher, the title and a play button. */
export function SermonCard({ m, className, showDate = false }: { m: Message; className?: string; showDate?: boolean }) {
  return (
    <a href={m.url} target="_blank" rel="noreferrer" className={cn("group flex flex-col rounded-[22px] bg-white p-2 ring-1 ring-line transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_26px_50px_-28px_rgba(35,29,23,0.45)]", className)}>
      <span className="relative block aspect-video overflow-hidden rounded-[16px] bg-sand">
        <Image src={m.thumb} alt="" fill sizes="(min-width:1024px) 30vw, 90vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
      </span>
      <span className="flex items-end gap-3 px-3 pt-4 pb-3">
        <span className="min-w-0 flex-1">
          <span className="block text-xs text-muted">{showDate ? date(m.published) : year(m.published)} · {church.leader.name.replace("Nwachukwu ", "")}</span>
          <span className="mt-1 line-clamp-2 block font-medium leading-snug tracking-tight">{m.title}</span>
        </span>
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-night text-white transition-colors group-hover:bg-red">
          <Play className="ml-0.5 size-4 fill-current" />
        </span>
      </span>
    </a>
  );
}
