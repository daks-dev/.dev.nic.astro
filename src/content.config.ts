import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: 'src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string().nonempty(),
      description: z.string().nonempty(),
      address: z.string().nonempty(),
      location: z.string().nonempty(),
      area: z.number().int().positive().optional(),
      area_term: z.string().optional(),
      area_unit: z.string().optional(),
      units: z.number().int().positive().optional(),
      units_term: z.string().optional(),
      scope: z.string().optional(),
      scope_term: z.string().optional(),
      activities: z.array(z.string()).optional(),
      images: z
        .array(
          z.object({
            src: image(),
            alt: z.string().optional().default('')
          })
        )
        .optional(),
      customer: z
        .number()
        .transform((x) => x.toFixed().padStart(3, '0'))
        .optional(),
      priority: z.number().int().min(0).max(9).optional().default(0),
      hidden: z.boolean().optional().default(false)
    })
});

const partners = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: 'src/content/partners' }),
  schema: ({ image }) =>
    z.object({
      title: z.string().nonempty(),
      description: z.string().nonempty(),
      telephone: z.string().optional(),
      email: z.string().email().optional(),
      url: z.string().url().optional(),
      address: z.string().optional(),
      image: z.object({
        src: image(),
        alt: z.string().optional().default('')
      }),
      center: z.string().optional(),
      zoom: z.number().positive().optional().default(10),
      priority: z.number().int().min(0).max(9).optional().default(0),
      hidden: z.boolean().optional().default(false)
    })
});

const articles = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: 'src/content/articles' }),
  schema: ({ image }) =>
    z.object({
      title: z.string().nonempty(),
      description: z.string().nonempty(),
      publishDate: z.string().nonempty(),
      poster: z.number().optional().default(0),
      images: z
        .array(
          z.object({
            src: image(),
            alt: z.string().optional().default('')
          })
        )
        .optional()
    })
});

const news = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: 'src/content/news' }),
  schema: ({ image }) =>
    z.object({
      title: z.string().nonempty(),
      description: z.string().nonempty(),
      poster: z.number().optional().default(0),
      images: z
        .array(
          z.object({
            src: image(),
            alt: z.string().optional().default('')
          })
        )
        .optional()
    })
});

const feedback = defineCollection({
  loader: file('src/content/feedback/index.yaml'),
  schema: ({ image }) =>
    z.array(
      z.object({
        image: z.preprocess((val) => `./${val}`, image()),
        caption: z
          .object({
            title: z.string().optional(),
            description: z.string().optional()
          })
          .optional()
          .default({})
      })
    )
});

const permissions = defineCollection({
  loader: file('src/content/permissions/index.yaml'),
  schema: ({ image }) =>
    z.array(
      z.object({
        image: z.preprocess((val) => `./${val}`, image()),
        caption: z
          .object({
            title: z.string().optional(),
            description: z.string().optional()
          })
          .optional()
          .default({})
      })
    )
});

const gallery = defineCollection({
  loader: file('src/content/gallery/index.yaml'),
  schema: ({ image }) =>
    z.array(
      z.object({
        image: z.preprocess((val) => `./${val}`, image()),
        caption: z
          .object({
            title: z.string().optional().optional(),
            subtitle: z.string().optional().optional(),
            description: z.string().optional().optional()
          })
          .optional()
          .default({})
      })
    )
});
export const collections = {
  projects,
  partners,
  permissions,
  feedback,
  articles,
  news,
  gallery
};
