// import { defineMiddleware, sequence } from 'astro:middleware';
import type { MiddlewareHandler } from 'astro';

export const onRequest: MiddlewareHandler = ({ request }, next) => {
  console.log('middleware referrer: ', request.referrer);
  return next();
};
