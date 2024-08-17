import { EnumValues } from "zod";

export const JOBTYPES: EnumValues = [
  "Full-Time",
  "Part-Time",
  "Remote",
  "Internship",
];

export const JOB_LISTING_COLUMNS: string[] = [
  "Roles",
  "Status",
  "Date Posted",
  "Due Date",
  "Job Type",
  "Applicants",
  "Needs",
];

export const JOB_APPLICANT_COLUMNS: string[] = ["Name", "Applied Date"];

export const JOB_LISTING_DATA = [
  {
    roles: "Software Enginer",
    status: "Live",
    datePosted: "16 Agustus 2024",
    dueDate: "15 September 2024",
    jobType: "Full-Time",
    applicants: 1,
    needs: 10,
  },
];
export const JOB_APPLICANT_DATA = [
  {
    name: "Yoedi",
    appliedDate: "16 Agustus 2024",
  },
];
