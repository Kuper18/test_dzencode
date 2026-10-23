import z from 'zod';

const priceSchema = z.object({
  value: z
    .string()
    .trim()
    .min(1, 'Price is required')
    .refine(
      (value) => Number.isFinite(Number(value)) && Number(value) > 0,
      'Price must be greater than zero'
    ),
  currency: z.enum(['USD', 'UAH']),
  is_default: z.boolean(),
});

export const productSchema = z
  .object({
    title: z.string().trim().min(1, 'Title is required'),

    serial_number: z
      .string()
      .trim()
      .min(1, 'Serial number is required')
      .refine(
        (value) => /^\d+$/.test(value) && Number(value) > 0,
        'Enter a positive whole number'
      ),

    is_new: z.boolean(),

    type: z.string().trim().min(1, 'Type is required'),

    specification: z.string().trim().min(1, 'Specification is required'),

    guarantee_start: z.string().min(1, 'Guarantee start is required'),

    guarantee_end: z.string().min(1, 'Guarantee end is required'),
    image: z
      .custom<FileList>()
      .refine((files) => files?.length === 1, 'Image is required')
      .refine(
        (files) => files?.[0]?.size <= 5 * 1024 * 1024,
        'Image must be smaller than 5 MB'
      )
      .refine(
        (files) =>
          ['image/jpeg', 'image/png', 'image/webp'].includes(files?.[0]?.type),
        'Only JPEG, PNG, and WebP images are allowed'
      ),

    order: z
      .string()
      .trim()
      .min(1, 'Order ID is required')
      .refine(
        (value) => /^\d+$/.test(value) && Number(value) > 0,
        'Enter a valid order ID'
      ),

    prices: z
      .array(priceSchema)
      .length(2, 'Both USD and UAH prices are required'),
  })
  .superRefine((data, ctx) => {
    if (data.guarantee_end < data.guarantee_start) {
      ctx.addIssue({
        code: 'custom',
        path: ['guarantee_end'],
        message: 'Guarantee end must be after the start date',
      });
    }

    if (data.prices.filter((price) => price.is_default).length !== 1) {
      ctx.addIssue({
        code: 'custom',
        path: ['prices'],
        message: 'Select exactly one default price',
      });
    }

    const currencies = data.prices.map((price) => price.currency);

    if (
      new Set(currencies).size !== 2 ||
      !currencies.includes('USD') ||
      !currencies.includes('UAH')
    ) {
      ctx.addIssue({
        code: 'custom',
        path: ['prices'],
        message: 'You must provide one USD price and one UAH price',
      });
    }
  });

export type ProductFormValues = z.infer<typeof productSchema>;
