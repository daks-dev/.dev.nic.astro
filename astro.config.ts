import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'astro/config';

import node from '@astrojs/node';

import tailwindcss from '@tailwindcss/vite';
import yaml from '@rollup/plugin-yaml';

import mdx from '@astrojs/mdx';
import svelte from '@astrojs/svelte';

import compress from 'astro-compress';
import compressor from 'astro-compressor';
import sitemap from '@astrojs/sitemap';

import AstroPWA from '@vite-pwa/astro';

const minify = {
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
};

export default defineConfig({
  experimental: {
    preserveScriptOrder: true
  },

  site: 'https://stroyexp.info',
  base: '/',
  trailingSlash: 'never',

  outDir: 'build',

  output: 'server',
  adapter: node({ mode: 'standalone' }),

  // redirects: { '/old': '/new', '/old/[...slug]': '/new/[...slug]' }

  prefetch: {
    defaultStrategy: 'viewport',
    prefetchAll: false
  },

  vite: {
    logLevel: 'info',
    ssr: {
      noExternal: ['@daks.dev/astro.sdk']
    },
    optimizeDeps: {
      exclude: ['@daks.dev/astro.sdk']
    },
    server: {
      fs: { strict: false }
    },
    // build: { target: 'esnext' },
    // define: { 'process.env': process.env },
    resolve: {
      alias: {
        '@iconset': fileURLToPath(new URL('./src/assets/icons/bundle', import.meta.url))
      }
    },
    plugins: [yaml(), tailwindcss()]
  },

  scopedStyleStrategy: 'where',

  integrations: [
    svelte({
      include: ['**/svelte/**']
    }),

    mdx(),

    sitemap({
      filter: (x) => !/\/(204|403|admin|search)$/.test(x),
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date()
    }),

    compress({
      HTML: {
        'html-minifier-terser': minify
      },
      CSS: false,
      Image: false,
      SVG: false,
      Logger: 1
    }),

    AstroPWA({
      mode: 'production',
      base: '/',
      scope: '/',
      includeAssets: ['favicon.ico', 'favicon/**/*.{svg,png}'],
      registerType: 'autoUpdate',
      workbox: {
        // skipWaiting: true,
        // globDirectory: 'build',
        globPatterns: [
          '**/*.{html,css,js,json,xml,txt,ico,svg,png,jpg,jpeg,gif,webp,avif,woff,woff2,ttf,eot}'
        ],
        globIgnores: ['404*', '500*'],
        maximumFileSizeToCacheInBytes: 2500000,
        navigateFallback: '/204'
      },
      devOptions: {
        enabled: false
        // navigateFallbackAllowlist: [/^\/204$/]
      },
      experimental: {
        // directoryAndTrailingSlashHandler: true
      }
    }),

    compressor()
  ],

  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true
    }
  }
});
