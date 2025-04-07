import type { HTMLAttributes } from 'astro/types';

export type NavLink = Omit<HTMLAttributes<'a'>, 'class'> & {
  class?: ClassValue;
  label?: string;
  icon?: string;
  pointer?: boolean;
  prefetch?: boolean;
};

export type NavItem = NavLink & {
  base?: string;
  disallow?: boolean;
  items?: NavItem[];
};

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

export { default as Img } from './img/Img.astro';
export { default as Icon } from './icon/Icon.astro';
export { default as Link } from './link/Link.astro';
export { default as Button } from './button/Button.astro';
export { default as Figure } from './figure/Figure.astro';
export { default as Video } from './video/Video.astro';

export { default as Dropdown } from './dropdown/Dropdown.astro';
export { default as Head } from './head/Head.astro';
export { default as Sign } from './sign/Sign.astro';

export { default as FormattedDate } from './formatted-date/FormattedDate.astro';

export { default as BagePlaceholder } from './skeleton/BagePlaceholder.astro';
export { default as CardPlaceholder } from './skeleton/CardPlaceholder.astro';
export { default as ImagePlaceholder } from './skeleton/ImagePlaceholder.astro';
export { default as ListPlaceholder } from './skeleton/ListPlaceholder.astro';
export { default as Skeleton } from './skeleton/Skeleton.astro';
export { default as TestimonialPlaceholder } from './skeleton/TestimonialPlaceholder.astro';
export { default as TextPlaceholder } from './skeleton/TextPlaceholder.astro';
export { default as VideoPlaceholder } from './skeleton/VideoPlaceholder.astro';
export { default as WidgetPlaceholder } from './skeleton/WidgetPlaceholder.astro';

export { default as YandexMap } from './yandex/YandexMap.astro';
export { default as YandexMetrika } from './yandex/YandexMetrika.astro';
export { default as YandexMetrikaHit } from './yandex/YandexMetrikaHit.astro';

export { default as BindCarouselData } from './bind/BindCarouselData.astro';
export { default as BindLightboxData } from './bind/BindLightboxData.astro';
