import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  if (!context.isPrerendered) {
    context.session?.set('lastVisit', new Date());
  }
  return next();
});
