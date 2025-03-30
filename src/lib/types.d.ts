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

type ImageFormat =
  | 'heic'
  | 'heif'
  | 'avif'
  | 'jpeg'
  | 'jpg'
  | 'png'
  | 'tiff'
  | 'webp'
  | 'gif'
  | 'svg';
type ImageQuality = 'low' | 'mid' | 'high' | 'max' | number;
declare type ImageTransform = {
  width?: number;
  height?: number;
  quality?: ImageQuality;
  format?: ImageFormat;
};
declare interface ImageMetadata {
  src: string;
  width: number;
  height: number;
  format?: ImageFormat;
  orientation?: number;
}
declare type ImageResult = {
  src: string;
  attributes: Record<string, any>;
};
