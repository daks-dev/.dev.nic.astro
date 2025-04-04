<script lang="ts">
  import { twMerge } from '../../../tailwind/tailwind-merge.js';

  let className: ClassValue;
  export { className as class };

  export let auto: boolean;
</script>

<button
  on:click
  class={twMerge('absolute bottom-1 left-1/2 z-10 -translate-x-1/2 p-2', 'rounded-full', className)}
  type="button"
  tabindex="-1"
  aria-label={auto ? 'pouse' : 'play'}>
  <svg
    class="disabled w-12"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor">
    {#if auto}
      <path
        d="M8 19c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2s-2 .9-2 2v10c0 1.1.9 2 2 2zm6-12v10c0 1.1.9 2 2 2s2-.9 2-2V7c0-1.1-.9-2-2-2s-2 .9-2 2z" />
    {:else}
      <path
        d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18a1 1 0 0 0 0-1.69L9.54 5.98A.998.998 0 0 0 8 6.82z" />
    {/if}
  </svg>
</button>
