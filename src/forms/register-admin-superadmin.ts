import { z } from "zod";

export const registerAdminBySuperAdminForm = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email(),
  mobileNumber: z
    .string()
    .min(10, { message: "Phone number must be 10 digits" })
    .max(10, { message: "Phone number must be 10 digits" })
    .regex(/^\d+$/, { message: "Phone number must contain only digits" })
    .optional()
    .or(z.literal("")),
  organizationId: z.string(),
  userRole: z.enum(["admin"]),
});

export type RegisterAdminBySuperAdminForm = z.infer<
  typeof registerAdminBySuperAdminForm
>;
