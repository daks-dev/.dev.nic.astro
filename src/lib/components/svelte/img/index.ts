import type { Snippet } from 'svelte';
import type { SvelteHTMLElements } from 'svelte/elements';

export type ImgAttriibutes = Omit<SvelteHTMLElements['img'], 'src' | 'class'> & {
  src: string | ImageResult;
  class?: ClassValue;
  alt?: string;
  eager?: boolean;
  lazyload?: boolean;
  loaded?: (x?: Event | HTMLElement) => void;
  before?: Snippet;
  after?: Snippet;
};
