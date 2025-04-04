import type { HTMLAttributes } from 'astro/types';
import type { ImgAttriibutes } from '../img/index.d.ts';

export type FigureAttriibutes = Omit<HTMLAttributes<'figure'>, 'class'> & {
  src: string | ImageResult;
  img?: Omit<ImgAttriibutes, 'src' | 'class'>;
  caption?: Record<string, string | undefined>;
  class?: ClassValue;
  custom?: Record<string, ClassValue>;
  alt?: string;
  eager?: boolean;
  lazyload?: boolean;
};
