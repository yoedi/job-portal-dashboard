import { EnumValues } from "zod";

export type optionType = { id: string; label: string };
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

export const JOB_APPLICANT_COLUMNS: string[] = ["Name"];

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

export const LOCATION_OPTIONS: optionType[] = [
  {
    id: "Indonesia",
    label: "Indonesia",
  },
  {
    id: "Malaysia",
    label: "Malaysia",
  },
  {
    id: "Singapura",
    label: "Singapura",
  },
  {
    id: "Thailand",
    label: "Thailand",
  },
];

export const EMPLOYEE_OPTIONS: optionType[] = [
  {
    id: "1-50",
    label: "1-50",
  },
  {
    id: "50-150",
    label: "50-150",
  },
  {
    id: "251-250",
    label: "251-250",
  },
  {
    id: "501-1000",
    label: "501-1000",
  },
  {
    id: "1001-above",
    label: "1001-above",
  },
];
