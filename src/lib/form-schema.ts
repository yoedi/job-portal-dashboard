import { JOBTYPES } from "@/constants";
import { z } from "zod";

export const jobFormSchema = z.object({
  roles: z
    .string({ required_error: "Job Title is required" })
    .min(3, { message: "Job title must be 3 characters" }),
  jobType: z.enum(JOBTYPES, {
    required_error: "You need to select a job type",
  }),
  salaryFrom: z.string({ required_error: "Salary from is required" }),
  salaryTo: z.string({ required_error: "Salary to is required" }),
  categoryId: z.string({ required_error: "You need to select a category" }),
  requiredSkills: z
    .string()
    .array()
    .nonempty({ message: "Required skill must be at least 1 skill" }),
  jobDescription: z
    .string({ required_error: "Job description is required" })
    .min(10, { message: "Job description must be at least 10 characters" }),
  responsibility: z
    .string({ required_error: "Responsibility is required" })
    .min(10, { message: "Responsibility must be at least 10 characters" }),
  whoYouAre: z
    .string({ required_error: "Who you are is required" })
    .min(10, { message: "Who you are must be at least 10 characters" }),
  niceToHaves: z
    .string({ required_error: "Nice to haves is required" })
    .min(10, { message: "Nice to haves must be at least 10 characters" }),
  benefits: z
    .object({ benefit: z.string(), description: z.string() })
    .array()
    .nonempty({ message: "Benefits must be at least 1 benefit" }),
});

export const overviewFormSchema = z.object({
  image: z
    .any()
    .refine((item: any) => item?.name, { message: "Image is required" }),
  name: z.string({ required_error: "Name is required" }),
  website: z.string({ required_error: "Website is required" }),
  location: z.string({ required_error: "Location is required" }),
  employee: z.string({ required_error: "Employee is required" }),
  industry: z.string({ required_error: "Industry is required" }),
  dateFounded: z.date({ required_error: "Date Founded is required" }),
  techStack: z
    .string({ required_error: "Tech Stack is required" })
    .array()
    .nonempty({ message: "Tech stack must be at least 1 data" }),
  description: z.string({ required_error: "Description is required" }),
});

export const socialMediaFormSchema = z.object({
  facebook: z.string({ required_error: "Facebook link is required" }),
  instagram: z.string({ required_error: "Instagram link is required" }),
  linkedin: z.string({ required_error: "Linkedin link is required" }),
  twitter: z.string({ required_error: "Twitter link is required" }),
  youtube: z.string({ required_error: "Youtube link is required" }),
});

export const teamFormSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Email is not valid" }),
  password: z.string({ required_error: "Password is required" }),
});

export const signInFormSchema = z.object({
  name: z.string({ required_error: "Name is required" }),
  position: z.string({ required_error: "Position is required" }),
  instagram: z.string({ required_error: "Instagram is required" }),
  linkedin: z.string({ required_error: "Linkedin is required" }),
});
