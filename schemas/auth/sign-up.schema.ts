//import zod
import { z } from 'zod';

/**
 * Zod schema untuk validasi sign-up
 */
export const signUpSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters long').max(100, 'Name must be at most 100 characters long'),
    email: z.string().trim().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters long').max(100, 'Password must be at most 100 characters long'),
    termsAccepted: z.boolean().refine((val) => val === true, {
        message: 'You must accept the terms and conditions',
    }),
});

export type SignUpSchema = z.infer<typeof signUpSchema>;

