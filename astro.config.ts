// import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'astro/config';

import AstroPWA from '@vite-pwa/astro';

// import node from '@astrojs/node';

import compress from 'astro-compress';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import svelte from '@astrojs/svelte';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  experimental: {
    preserveScriptOrder: true
  },

  site: 'https://dev.stroyexp.info',
  base: '/',
  trailingSlash: 'never',

  outDir: 'build',

  // output: 'server',
  // adapter: node({ mode: 'standalone' }),

  // redirects: { '/old': '/new', '/old/[...slug]': '/new/[...slug]' }

  prefetch: {
    defaultStrategy: 'viewport',
    prefetchAll: false
  },

  vite: {
    logLevel: 'info',
    // server: { fs: { strict: false },
    // build: { target: 'esnext' },
    // define: { 'process.env': process.env }
    // resolve: { alias: { '@...': fileURLToPath(new URL('./src/...', import.meta.url)) } }
    plugins: [tailwindcss()]
  },

  scopedStyleStrategy: 'where',

  integrations: [
    svelte({
      include: ['**/svelte/**']
    }),

    mdx(),

    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date()
    }),

    compress({
      Image: false,
      SVG: false,
      Logger: 1
    }),

    AstroPWA({
      mode: 'production',
      base: '/',
      scope: '/',
      // includeAssets: ['favicon.svg'],
      registerType: 'autoUpdate',
      workbox: {
        skipWaiting: true,
        globDirectory: 'build/',
        globPatterns: [
          '**/*.{html,css,js,json,txt,ico,svg,png,jpg,jpeg,gif,webp,avif,woff,woff2,ttf,eot}'
        ]
        // navigateFallback: '/'
      },
      devOptions: {
        enabled: false
        // navigateFallbackAllowlist: [/^\//]
      },
      experimental: {
        // directoryAndTrailingSlashHandler: true
      }
    })
  ],

  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true
    }
  }
});
