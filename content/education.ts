import { CertificationSchema, EducationSchema } from "./schema";

export const education = EducationSchema.parse([
  {
    degree: "B.Tech",
    field: "Computer Engineering and Science",
    institution: "IK Gujral Punjab Technical University",
    start: 2018,
    end: 2022,
  },
]);

/* The CV lists no certifications. Add entries here and the about and resume pages pick them up. */
export const certifications = CertificationSchema.parse([]);
