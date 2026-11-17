import type { Metadata } from "next";
import { FormPage } from "@/components/site/form-page";
import { TrainingForm } from "@/components/forms/forms";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { trainingFaqs } from "@/lib/site";

export const metadata: Metadata = {
  title: "Ministry training",
  description: "Be equipped with spiritual knowledge, leadership skills and practical ministry experience. Next session begins in 2026.",
};

const courses = ["Spiritual Growth", "Biblical Leadership", "Evangelism", "Church Administration", "Discipleship", "Ministry Ethics"];

export default function Page() {
  return (
    <>
      <FormPage
        eyebrow="Ministry training"
        lines={[{ text: "Equipped to" }, { text: "build the Kingdom.", em: true, className: "text-glory" }]}
        body="Our Ministry Training Program equips believers with spiritual knowledge, leadership skills and practical ministry experience to serve effectively in God’s kingdom."
        formTitle="Register your interest"
        formIntro="The next session commences in 2026 — we’ll notify you the moment registration opens."
        aside={
          <>
            <Reveal>
              <Badge variant="outline" className="border-glory-400/40 px-4 py-1.5 text-glory-300">Next session · 2026</Badge>
            </Reveal>
            <Reveal delay={0.05} className="mt-8 grid grid-cols-3 gap-3">
              {[
                ["6–12", "weeks"],
                ["Theory", "+ practical"],
                ["Certificate", "on completion"],
              ].map(([a, b]) => (
                <div key={a} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="font-serif text-2xl text-bone-50">{a}</p>
                  <p className="mt-1 text-xs text-bone-100/50">{b}</p>
                </div>
              ))}
            </Reveal>
            <Reveal delay={0.1} className="mt-10">
              <h3 className="eyebrow text-bone-100/50">Courses include</h3>
              <ul className="mt-5 flex flex-wrap gap-2">
                {courses.map((c) => (
                  <li key={c} className="rounded-full border border-white/12 bg-white/[0.03] px-4 py-2 text-sm text-bone-100/80">{c}</li>
                ))}
              </ul>
            </Reveal>
          </>
        }
      >
        <TrainingForm />
      </FormPage>

      <section className="theme-light section-y rounded-t-[2.5rem] md:rounded-t-[3.5rem]">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <SectionHeading className="lg:col-span-4" eyebrow="FAQ" title={<>Questions, <em className="text-glory-600">answered.</em></>} />
          <Reveal className="lg:col-span-8">
            <Accordion type="single" collapsible defaultValue="item-0">
              {trainingFaqs.map((f, i) => (
                <AccordionItem key={f.q} value={`item-${i}`}>
                  <AccordionTrigger>{f.q}</AccordionTrigger>
                  <AccordionContent>{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>
    </>
  );
}
