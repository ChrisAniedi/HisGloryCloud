import { cacheLife } from "next/cache";
import { socials } from "./site";

export const YOUTUBE_CHANNEL_ID = "UCmjUeSObktlJynAwoMr9thA";

export type Message = {
  id: string;
  title: string;
  published: string;
  url: string;
  thumb: string;
};

/** Used when the feed can't be reached (offline builds, YouTube hiccups). */
const fallback: Message[] = [
  { id: "N2URQXCoOks", title: "He’s the reason why you’re still standing", published: "2026-10-09T18:23:09+00:00" },
  { id: "GI-pqW_EfdA", title: "I am a vessel of remembrance", published: "2026-10-09T13:00:24+00:00" },
  { id: "v69VC1J1EDY", title: "Your current situation doesn’t have to be final", published: "2026-10-09T11:22:08+00:00" },
  { id: "3TJ8uzyTtaM", title: "The triplet that can change your story", published: "2026-10-06T19:45:40+00:00" },
].map((m) => ({ ...m, url: `https://www.youtube.com/watch?v=${m.id}`, thumb: `https://i.ytimg.com/vi/${m.id}/maxresdefault.jpg` }));

const decode = (s: string) =>
  s.replace(/&amp;/g, "&").replace(/&quot;/g, "\"").replace(/&#39;/g, "’").replace(/'/g, "’").replace(/&lt;/g, "<").replace(/&gt;/g, ">");

const KEEP_CAPS = new Set(["god", "god’s", "jesus", "christ", "lord", "lord’s", "spirit", "holy", "i", "i’m", "i’ll", "noah", "hgc"]);

/** Titles posted in ALL CAPS read as shouting on the page; give them sentence case. */
function tidyTitle(t: string) {
  const letters = t.replace(/[^a-z]/gi, "");
  if (!letters || letters !== letters.toUpperCase()) return t;
  return t
    .toLowerCase()
    .split(" ")
    .map((w, i) => (i === 0 || KEEP_CAPS.has(w) ? w.charAt(0).toUpperCase() + w.slice(1) : w))
    .join(" ");
}

/**
 * The newest full-length messages from the church's YouTube channel.
 * Shorts are skipped: only videos with an HD landscape thumbnail are kept.
 */
export async function getLatestMessages(limit = 4): Promise<Message[]> {
  "use cache";
  cacheLife("hours");

  try {
    const res = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`);
    if (!res.ok) return fallback.slice(0, limit);
    const xml = await res.text();
    const entries = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].map(([, e]) => ({
      id: e.match(/<yt:videoId>([^<]+)/)?.[1] ?? "",
      title: tidyTitle(decode(e.match(/<title>([^<]+)/)?.[1] ?? "")),
      published: e.match(/<published>([^<]+)/)?.[1] ?? "",
    }));

    const out: Message[] = [];
    for (const e of entries) {
      if (!e.id || out.length >= limit) continue;
      const thumb = `https://i.ytimg.com/vi/${e.id}/maxresdefault.jpg`;
      const head = await fetch(thumb, { method: "HEAD" }).catch(() => null);
      if (head?.ok) out.push({ ...e, url: `https://www.youtube.com/watch?v=${e.id}`, thumb });
    }
    return out.length ? out : fallback.slice(0, limit);
  } catch {
    return fallback.slice(0, limit);
  }
}

export const channelUrl = socials.youtube.href;
