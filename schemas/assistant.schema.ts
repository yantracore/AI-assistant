import { z } from 'zod';

export const assistantSchema = z.object({
  tone: z.enum(['professional', 'friendly', 'casual']),
  greeting: z.string().min(5),
  emailNotifications: z.boolean(),
});

export type AssistantSettingsData = z.infer<typeof assistantSchema>;
