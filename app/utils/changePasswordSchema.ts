import { z } from "zod";

const changePasswordSchema = z
  .object({
    currentPassword: z.string().readonly(),
    newPassword: z
      .string({ required_error: "Password is required." })
      .min(8, { message: "Password must be at least 8 characters long." })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter.",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter.",
      })
      .regex(/\d/, { message: "Password must contain at least one digit." })
      .regex(/[\W_]/, {
        message: "Password must contain at least one special character.",
      }),

    confirmPassword: z
      .string({ required_error: "Confirm Password is required." })
      .min(8, { message: "Confirm Password is at least 8 charcter." }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"], // Error is linked to the confirmPassword field
  });

export type changePasswordData = z.infer<typeof changePasswordSchema>;
export default changePasswordSchema;
