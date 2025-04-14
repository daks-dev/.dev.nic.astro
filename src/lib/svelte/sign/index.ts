import type { SvelteHTMLElements } from 'svelte/elements';

export type SignAttributes = Omit<SvelteHTMLElements['div'], 'class'> & {
  custom: ClassValue;
  class?: ClassValue;
} & {
  [x in 'link' | 'small' | 'light' | 'dark' | 'auto']?: boolean;
};

export { default as Sign } from './Sign.svelte';
