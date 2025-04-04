import { Tween } from 'svelte/motion';
import type { Snippet } from 'svelte';
import type { SvelteHTMLElements } from 'svelte/elements';
import type { ImgAttriibutes } from '../img/index.d.ts';
import type { SignAttributes } from '../sign/index.d.ts';

export type Custom = {
  button?: ClassValue;
  progress?: ClassValue;
  item?: ClassValue;
  inner?: Record<string, ClassValue>;
};

export type Tweening = (ms?: number) => {
  duration: number;
  delay: number;
  easing: (x: number) => number;
};

export type CarouselAttributes = Omit<SvelteHTMLElements['div'], 'children' | 'class'> &
  Pick<SvelteHTMLElements['a'], 'href' | 'target'> & {
    children?: Snippet<[number, number, number?]>;
    tag?: 'a' | 'aside' | 'div';
    data?: (ImageResult & {
      alt?: string;
      caption?: Record<string, string>;
    })[];
    class?: ClassValue;
    custom?: Custom;
    appear?: number;
    show?: number | Map<number, number>;
    ratio?: number;
    stream?: boolean;
    duration?: number;
    delay?: number;
    easing?: (x: number) => number;
    autoplay?: boolean;
    pause?: number;
    controls?: string | string[];
    img?: Omit<ImgAttriibutes, 'src' | 'class' | 'alt'>;
    alt?: string;
    eager?: boolean;
    lazyload?: boolean;
    loaded?: (x?: Event | HTMLElement) => void;
    progress?: Snippet<[Tween<number>, number, number]> | true;
    check?: Snippet;
    control?: Snippet<[() => void, () => void, () => void]>;
    before?: Snippet;
    after?: Snippet;
  };
export type CarouselDataAttributes = CarouselAttributes & {
  sign?: string | SignAttributes;
  grayscale?: boolean;
  invert?: boolean;
  checked?: boolean | string;
};

export { default as Carousel } from './Carousel.svelte';
export { default as CarouselKit } from './CarouselData.svelte';
