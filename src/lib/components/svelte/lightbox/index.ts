import type { Snippet } from 'svelte';

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
  item?: ClassValue;
  inner?: Record<string, ClassValue>;
};

export type LightboxAttributes = {
  tag?: 'div' | 'aside' | 'section';
  class?: ClassValue;
  custom?: Custom;
  title?: string;
  subtitle?: string;
  description?: string;
  options?: Options;
  fullscreen?: boolean;
  scrollable?: boolean;
  loader?: () => void;
  thumbnail?: Snippet;
};

export type Item = {
  id: number;
  title: string;
  subtitle: string;
  description: string;
};

export type Status =
  | {
      countItems: number;
      activeItem: number;
    }
  | undefined;
