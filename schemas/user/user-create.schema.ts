//import zod
import { z } from 'zod';

/** 
 * Zod schema untuk validasi pembuatan user
*/

export const createUserSchema  = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters long').max(100, 'Name must be at most 100 characters long'),
    email: z.string().trim().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters long').max(100, 'Password must be at most 100 characters long'),
});

export type CreateUserInput  = z.infer<typeof createUserSchema >;