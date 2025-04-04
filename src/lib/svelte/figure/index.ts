import type { Snippet } from 'svelte';
import type { SvelteHTMLElements } from 'svelte/elements';
import type { ImgAttriibutes } from '../img/index.d.ts';

export type FigureAttriibutes = Omit<SvelteHTMLElements['figure'], 'class'> & {
  src: string | ImageResult;
  img?: Omit<ImgAttriibutes, 'src' | 'class'>;
  caption?: Record<string, string | undefined>;
  class?: ClassValue;
  custom?: Record<string, ClassValue>;
  alt?: string;
  eager?: boolean;
  lazyload?: boolean;
  loaded?: (x?: Event | HTMLElement) => void;
  before?: Snippet;
  after?: Snippet;
};
