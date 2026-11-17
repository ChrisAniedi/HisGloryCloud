import { getLatestMessages } from "@/lib/youtube";
import { HeroView } from "./hero-view";

export async function Hero() {
  const [latest] = await getLatestMessages(1);
  return <HeroView latest={latest ?? null} />;
}
