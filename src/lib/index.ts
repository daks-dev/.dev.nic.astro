// app
export type { AppConfig } from './app/index.d.ts';

// assets
export { default as placeholder } from './assets/images/placeholder.js';

// tailwind
export { default as twExtendConfig, twMerge, twJoin } from './tailwind/tailwind-merge.js';

// utils
export { isHover, isTouch, random, uuid } from './utils/index.js';

export { default as Animate } from './utils/Animate.js';
export { default as Swipe, swipe } from './utils/Swipe.js';
export { default as Wheel, wheel } from './utils/Wheel.js';

export * as audio from './utils/audio.js';
export { default as outside } from './utils/outside.js';
export * as scroll from './utils/scroll.js';

export { default as lazyload } from './utils/lazyload';
export type { LazyLoad } from './utils/lazyload';
