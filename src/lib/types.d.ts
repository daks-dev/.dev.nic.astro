// <reference types="astro" />
// <reference types="svelte" />

/*
type Astro = import('astro').AstroGlobal;
declare const Astro: Readonly<Astro>;
*/

/*
interface AstroInstance {
  // The file path of this file
  file: string;
  // The URL for this file (if it is in the pages directory)
  url: string | undefined;
  default: AstroComponentFactory;
}
*/

declare module '*.astro' {
  import type { AstroComponentFactory } from 'astro/runtime/server/index.d.ts';
  export default class Component extends AstroComponentFactory {}
  export const file: string;
  export const url: string | undefined;
}

declare module '*.yml' {
  const value: JSON;
  export default value;
}
declare module '*.yaml' {
  const value: JSON;
  export default value;
}

declare type Meta = string | number | boolean | Meta[] | null | undefined;
declare type Metadata = Record<string, Meta>;

declare type ClassValue = string | false | 0 | ClassValue[] | null | undefined;

declare type ImageTransform = Omit<import('astro').ImageTransform, 'src'>;

declare type ImageResult = {
  src: string;
  attributes?: Metadata;
};
