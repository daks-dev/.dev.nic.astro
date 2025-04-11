<script lang="ts">
  import { twMerge } from '../../../tailwind/tailwind-merge.js';
  import type { Custom, Options } from '../index.d.ts';

  type Props = {
    close: () => void;
    toogleFullscreen: () => void;
    custom: Custom;
    options: Options;
    fullscreen: boolean;
  };

  const { close, toogleFullscreen, custom, options, fullscreen }: Props = $props();
</script>

<div
  class={twMerge(
    'scoped',
    'relative z-30 h-12',
    'flex items-center justify-end gap-2',
    'text-4xl text-gray-200/50',
    'cursor-default',
    fullscreen && 'fullscreen',
    custom.header
  )}>
  {#if options.buttonFullscreen}
    <button
      onclick={toogleFullscreen}
      class={twMerge(
        'py-1.5',
        'transition-all duration-200',
        'ease-in hover:scale-125 hover:cursor-pointer',
        'hover:text-white',
        fullscreen && ['shadow-lg', !options.buttonClose && 'pr-2']
      )}
      aria-label="full screen">
      <svg
        class="disabled w-9"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor">
        {#if fullscreen}
          <path
            d="M6 16h2v2c0 .55.45 1 1 1s1-.45 1-1v-3c0-.55-.45-1-1-1H6c-.55 0-1 .45-1 1s.45 1 1 1zm2-8H6c-.55 0-1 .45-1 1s.45 1 1 1h3c.55 0 1-.45 1-1V6c0-.55-.45-1-1-1s-1 .45-1 1v2zm7 11c.55 0 1-.45 1-1v-2h2c.55 0 1-.45 1-1s-.45-1-1-1h-3c-.55 0-1 .45-1 1v3c0 .55.45 1 1 1zm1-11V6c0-.55-.45-1-1-1s-1 .45-1 1v3c0 .55.45 1 1 1h3c.55 0 1-.45 1-1s-.45-1-1-1h-2z" />
        {:else}
          <path
            d="M6 14c-.55 0-1 .45-1 1v3c0 .55.45 1 1 1h3c.55 0 1-.45 1-1s-.45-1-1-1H7v-2c0-.55-.45-1-1-1zm0-4c.55 0 1-.45 1-1V7h2c.55 0 1-.45 1-1s-.45-1-1-1H6c-.55 0-1 .45-1 1v3c0 .55.45 1 1 1zm11 7h-2c-.55 0-1 .45-1 1s.45 1 1 1h3c.55 0 1-.45 1-1v-3c0-.55-.45-1-1-1s-1 .45-1 1v2zM14 6c0 .55.45 1 1 1h2v2c0 .55.45 1 1 1s1-.45 1-1V6c0-.55-.45-1-1-1h-3c-.55 0-1 .45-1 1z" />
        {/if}
      </svg>
    </button>
  {/if}
  {#if options.buttonClose}
    <button
      onclick={close}
      class={twMerge(
        'py-1.5',
        'transition-all duration-200 ease-in',
        'hover:scale-125 hover:cursor-pointer hover:text-white',
        fullscreen && 'pr-2 shadow-lg'
      )}
      aria-label="close">
      <svg
        class="disabled w-9"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor">
        <path
          d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59L7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12L5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z" />
      </svg>
    </button>
  {/if}
</div>

<style scoped>
  :where(.scoped) {
    &.fullscreen {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
    }
  }
</style>
