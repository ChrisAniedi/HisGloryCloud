import type { Metadata } from "next";
import { FormPage, AsideList, AsideScripture } from "@/components/site/form-page";
import { PrayerForm } from "@/components/forms/forms";

export const metadata: Metadata = {
  title: "Prayer request",
  description: "Need prayer? Send in your request and the HGC prayer squad will stand in agreement with you.",
};

export default function Page() {
  return (
    <FormPage
      kicker="Prayer request"
      title="You don’t have to pray alone"
      intro="Whatever you’re carrying, bring it here. Our prayer squad will take your request before the Lord and stand in agreement with you."
      formTitle="Send a prayer request"
      formIntro="Share as much or as little as you’re comfortable with."
      aside={
        <>
          <AsideScripture
            text="Again I say to you that if two of you agree on earth concerning anything that they ask, it will be done for them by My Father in heaven."
            refText="Matthew 18:19"
          />
          <AsideList
            title="How we handle your request"
            items={[
              { title: "Received with care", body: "Every request is read and prayed over by our prayer squad." },
              { title: "Kept confidential", body: "Tick the confidential box and only the pastoral prayer team will see it." },
              { title: "Followed up", body: "Leave a number or email if you’d like someone to pray with you directly." },
            ]}
          />
        </>
      }
    >
      <PrayerForm />
    </FormPage>
  );
}
