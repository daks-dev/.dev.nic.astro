import type { APIRoute } from 'astro';

// export const prerender = false;

export const GET: APIRoute = async ({ session }) => {
  return new Response(
    JSON.stringify({
      data: `${(Math.random() * 1000).toFixed().padStart(4, '0')} [${session?.sessionID}]`
    })
  );
};
