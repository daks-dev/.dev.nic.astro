// <reference types="vite/client" />
// <reference types="astro" />
// <reference types="astro/client" />
// <reference types="svelte" />
// <reference types="@sveltejs/kit" />

/*
type Astro = import('astro').AstroGlobal;
declare const Astro: Readonly<Astro>;
*/

declare namespace App {
  interface Locals {
    user: {
      uuid: ReturnType<typeof crypto.randomUUID>; // string;
      name: string;
    };
  }
}

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
  export const file: string;
  export const url: string | undefined;
  export default class Component extends AstroComponentFactory {}
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
