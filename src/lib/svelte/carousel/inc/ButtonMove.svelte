<script lang="ts">
  import { twMerge } from '../../../tailwind/tailwind-merge.js';

  let className: ClassValue;
  export { className as class };

  export let disabled: undefined | boolean;
  export let flip = false;
</script>

<button
  on:click
  class={twMerge(
    'absolute inset-y-0 hidden w-20 items-center justify-center lg:flex',
    flip ? 'left-0 -scale-x-100 pl-4' : 'right-0 pl-4',
    'text-5xl',
    className
  )}
  {disabled}
  type="button"
  tabindex="-1"
  aria-label={flip ? 'next' : 'prev'}>
  <svg
    class="disabled w-12"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor">
    <path
      d="M7.38 21.01c.49.49 1.28.49 1.77 0l8.31-8.31a.996.996 0 0 0 0-1.41L9.15 2.98c-.49-.49-1.28-.49-1.77 0s-.49 1.28 0 1.77L14.62 12l-7.25 7.25c-.48.48-.48 1.28.01 1.76z" />
  </svg>
</button>
