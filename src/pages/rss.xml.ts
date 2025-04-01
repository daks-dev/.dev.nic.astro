import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import app from '@app/configs/app';

export async function GET(context: { site: string | URL }) {
  const projects = await getCollection('projects');
  return rss({
    title: app.name,
    description: app.description,
    site: context.site,
    items: projects.map((x) => ({
      ...x.data,
      link: `/projects/${x.id}`
    })),
    trailingSlash: false
  });
}
