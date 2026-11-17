import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="container-x pt-40 pb-24 md:pt-48 md:pb-32">
      <p className="kicker">Page not found</p>
      <h1 className="heading-1 mt-3 max-w-2xl">We couldn’t find that page</h1>
      <p className="mt-5 max-w-xl text-lg text-muted">It may have moved, or the link may be wrong. You’re always welcome home.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button asChild size="lg">
          <Link href="/">Back to the home page</Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/visit">Service times</Link>
        </Button>
      </div>
    </section>
  );
}
