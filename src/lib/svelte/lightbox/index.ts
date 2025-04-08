import type { Snippet } from 'svelte';
import type { SvelteHTMLElements } from 'svelte/elements';
import type { ImgAttriibutes } from '../img/index.d.ts';
import type { SignAttributes } from '../sign/index.d.ts';

export type Item = {
  id: number;
  title: string;
  description: string;
};

export type Options = {
  behaviour?: 'loop' | 'hide';
  swipe?: boolean;
  wheel?: boolean;
  clickableClose?: boolean;
  buttonClose?: boolean;
  buttonFullscreen?: boolean;
  enableKeyboard?: boolean;
  bodyScroll?: boolean;
  duration?: number;
};

export type Custom = {
  overlay?: ClassValue;
  header?: ClassValue;
  footer?: ClassValue;
  thumb?: ClassValue;
  item?: ClassValue;
  inner?: Record<string, ClassValue>;
};

export type Status =
  | {
      countItems: number;
      activeItem: number;
    }
  | undefined;

export type LightboxAttributes = Omit<SvelteHTMLElements['div'], 'class' | 'title'> & {
  tag?: 'div' | 'aside' | 'section';
  class?: ClassValue;
  custom?: Custom;
  title?: string;
  description?: string;
  options?: Options;
  fullscreen?: boolean;
  scrollable?: boolean;
  loader?: () => void;
  thumbnail?: Snippet;
};

export type LightboxDataAttributes = LightboxAttributes & {
  data: {
    thumb: ImageResult;
    modal: ImageResult;
    alt?: string;
    caption: Record<string, string>;
  }[];
  show?: number;
  img?: Omit<ImgAttriibutes, 'src' | 'class' | 'alt'>;
  alt?: string;
  figcaption?: boolean;
  sign?: string | SignAttributes;
  grid?: boolean;
  adaptive?: boolean;
  centered?: boolean;
  rounded?: boolean;
  shadow?: boolean;
  scale?: boolean;
  grayscale?: boolean;
  invert?: boolean;
  eager?: boolean;
  lazyload?: boolean;
};
