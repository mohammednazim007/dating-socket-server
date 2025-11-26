import { z } from "zod";

const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
const phoneRegex = /^(?:\+?88)?01[3-9]\d{8}$/;

export const securityValidation = z.object({
  phone: z.string().regex(phoneRegex, "Invalid phone number"),
  currentPassword: z
    .string()
    .optional()
    .refine((val) => !val || passwordRegex.test(val), "Password is too weak"),

  confirmPassword: z.string().optional(),
  twoFactorEnabled: z.boolean(),
  lastPasswordChange: z.date().optional(),
});

export type SecuritySchemaType = z.infer<typeof securityValidation>;
