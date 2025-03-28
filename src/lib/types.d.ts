/// <reference types="svelte" />

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
  import type { AstroComponentFactory } from 'astro/runtime/server/index.js';
  export default class Component extends AstroComponentFactory {}
  export const file: string;
  export const url: string | undefined;
}

declare type ClassValue = string | ClassValue[] | false | 0 | null | undefined;
