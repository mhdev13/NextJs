//import zod
import { z } from 'zod';
import { id } from 'zod/locales';

/** 
 * Zod schema untuk validasi pembuatan user
*/

export const updateUserSchema = z.object({
    id: z.string().cuid('Invalid user ID'),
    name: z.string().min(2, 'Name must be at least 2 characters long').max(100, 'Name must be at most 100 characters long').optional(),
    email: z.string().trim().email('Invalid email address').optional(),
    password: z
        .string()
        .optional()
        .or(z.literal(""))
        .refine((v) => !v || v.length >= 8, "Password minimal 8 karakter"),
});

export type UpdateUserInput  = z.infer<typeof updateUserSchema >;