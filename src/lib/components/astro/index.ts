import type { HTMLAttributes } from 'astro/types';

export interface NavItem extends Omit<HTMLAttributes<'a'>, 'class'> {
  class?: ClassValue;
  label?: string;
  icon?: string;
  size?: number | string;
  pointer?: true;
  prefetch?: true;
  disallow?: true;
  items?: NavItem[];
}

export interface NavSite {
  navbar: {
    items: NavItem[];
  };
  draver?: {
    items: NavItem[];
  };
  footer?: {
    items: NavItem[];
  };
  allow?: string[];
}

export { default as Head } from './head/Head.astro';
export { default as Hero } from './hero/Hero.astro';
export { default as Icon } from './icon/Icon.astro';
export { default as Link } from './link/Link.astro';
// export { default as YandexMetrika } from './yandex/YandexMetrika.astro';
