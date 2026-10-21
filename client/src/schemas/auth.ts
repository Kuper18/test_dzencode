import { z } from 'zod';

const emailSchema = z.email('Please enter a valid email address');

const nameSchema = z
  .string()
  .trim()
  .min(1, 'Field is required')
  .min(2, 'Should be at least 2 characters')
  .max(50, 'Cannot exceed 50 characters');


const passwordSchema = z
  .string()
  .min(1, 'Password is required')
  .min(8, 'Password must contain at least 8 characters');

const confirmPasswordSchema = z.string().min(1, 'Please confirm your password');

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const signupSchema = z
  .object({
    email: emailSchema,
    first_name: nameSchema,
    last_name: nameSchema,
    password: passwordSchema,
    confirmPassword: confirmPasswordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;
