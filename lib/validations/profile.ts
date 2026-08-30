import { z } from "zod";

export const completeProfileSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must not exceed 50 characters"),
  lastName: z
    .string()
    .trim()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must not exceed 50 characters"),
  phone: z
    .string()
    .trim()
    .min(8, "Phone number must be at least 8 digits")
    .max(20, "Phone number must not exceed 20 digits")
    .regex(/^[0-9+\s-]+$/, "Invalid phone number"),
  age: z.coerce
    .number()
    .int("Age must be a whole number")
    .min(16, "Age must be at least 16")
    .max(100, "Age must be at most 100"),
});

export type CompleteProfileInput = z.input<typeof completeProfileSchema>;
export type CompleteProfileOutput = z.output<typeof completeProfileSchema>;
