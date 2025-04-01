import type { Snippet } from 'svelte';
import { Tween } from 'svelte/motion';

export type Custom = {
  button?: ClassValue;
  progress?: ClassValue;
  item?: ClassValue;
  inner?: Record<string, ClassValue>;
};

// export type Easing = (x: number) => number;

export type Tweening = (ms?: number) => {
  duration: number;
  delay: number;
  easing: (x: number) => number;
};

// export type Show = number | Map<number, number>;

// export type Controls = string | string[];

// export type Loaded = ((x?: Event | HTMLElement) => void) | undefined;

export interface CarouselAttributes {
  tag?: 'a' | 'div' | 'aside' | 'section';
  children?: Snippet<[number, number, number?]>;
  data?: (ImageResult & {
    caption: Record<string, string>;
  })[];
  class?: ClassValue;
  custom?: Custom;
  show?: number | Map<number, number>;
  ratio?: number;
  stream?: boolean;
  duration?: number;
  delay?: number;
  easing?: (x: number) => number;
  autoplay?: boolean;
  pause?: number;
  controls?: string | string[];
  alt?: string;
  native?: boolean;
  loaded?: (x?: Event | HTMLElement) => void;
  progress?: Snippet<[Tween<number>, number, number]> | true;
  check?: Snippet;
  control?: Snippet<[() => void, () => void, () => void]>;
  before?: Snippet;
  after?: Snippet;
}

export { default as Carousel } from './Carousel.svelte';
export { default as CarouselKit } from './CarouselData.svelte';
