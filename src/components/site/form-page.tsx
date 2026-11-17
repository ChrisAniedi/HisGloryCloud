import { PageHero } from "./page-hero";

/** Layout for every "next step": what to expect on the left, the form on the right. */
export function FormPage({
  kicker,
  crumb,
  title,
  intro,
  aside,
  formTitle,
  formIntro,
  children,
}: {
  kicker: string;
  crumb?: string;
  title: React.ReactNode;
  intro: React.ReactNode;
  aside: React.ReactNode;
  formTitle: string;
  formIntro?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHero kicker={kicker} crumb={crumb} title={title} intro={intro} />
      <section className="section-y">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
          <aside className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">{aside}</div>
          </aside>
          <div className="lg:col-span-7">
            <div className="rounded-md border border-line bg-card p-6 sm:p-9">
              <h2 className="heading-3 !text-[1.75rem]">{formTitle}</h2>
              {formIntro && <p className="mt-2 text-muted">{formIntro}</p>}
              <div className="mt-8">{children}</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export function AsideScripture({ text, refText }: { text: string; refText: string }) {
  return (
    <blockquote className="border-l-[3px] border-red pl-5">
      <p className="font-serif text-xl leading-snug italic md:text-2xl">“{text}”</p>
      <footer className="mt-3 text-sm font-semibold text-muted">{refText}</footer>
    </blockquote>
  );
}

export function AsideList({ title, items }: { title: string; items: { title: string; body: string }[] }) {
  return (
    <div className="mt-10">
      <h3 className="text-lg font-semibold">{title}</h3>
      <ol className="mt-4 space-y-5">
        {items.map((it, i) => (
          <li key={it.title} className="flex gap-4">
            <span className="font-serif text-xl leading-7 font-semibold text-red">{i + 1}.</span>
            <div>
              <p className="font-semibold">{it.title}</p>
              <p className="mt-0.5 text-muted">{it.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
