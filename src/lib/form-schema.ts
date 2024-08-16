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
