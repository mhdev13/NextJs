//import zod
import { z } from 'zod';

/**
 * Zod schema untuk validasi sign-in
 */
export const signInSchema = z.object({
    email: z.string().trim().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters long').max(100, 'Password must be at most 100 characters long'),
});

export type SignInInput = z.infer<typeof signInSchema>;

