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
  companyName: z
    .string({ required_error: "Please enter the company name !" })
    .min(1, { message: "Please enter the company name !" }),
  emailForContact: z
    .string({ required_error: "Please enter valid email !" })
    .email({ message: "Please enter valid email !" }),
  subject: z
    .string({ required_error: "Please enter the Subject !" })
    .min(1, { message: "Please enter the Subject !" }),
  message: z
    .string({ required_error: "Please enter the Message !" })
    .min(1, { message: "Please enter the Message !" }),
});

export type ContactForm = z.infer<typeof contactForm>;
