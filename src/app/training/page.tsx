import type { Metadata } from "next";
import { FormPage } from "@/components/site/form-page";
import { TrainingForm } from "@/components/forms/forms";
import { SectionHeading } from "@/components/site/section-heading";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { trainingFaqs, stock } from "@/lib/site";

export const metadata: Metadata = {
  title: "Ministry training",
  description: "Be equipped with spiritual knowledge, leadership skills and practical ministry experience. Next session begins in 2026.",
};

const courses = ["Spiritual Growth", "Biblical Leadership", "Evangelism", "Church Administration", "Discipleship", "Ministry Ethics"];

const facts = [
  ["Length", "6 to 12 weeks, depending on the level"],
  ["Format", "Teaching sessions and practical ministry"],
  ["At the end", "A Certificate of Completion"],
  ["Cost", "Mostly free; some advanced courses ask a small fee for materials"],
];

export default function Page() {
  return (
    <>
      <FormPage
        kicker="Ministry training"
        image={stock.churchInterior}
        title="Equipped to build the Kingdom"
        intro="The Ministry Training Program gives believers spiritual knowledge, leadership skills and hands-on ministry experience, so they can serve well in God’s kingdom."
        formTitle="Register your interest"
        formIntro="The next session starts in 2026. We’ll let you know as soon as registration opens."
        aside={
          <>
            <p className="inline-block rounded-sm bg-red-soft px-2.5 py-1 text-sm font-semibold text-red">Next session: 2026</p>
            <dl className="mt-6 border-t border-line">
              {facts.map(([k, v]) => (
                <div key={k} className="grid grid-cols-3 gap-4 border-b border-line py-3">
                  <dt className="font-semibold">{k}</dt>
                  <dd className="col-span-2 text-muted">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-10">
              <h3 className="text-lg font-semibold">Courses include</h3>
              <p className="mt-2 text-muted">{courses.join(", ")}, and more.</p>
            </div>
          </>
        }
      >
        <TrainingForm />
      </FormPage>

      <section className="section-y border-t border-line">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <SectionHeading className="lg:col-span-4" kicker="Questions" title="About the programme" />
          <div className="lg:col-span-8">
            <Accordion type="single" collapsible defaultValue="item-0" className="border-t border-line">
              {trainingFaqs.map((f, i) => (
                <AccordionItem key={f.q} value={`item-${i}`}>
                  <AccordionTrigger>{f.q}</AccordionTrigger>
                  <AccordionContent>{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </>
  );
}
