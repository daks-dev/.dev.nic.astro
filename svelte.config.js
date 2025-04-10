import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte'],
  preprocess: [vitePreprocess()],

  kit: {}
};

export default config;
