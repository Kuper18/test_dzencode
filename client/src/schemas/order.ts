import z from 'zod';

export const orderSchema = z.object({
  title: z.string().trim().min(1, 'Title is required'),
  description: z.string().trim().min(1, 'Description is required'),
});

export type OrderFormValues = z.infer<typeof orderSchema>;
