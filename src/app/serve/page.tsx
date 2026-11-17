import type { Metadata } from "next";
import { FormPage, AsideScripture } from "@/components/site/form-page";
import { ServeForm } from "@/components/forms/forms";
import { departments, stock } from "@/lib/site";

export const metadata: Metadata = {
  title: "Join the workforce",
  description: "Serve God in His tent and sanctuary. Join one of HGC’s serving units and become part of Christ’s team.",
};

export default function Page() {
  return (
    <FormPage
      kicker="Join the workforce"
        image={stock.drummers}
      title="We love Christ by serving people"
      intro="Become part of the church workforce and help fulfil God’s mission in His tent and sanctuary, as a valued member of Christ’s team."
      formTitle="Find your place"
      formIntro="Choose a unit. You can always try others later."
      aside={
        <>
          <AsideScripture
            text="As each one has received a gift, minister it to one another, as good stewards of the manifold grace of God."
            refText="1 Peter 4:10"
          />
          <div className="mt-10">
            <h3 className="text-lg font-semibold">Our {departments.length} serving units</h3>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 border-t border-line">
              {departments.map((d) => (
                <li key={d} className="border-b border-line py-2.5 text-muted">{d}</li>
              ))}
            </ul>
          </div>
        </>
      }
    >
      <ServeForm />
    </FormPage>
  );
}
