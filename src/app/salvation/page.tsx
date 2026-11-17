import type { Metadata } from "next";
import { FormPage, AsideList, AsideScripture } from "@/components/site/form-page";
import { SalvationForm } from "@/components/forms/forms";

export const metadata: Metadata = {
  title: "Salvation — Welcome to new life",
  description: "Just accepted Jesus Christ as your Lord and Saviour? Welcome to the family. Let us walk with you.",
};

export default function Page() {
  return (
    <FormPage
      eyebrow="Salvation"
      lines={[{ text: "Welcome to a" }, { text: "new life in Christ.", em: true, className: "text-glory" }]}
      body="Congratulations — this is the best decision you will ever make. Heaven is rejoicing, and so are we. You don’t have to walk this road alone."
      formTitle="Tell us about you"
      formIntro="So someone from our follow-up team can reach out personally."
      aside={
        <>
          <AsideScripture
            text="Therefore, if anyone is in Christ, he is a new creation; old things have passed away; behold, all things have become new."
            refText="2 Corinthians 5:17"
          />
          <AsideList
            title="What happens next"
            items={[
              { title: "We reach out", body: "A member of our team will call or message you within the week." },
              { title: "We walk with you", body: "We’ll take you by the hand and offer spiritual support as you grow." },
              { title: "You find family", body: "Join us on Sunday, meet your new church family, and keep growing in Him." },
            ]}
          />
        </>
      }
    >
      <SalvationForm />
    </FormPage>
  );
}
