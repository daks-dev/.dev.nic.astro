// app
export type { AppConfig } from './app/index.d.ts';

// assets
export { default as placeholder } from './assets/images/placeholder.js';

// tailwind
export { default as twExtendConfig, twMerge, twJoin } from './tailwind/tailwind-merge.js';

// utils
export { isHover, isTouch, random, uuid } from './components/utils/index.js';

export * as audio from './components/utils/audio.js';
export * as scroll from './components/utils/scroll.js';
