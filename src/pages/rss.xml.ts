import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import app from '@app/configs/app';

import dayjs from 'dayjs';
import custom from 'dayjs/plugin/customParseFormat.js';
dayjs.extend(custom);

export async function GET(context: { site: string | URL }) {
  const projects = await getCollection('projects');
  const partners = await getCollection('partners');
  const articles = await getCollection('articles');
  const news = await getCollection('news');
  return rss({
    title: app.name,
    description: app.description,
    site: context.site,
    items: [
      ...projects.map((x) => ({
        ...x.data,
        link: `/projects/${x.id}`
      })),
      ...partners.map((x) => ({
        ...x.data,
        link: `/partners/${x.id}`
      })),
      ...articles.map((x) => ({
        ...x.data,
        pubDate: dayjs(x.data.publishDate, 'YY-MM-DD').toDate(),
        link: `/articles/${x.id}`
      })),
      ...news.map((x) => {
        x.data.title += ` • ${x.id}`;
        x.data.description += ` • ${x.id}`;
        return {
          ...x.data,
          pubDate: dayjs(x.id, 'YY-MM-DD').toDate(),
          link: `/news/${x.id}`
        };
      })
    ],
    trailingSlash: false
  });
}
