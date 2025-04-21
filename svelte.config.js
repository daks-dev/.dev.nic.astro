import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte'],

  vitePlugin: {
    include: ['**/svelte/**']
    // inspector: { holdMode: true }
  },

  preprocess: [vitePreprocess()],

  kit: {}
};

export default config;
