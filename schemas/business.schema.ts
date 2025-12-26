import { z } from 'zod';

export const businessSchema = z.object({
  businessName: z.string().min(2),
  contactPerson: z.string().min(2),
  phoneNumber: z.string().min(7),
  email: z.string().email(),
  location: z.string().min(3),
});

export type BusinessFormData = z.infer<typeof businessSchema>;
