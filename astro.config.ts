import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'astro/config';

// import AstroPWA from '@vite-pwa/astro';

// import node from '@astrojs/node';

import svelte from '@astrojs/svelte';
import tailwindcss from '@tailwindcss/vite';
import yaml from '@rollup/plugin-yaml';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import compress from 'astro-compress';

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
    // define: { 'process.env': process.env },
    resolve: {
      alias: {
        '@iconset': fileURLToPath(new URL('./src/assets/icons/bundle', import.meta.url))
      }
    },
    plugins: [tailwindcss(), yaml()]
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
      HTML: {
        'html-minifier-terser': {
          caseSensitive: true,
          collapseBooleanAttributes: true,
          collapseInlineTagWhitespace: true,
          collapseWhitespace: true,
          conservativeCollapse: true, //+  error Svelte render {@html ...}
          // continueOnParseError: true, //?
          decodeEntities: true,
          minifyCSS: true,
          minifyJS: true,
          minifyURLs: true,
          //preserveLineBreaks: true, //+
          removeAttributeQuotes: true,
          removeComments: false, //- error Svelte CSR head tags modify & for astro comporess
          removeOptionalTags: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          removeTagWhitespace: true, //- error FF analise code ? for astro comporess
          useShortDoctype: true
        }
      },
      CSS: false,
      Image: false,
      SVG: false,
      Logger: 1
    })

    /*AstroPWA({
      mode: 'production',
      base: '/',
      scope: '/',
      // includeAssets: ['favicon.svg'],
      registerType: 'autoUpdate',
      workbox: {
        skipWaiting: true,
        globDirectory: 'build/',
        globPatterns: [*/
    // '**/*.{html,css,js,json,txt,ico,svg,png,jpg,jpeg,gif,webp,avif,woff,woff2,ttf,eot}'
    /*]
        // navigateFallback: '/'
      },
      devOptions: {
        enabled: false
        // navigateFallbackAllowlist: [/^\//]
      },
      experimental: {
        // directoryAndTrailingSlashHandler: true
      }
    })*/
  ],

  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true
    }
  }
});
