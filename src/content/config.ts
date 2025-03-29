import { defineCollection, z } from 'astro:content';

const gallery = defineCollection({
  type: 'data',
  schema: ({ image }) =>
    z.array(
      z.object({
        image: z.preprocess((val) => `./images/${val}`, image()),
        /*
          .refine((img) => img.width >= 320, {
            message: 'Gallery image must be at least 320 pixels wide!'
          }),
        */
        caption: z.object({
          title: z.string().optional(),
          subtitle: z.string().optional(),
          description: z.string().optional()
        })
      })
    )
});

export const collections = { gallery };
