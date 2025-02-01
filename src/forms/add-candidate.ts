import { z } from "zod";

// Schema for a single comment
const commentSchema = z.object({
  comment: z.string().min(1, "Comment is required"),
  callStartsAt: z
    .string()
    .datetime("Invalid date-time format for callStartsAt"),
  callEndsAt: z.string().datetime("Invalid date-time format for callEndsAt"),
});

// Schema for the candidate
export const candidateSchema = z.object({
  candidateName: z.string().min(1, "Name is required"),
  contact: z.object({
    email: z.string().email("Invalid email format"),
    phone: z.string().min(8, "Phone number must be at least 8 digits"),
  }),
  totalYearsOfExperience: z.number().min(0, "Experience must be positive"),
  relevantYearsOfExperience: z
    .number()
    .min(0, "Relevant experience must be positive"),
  evaluatedSkill: z.string().min(1, "At least one skill is required"),
  comments: z.array(commentSchema).optional(), // Array of comments, optional
});

// Infer the type from the schema
export type AddCandidateForm = z.infer<typeof candidateSchema>;
