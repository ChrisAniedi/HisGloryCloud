import type { Metadata } from "next";
import { FormPage, AsideList, AsideScripture } from "@/components/site/form-page";
import { TestimonyForm } from "@/components/forms/forms";

export const metadata: Metadata = {
  title: "Share your testimony",
  description: "Share about the goodness of God so others can build faith through your story.",
};

export default function Page() {
  return (
    <FormPage
      eyebrow="Share testimony"
      lines={[{ text: "Tell of His" }, { text: "goodness.", em: true, className: "text-glory" }]}
      body="Are you grateful? Your story could be the very thing that builds someone else’s faith. Share what God has done."
      formTitle="Share your testimony"
      aside={
        <>
          <AsideScripture text="And they overcame him by the blood of the Lamb and by the word of their testimony." refText="Revelation 12:11" />
          <AsideList
            title="Good testimonies include"
            items={[
              { title: "Where you were", body: "The situation, the need, or the challenge you faced." },
              { title: "What God did", body: "How He showed up — the turning point, the breakthrough." },
              { title: "Where you are now", body: "The difference it has made, and the glory you give Him." },
            ]}
          />
        </>
      }
    >
      <TestimonyForm />
    </FormPage>
  );
}
