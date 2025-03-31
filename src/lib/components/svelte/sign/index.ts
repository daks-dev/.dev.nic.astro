import type { IconAttributes } from '../icon/index.d.ts';

export type SignAttributes = IconAttributes & {
  [x in 'link' | 'small' | 'light' | 'dark' | 'auto']?: boolean;
};

export { default as Sign } from './Sign.svelte';
