import type { HTMLAttributes } from 'astro/types';

export type SignAttributes = Omit<HTMLAttributes<'div'>, 'class'> & {
  custom: ClassValue;
  class?: ClassValue;
} & {
  [x in 'link' | 'small' | 'light' | 'dark' | 'auto']?: boolean;
};

export { default as Sign } from './Sign.astro';
