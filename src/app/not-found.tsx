import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { GloryCloud } from "@/components/motion/glory-cloud";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="relative isolate grid min-h-[100svh] place-items-center overflow-hidden px-6 text-center text-bone-50">
      <GloryCloud intensity={0.6} className="-z-10" />
      <div>
        <p className="eyebrow text-glory-300">404 · Page not found</p>
        <h1 className="text-display mt-6 text-[clamp(3.5rem,10vw,8rem)]">
          This path is <em className="text-glory">unseen.</em>
        </h1>
        <p className="mx-auto mt-6 max-w-md text-bone-100/65">The page you’re looking for has moved or doesn’t exist — but you’re always welcome home.</p>
        <Button asChild variant="glory" size="lg" className="mt-10">
          <Link href="/"><ArrowLeft /> Back home</Link>
        </Button>
      </div>
    </section>
  );
}
