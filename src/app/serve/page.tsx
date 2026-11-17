import type { Metadata } from "next";
import { FormPage, AsideScripture } from "@/components/site/form-page";
import { ServeForm } from "@/components/forms/forms";
import { Reveal } from "@/components/motion/reveal";
import { departments } from "@/lib/site";

export const metadata: Metadata = {
  title: "Join the workforce",
  description: "Serve God in His tent and sanctuary. Join one of HGC’s serving units and become part of Christ’s team.",
};

export default function Page() {
  return (
    <FormPage
      eyebrow="Join the workforce"
      lines={[{ text: "We love Christ by" }, { text: "serving humanity.", em: true, className: "text-glory" }]}
      body="Become part of the church workforce to fulfil God’s mission in His tent and sanctuary — serving God and contributing as a valued member of Christ’s team."
      formTitle="Find your place"
      formIntro="Choose a unit — you can always explore others later."
      aside={
        <>
          <AsideScripture
            text="As each one has received a gift, minister it to one another, as good stewards of the manifold grace of God."
            refText="1 Peter 4:10"
          />
          <Reveal delay={0.1} className="mt-10">
            <h3 className="eyebrow text-bone-100/50">{departments.length} serving units</h3>
            <ul className="mt-5 flex flex-wrap gap-2">
              {departments.map((d) => (
                <li key={d} className="rounded-full border border-white/12 bg-white/[0.03] px-4 py-2 text-sm text-bone-100/80">
                  {d}
                </li>
              ))}
            </ul>
          </Reveal>
        </>
      }
    >
      <ServeForm />
    </FormPage>
  );
}
