"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteForm, TextField, TextAreaField, SelectField, ChoiceField, CheckField, FormRow } from "./form-kit";
import { Button } from "@/components/ui/button";
import { departments, pastoralOccasions, socials } from "@/lib/site";

const Contact = ({ emailRequired = false, phoneRequired = true }: { emailRequired?: boolean; phoneRequired?: boolean }) => (
  <FormRow>
    <TextField name="phone" label="Phone / WhatsApp" type="tel" autoComplete="tel" inputMode="tel" placeholder="+234 …" required={phoneRequired} />
    <TextField name="email" label="Email" type="email" autoComplete="email" placeholder="you@example.com" required={emailRequired} />
  </FormRow>
);

export function SalvationForm() {
  return (
    <SiteForm
      kind="salvation"
      submitLabel="Welcome me in"
      successTitle="Welcome home"
      successAction={
        <Button asChild variant="outline">
          <Link href="/visit">Plan your first visit <ArrowRight /></Link>
        </Button>
      }
    >
      <TextField name="name" label="Full name" autoComplete="name" required />
      <Contact />
      <FormRow>
        <ChoiceField name="gender" label="Gender" options={["Male", "Female"]} required />
        <ChoiceField name="member" label="Are you a member of HGC?" options={["Yes", "No"]} required />
      </FormRow>
      <FormRow>
        <SelectField name="maritalStatus" label="Marital status" options={["Single", "Married", "Divorced", "Widow", "Widower"]} required />
        <TextField name="dob" label="Date of birth" type="date" />
      </FormRow>
      <FormRow>
        <SelectField name="occupation" label="Are you a/an…" options={["Student", "Employed", "Entrepreneur", "Unemployed", "Retired", "Other"]} required />
        <SelectField name="joinedVia" label="How did you join the service?" options={["Onsite", "YouTube", "Instagram", "Facebook"]} required />
      </FormRow>
      <TextField name="address" label="Area / address" autoComplete="street-address" hint="So we can connect you with believers near you." />
    </SiteForm>
  );
}

export function PrayerForm() {
  return (
    <SiteForm kind="prayer" submitLabel="Send my request" successTitle="We’re praying with you">
      <TextField name="name" label="Name" autoComplete="name" hint="Optional — you can stay anonymous." />
      <Contact phoneRequired={false} />
      <SelectField name="topic" label="What can we pray about?" options={["Healing", "Family", "Finances", "Career", "Salvation", "Guidance", "Other"]} required />
      <TextAreaField name="request" label="Your prayer request" placeholder="Share as much or as little as you like…" required rows={6} />
      <CheckField name="confidential" label="Keep this confidential — only the pastoral prayer team should see it." />
    </SiteForm>
  );
}

export function TestimonyForm() {
  return (
    <SiteForm kind="testimony" submitLabel="Share my testimony" successTitle="To God be the glory">
      <TextField name="name" label="Full name" autoComplete="name" required />
      <Contact phoneRequired={false} />
      <TextField name="title" label="Give it a title" placeholder="e.g. God restored my health" required />
      <TextAreaField name="story" label="What did God do?" placeholder="Tell us the story — where you were, what happened, and how God showed up." required rows={8} />
      <CheckField name="consent" label="I’m happy for HGC to share my testimony to encourage others." />
    </SiteForm>
  );
}

export function ServeForm() {
  return (
    <SiteForm kind="serve" submitLabel="Join the workforce" successTitle="Welcome to the team">
      <TextField name="name" label="Full name" autoComplete="name" required />
      <Contact emailRequired />
      <FormRow>
        <ChoiceField name="gender" label="Gender" options={["Male", "Female"]} required />
        <SelectField name="department" label="Where would you love to serve?" options={departments} required />
      </FormRow>
      <TextAreaField name="note" label="Anything we should know?" placeholder="Skills, experience, availability…" rows={4} />
    </SiteForm>
  );
}

export function PastoralForm() {
  return (
    <SiteForm kind="pastoral" submitLabel="Book pastoral service" successTitle="Request received">
      <TextField name="name" label="Full name" autoComplete="name" required />
      <Contact emailRequired />
      <FormRow>
        <SelectField name="occasion" label="What are you celebrating?" options={pastoralOccasions} required />
        <TextField name="date" label="Date of event" type="date" required />
      </FormRow>
      <TextAreaField name="note" label="Details" placeholder="Location, names, anything the pastoral team should know…" rows={4} />
    </SiteForm>
  );
}

export function TrainingForm() {
  return (
    <SiteForm
      kind="training"
      submitLabel="Register my interest"
      successTitle="You’re on the list"
      successAction={
        <Button asChild variant="outline">
          <a href={socials.youtube.href} target="_blank" rel="noreferrer">Keep growing on YouTube <ArrowRight /></a>
        </Button>
      }
    >
      <TextField name="name" label="Full name" autoComplete="name" required />
      <Contact emailRequired />
      <ChoiceField name="serving" label="Are you currently serving in a department?" options={["Yes", "No"]} required />
      <TextAreaField name="motivation" label="Why do you want to join?" placeholder="Optional" rows={4} />
    </SiteForm>
  );
}
