import Image from "next/image";
import { Play } from "lucide-react";
import type { Message } from "@/lib/youtube";
import { church } from "@/lib/site";
import { cn } from "@/lib/utils";

const year = (iso: string) => new Date(iso).getFullYear();
const date = (iso: string) => new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "Africa/Lagos" }).format(new Date(iso));

/** A sermon as a card: the thumbnail, the year and preacher, the title and a play button. */
export function SermonCard({ m, className, showDate = false, latest = false }: { m: Message; className?: string; showDate?: boolean; latest?: boolean }) {
  return (
    <a href={m.url} target="_blank" rel="noreferrer" className={cn("group flex flex-col rounded-[22px] bg-white p-2 ring-1 ring-line transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_26px_50px_-28px_rgba(35,29,23,0.45)]", className)}>
      <span className="relative block aspect-video overflow-hidden rounded-[16px] bg-sand">
        <Image src={m.thumb} alt="" fill sizes="(min-width:1024px) 30vw, 90vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
        <span className="absolute inset-0 bg-night/0 transition-colors duration-500 group-hover:bg-night/25" />
        <span className="absolute top-1/2 left-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 scale-75 place-items-center rounded-full bg-white/90 text-red opacity-0 shadow-xl backdrop-blur transition-[opacity,transform] duration-500 group-hover:scale-100 group-hover:opacity-100">
          <Play className="ml-0.5 size-5 fill-current" />
        </span>
        {latest && (
          <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-red px-2.5 py-1 text-xs font-semibold text-white shadow">
            <span className="size-1.5 rounded-full bg-white" /> Latest
          </span>
        )}
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
