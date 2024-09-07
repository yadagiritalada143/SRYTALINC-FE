import { z } from "zod";

export const employeeSchema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  email: z.string().email("Invalid email address"),
  mobileNumber: z.string().regex(/^\d{10}$/, "Mobile number must be 10 digits"),
  bloodGroup: z.string().min(1, "Blood Group is required"),
  accountNumber: z.string().min(10, "Account Number is required"),
  accountHolderName: z.string().min(1, "Account Holder Name is required"),
  ifscCode: z.string().min(1, "IFSC Code is required"),
  employmentType: z.string().min(1, "Employment Type is required"),
});

export type EmployeeUpdateForm = z.infer<typeof employeeSchema>;
