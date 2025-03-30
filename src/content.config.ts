import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      images: z
        .array(
          z.object({
            src: image(),
            alt: z.string().optional()
          })
        )
        .optional(),
      title: z.string(),
      description: z.string()
    })
});

const gallery = defineCollection({
  loader: file('src/content/gallery/index.yaml'),
  schema: ({ image }) =>
    z.array(
      z.object({
        image: z.preprocess((val) => `./${val}`, image()),
        caption: z.object({
          title: z.string().optional().optional(),
          subtitle: z.string().optional().optional(),
          description: z.string().optional().optional()
        })
      })
    )
});

const feedback = defineCollection({
  loader: file('src/content/feedback/index.yaml'),
  schema: ({ image }) =>
    z.array(
      z.object({
        image: z.preprocess((val) => `./${val}`, image()),
        caption: z.object({
          title: z.string(),
          description: z.string().optional()
        })
      })
    )
});

const partners = defineCollection({
  loader: file('src/content/partners/index.yaml'),
  schema: ({ image }) =>
    z.array(
      z.object({
        image: z.preprocess((val) => `./${val}`, image()),
        caption: z.object({
          title: z.string(),
          description: z.string().optional()
        })
      })
    )
});

const permissions = defineCollection({
  loader: file('src/content/permissions/index.yaml'),
  schema: ({ image }) =>
    z.array(
      z.object({
        image: z.preprocess((val) => `./${val}`, image()),
        caption: z.object({
          title: z.string(),
          description: z.string().optional()
        })
      })
    )
});

export const collections = {
  projects,
  gallery,
  feedback,
  partners,
  permissions
};
