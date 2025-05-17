import { z } from "zod";

const profileUpdateSchema = z.object({
  firstName: z
    .string({ required_error: "First Name is required." })
    .min(5, { message: "First Name must be at least 5 characters long." })
    .max(50, { message: "First Name is must less than 50." }),

  lastName: z
    .string({ required_error: "Last Name is required." })
    .min(5, { message: "Last Name must be at least 5 characters long." })
    .max(50, { message: "Last Name is must less than 50." }),

  userName: z
    .string({ required_error: "User Name is required." })
    .min(5, { message: "Username must be at least 5 characters long." }),

  email: z
    .string({ required_error: "Email is required." })
    .email({ message: "Invalid email address." }),

  phoneNumber: z
    .string({ required_error: "Phone Number is required." })
    .min(10, { message: "Phone number must be at least 10 digits." })
    .max(10, { message: "Phone number is too long." })
    .regex(/^0[79]\d{8}$/, {
      message:
        "Phone number must start with '09' or '07' and be 10 digits long.",
    }),
});

export type profileUpdateData = z.infer<typeof profileUpdateSchema>;

export default profileUpdateSchema;
