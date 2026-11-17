import Link from "next/link";
import { Button } from "@/components/ui/button";
import { church, gatherings } from "@/lib/site";

export function CtaBand({
  title = `Join us this ${gatherings[0].short} at 9am`,
  body = `${church.address.line1}, ${church.address.line2}, ${church.address.city}. Come as you are. Someone will be at the door to welcome you.`,
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="bg-red text-white">
      <div className="container-x flex flex-col gap-8 py-14 md:flex-row md:items-center md:justify-between md:py-16">
        <div className="max-w-2xl">
          <h2 className="heading-2">{title}</h2>
          <p className="mt-3 text-lg text-white">{body}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="light" size="lg">
            <Link href="/visit">Plan your visit</Link>
          </Button>
          <Button asChild variant="outline-light" size="lg">
            <Link href="/watch">Watch online</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
