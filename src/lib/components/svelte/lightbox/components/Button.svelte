<script lang="ts">
  import { twMerge } from '../../../../tailwind/tailwind-merge';
  import type { Options } from '..';

  export let options: Partial<Options>;

  export let next: boolean = false;

  export let countItems: number;
  export let activeItem: number;

  $: disabled =
    options.behaviour !== 'loop' && (next ? activeItem === countItems - 1 : activeItem === 0);
</script>

<button
  on:click|preventDefault|stopPropagation
  {disabled}
  class={twMerge(
    'absolute inset-y-0 z-20',
    'hidden items-center',
    'w-1/5 md:w-1/6 xl:w-1/12',
    'text-gray-200/50 hover:text-white disabled:text-black',
    'hover:bg-black/50 active:bg-transparent lg:bg-black/25',
    'hover:cursor-pointer',
    next ? 'right-0 justify-end' : 'left-0 justify-start'
  )}
  class:xs:flex={!disabled || options.behaviour !== 'hide'}
  aria-label={next ? 'next' : 'prev'}>
  <svg
    class={twMerge(
      'disabled',
      'w-16 p-2 hover:scale-125',
      'transition-all duration-300 ease-in',
      next ? 'mr-2' : 'rotate-180'
    )}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentcolor">
    <path
      d="M7.38 21.01c.49.49 1.28.49 1.77 0l8.31-8.31a.996.996 0 0 0 0-1.41L9.15 2.98c-.49-.49-1.28-.49-1.77 0s-.49 1.28 0 1.77L14.62 12l-7.25 7.25c-.48.48-.48 1.28.01 1.76z" />
  </svg>
</button>
