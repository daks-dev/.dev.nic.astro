import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

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
      customer: z
        .number()
        .transform((x) => x.toFixed().padStart(3, '0'))
        .optional(),
      priority: z.number().int().min(0).max(9).optional().default(0),
      hidden: z.boolean().optional().default(false),
      poster: z.number().optional().default(0),
      images: z.array(
        z.object({
          src: image(),
          alt: z.string().optional().default(''),
          caption: z.record(z.string(), z.string()).optional()
        })
      )
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
      center: z.string().optional(),
      zoom: z.number().positive().optional().default(10),
      priority: z.number().int().min(0).max(9).optional().default(0),
      hidden: z.boolean().optional().default(false),
      image: z.object({
        src: image(),
        alt: z.string().optional().default(''),
        caption: z.record(z.string(), z.string()).optional()
      })
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
            alt: z.string().optional().default(''),
            caption: z.record(z.string(), z.string()).optional()
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
            src: z.preprocess((val) => `./${val}`, image()),
            alt: z.string().optional().default(''),
            caption: z.record(z.string(), z.string()).optional()
          })
        )
        .optional()
    })
});

const gallery = defineCollection({
  loader: glob({ pattern: '**/*.{yml,yaml}', base: 'src/content/gallery' }),
  schema: ({ image }) =>
    z.array(
      z
        .object({
          src: z.preprocess((val) => `./${val}`, image()),
          alt: z.string().optional().default(''),
          caption: z.record(z.string(), z.string()).optional()
        })
        .catchall(z.union([z.string(), z.number(), z.boolean()]))
    )
});

export const collections = {
  projects,
  partners,
  articles,
  news,
  gallery
};
