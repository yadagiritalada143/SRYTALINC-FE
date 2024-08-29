import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be 8 characters long" }),
});
export type LoginForm = z.infer<typeof loginSchema>;

export const addEmployeeSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  mobileNumber: z
    .string()
    .min(10, { message: "Phone number must be 10 digits" })
    .max(10, { message: "Phone number must be 10 digits" })
    .regex(/^\d+$/, { message: "Phone number must contain only digits" }),
});

export type AddEmployeeForm = z.infer<typeof addEmployeeSchema>;

export const contactForm = z.object({
  companyName: z.string().min(1),
  emailForContact: z.string().email(),
  title: z.string().min(5),
  message: z.string().min(20),
});

export type ContactForm = z.infer<typeof contactForm>;
