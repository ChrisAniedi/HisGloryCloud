import Image from "next/image";
import { Button } from "@/components/ui/button";
import { YouTubeIcon, InstagramIcon, FacebookIcon } from "@/components/site/social-icons";
import { media, socials } from "@/lib/site";

const channels = [
  { ...socials.youtube, Icon: YouTubeIcon, note: "Live services and past messages" },
  { ...socials.instagram, Icon: InstagramIcon, note: "Photos from the Glory Tent" },
  { ...socials.facebook, Icon: FacebookIcon, note: "News and announcements" },
];

export function Watch() {
  return (
    <section className="section-y">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-16">
        <div className="lg:col-span-6">
          <p className="kicker">Every Sunday from 9am (WAT)</p>
          <h2 className="heading-2 mt-2">Join the service live on YouTube</h2>
          <p className="mt-4 text-lg text-muted">
            Can’t be in Egbeda this week? Worship with us and hear the Word wherever you are. Past messages are on the
            channel too.
          </p>
          <Button asChild size="lg" className="mt-7">
            <a href={socials.youtube.href} target="_blank" rel="noreferrer">
              <YouTubeIcon className="size-5" /> Open {socials.youtube.handle}
            </a>
          </Button>

          <ul className="mt-10 divide-y divide-line border-y border-line">
            {channels.map(({ Icon, ...c }) => (
              <li key={c.label}>
                <a href={c.href} target="_blank" rel="noreferrer" className="group flex items-center gap-4 py-4">
                  <Icon className="size-5 shrink-0" />
                  <span className="flex-1">
                    <span className="block font-semibold group-hover:text-red">{c.label}</span>
                    <span className="block text-[0.95rem] text-muted">{c.note}</span>
                  </span>
                  <span className="text-sm text-muted">{c.handle}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {media.worship && (
          <a href={socials.youtube.href} target="_blank" rel="noreferrer" className="group block lg:col-span-6" aria-label="Watch His Glory Cloud Church on YouTube">
            <div className="relative aspect-video overflow-hidden rounded-md bg-ink">
              <Image src={media.worship} alt="" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover object-[50%_30%] opacity-80 transition-opacity group-hover:opacity-70" />
              <span className="absolute inset-0 grid place-items-center">
                <span className="grid size-16 place-items-center rounded-full bg-white text-ink shadow-md">
                  <svg viewBox="0 0 24 24" className="ml-1 size-6" fill="currentColor" aria-hidden><path d="M8 5.5v13l11-6.5z" /></svg>
                </span>
              </span>
            </div>
            <p className="mt-2.5 text-sm text-muted">Opens our YouTube channel.</p>
          </a>
        )}
      </div>
    </section>
  );
}
