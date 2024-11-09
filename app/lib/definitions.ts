import { z } from 'zod'
 
export const SignupFormSchema = z.object({
  fullname: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long.' })
    .trim(),
  email: z
    .string()
    .email({ message: 'Please enter a valid email.' })
    .trim(),
  phone_no: z
    .string()
    .min(11, { message: 'Must be at least 11 characters long.' })
    .regex(/^\d+$/, { message: 'Must contain only numbers.' })
    .trim(),
  password: z
    .string()
    .min(8, { message: 'Must be at least 8 characters long.' })
    .regex(/[a-zA-Z]/, { message: 'Must contain at least one letter.' })
    .regex(/[0-9]/, { message: 'Must contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Must contain at least one special character.',
    })
    .trim(),
});

export const SensorDataOutSchema = z.object({
  data_id: z.string().uuid(),  // UUID as a string with validation
  device_id: z.string().uuid(),  // UUID as a string with validation
  mq5_level: z.number().optional(),  // Optional float
  motion_status: z.number().int().optional(),  // Optional integer
  temperature: z.number().optional(),  // Optional float
  humidity: z.number().optional(),  // Optional float
  recorded_at: z.string().datetime(),  // ISO 8601 datetime as string
  updated_at: z.string().datetime(),  // ISO 8601 datetime as string
});
