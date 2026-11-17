import { z } from "zod";
import { departments, pastoralOccasions } from "@/lib/site";

const name = z.string().trim().min(2, "Please enter your full name").max(120);
const email = z.string().trim().email("Enter a valid email address").max(200);
const optionalEmail = z.union([z.literal(""), email]).optional();
const phone = z
  .string()
  .trim()
  .regex(/^[+0-9 ()-]{7,20}$/, "Enter a valid phone number");
const optionalPhone = z.union([z.literal(""), phone]).optional();

export const schemas = {
  newsletter: z.object({ email }),

  salvation: z.object({
    name,
    email: optionalEmail,
    phone,
    gender: z.enum(["Male", "Female"], { message: "Select one" }),
    member: z.enum(["Yes", "No"], { message: "Select one" }),
    maritalStatus: z.enum(["Single", "Married", "Divorced", "Widow", "Widower"], { message: "Select one" }),
    dob: z.string().optional(),
    occupation: z.enum(["Student", "Employed", "Entrepreneur", "Unemployed", "Retired", "Other"], { message: "Select one" }),
    joinedVia: z.enum(["Onsite", "YouTube", "Instagram", "Facebook"], { message: "Select one" }),
    address: z.string().trim().max(300).optional(),
  }),

  prayer: z.object({
    name: z.string().trim().max(120).optional(),
    email: optionalEmail,
    phone: optionalPhone,
    topic: z.enum(["Healing", "Family", "Finances", "Career", "Salvation", "Guidance", "Other"], { message: "Select a topic" }),
    request: z.string().trim().min(10, "Tell us a little more so we can pray with you").max(3000),
    confidential: z.boolean().default(false),
  }),

  testimony: z.object({
    name,
    email: optionalEmail,
    phone: optionalPhone,
    title: z.string().trim().min(3, "Give your testimony a short title").max(140),
    story: z.string().trim().min(30, "Share a few more details of what God did").max(5000),
    consent: z.boolean().refine((v) => v, "Please confirm we may share your testimony"),
  }),

  serve: z.object({
    name,
    email,
    phone,
    gender: z.enum(["Male", "Female"], { message: "Select one" }),
    department: z.enum(departments, { message: "Choose a department" }),
    note: z.string().trim().max(1000).optional(),
  }),

  pastoral: z.object({
    name,
    email,
    phone,
    occasion: z.enum(pastoralOccasions, { message: "What are you celebrating?" }),
    date: z.string().min(1, "Choose a date"),
    note: z.string().trim().max(2000).optional(),
  }),

  training: z.object({
    name,
    email,
    phone,
    serving: z.enum(["Yes", "No"], { message: "Select one" }),
    motivation: z.string().trim().max(1500).optional(),
  }),
} as const;

export type FormKind = keyof typeof schemas;

export type FormState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Record<string, string>;
};

export const initialFormState: FormState = { status: "idle" };
