import type { HTMLAttributes } from 'astro/types';

type HtmlImgAttriibutes = Omit<HTMLAttributes<'img'>, 'src' | 'class'>;

export type ImgAttriibutes = HtmlImgAttriibutes & {
  src: string | ImageResult;
  class?: ClassValue;
  alt?: string;
  eager?: boolean;
  lazyload?: boolean;
};
