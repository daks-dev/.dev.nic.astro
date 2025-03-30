import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      images: z
        .array(
          z.object({
            src: image(), // z.preprocess((val) => `${val}`, image()),
            alt: z.string().optional()
          })
        )
        .optional(),
      title: z.string().optional(),
      description: z.string().optional()
    })
});

const gallery = defineCollection({
  loader: file('src/content/gallery/index.yaml'),
  schema: ({ image }) =>
    z.array(
      z.object({
        image: z.preprocess((val) => `./images/${val}`, image()),
        caption: z.object({
          title: z.string().optional(),
          subtitle: z.string().optional(),
          description: z.string().optional()
        })
      })
    )
});

export const collections = { projects, gallery };
