<script lang="ts">
  import { createEventDispatcher, onMount, onDestroy } from 'svelte';
  import { fade } from 'svelte/transition';
  import { swipe, wheel } from '../../../utils';
  import { twMerge } from '../../../../tailwind/tailwind-merge';
  import type { Custom, Options } from '..';

  const dispatch = createEventDispatcher();

  export let custom: Partial<Custom>;
  export let fullscreen: boolean;
  export let options: Partial<Options>;

  function handleKey(event: KeyboardEvent): void {
    if (options.enableKeyboard)
      switch (event.key) {
        case 'Escape': {
          dispatch('close');
          break;
        }
      }
  }

  const actionSwipe = options.swipe
    ? function (delta: { x: number; h: boolean; v: boolean }): void {
        if (options.swipe && delta.h && !delta.v) dispatch(delta.x > 0 ? 'previous' : 'next');
      }
    : undefined;

  const actionWheel = options.wheel
    ? function (delta: { y: number }): void {
        if (options.wheel) {
          delta.y > 0 && dispatch('next');
          delta.y < 0 && dispatch('previous');
        }
      }
    : undefined;

  const handleClick = options.clickableClose
    ? function (): void {
        dispatch('close');
      }
    : undefined;

  let node: HTMLElement;
  let anchor: HTMLElement;
  let touch: boolean;
  onMount(() => {
    anchor = document.createElement('div');
    document.body.appendChild(anchor);
    anchor.appendChild(node);
    touch =
      window.matchMedia('(pointer: coarse)').matches ||
      navigator.maxTouchPoints > 0 ||
      'ontouchstart' in document.documentElement;
  });
  onDestroy(() => typeof document !== 'undefined' && document.body.removeChild(anchor));
</script>

<svelte:window on:keydown={handleKey} />

<div
  bind:this={node}
  in:fade={{ duration: options.duration }}
  out:fade={{ duration: options.duration && options.duration / 2 }}
  use:swipe={actionSwipe}
  use:wheel={actionWheel}
  on:click={handleClick}
  on:keypress
  class={twMerge(
    'fixed left-0 top-0 z-[999] h-screen max-h-screen w-full max-w-full overflow-hidden',
    'flex items-center justify-center',
    'not-prose text-base',
    'bg-black/90',
    'linecap-round linejoin-round vector-non-scaling-stroke',
    'clear-pseudo select-none',
    'overflow-y-offset',
    custom.overlay
  )}
  class:hover:cursor-zoom-out={options.clickableClose}
  role="button"
  tabindex="-1">
  <div
    on:click|preventDefault|stopPropagation={() => false}
    on:keypress
    class={twMerge('max-h-inherit flex flex-col', fullscreen && 'h-inherit w-inherit')}
    role="button"
    tabindex="-1">
    <slot />
  </div>
  <div
    class="
      absolute left-4 top-4 flex
      items-center gap-x-2 text-gray-500">
    {#if touch}
      <svg
        class="w-5"
        viewBox="0 0 24 24"
        fill="currentcolor">
        <path
          d="M8.79 9.24V5.5a2.5 2.5 0 0 1 5 0v3.74c1.21-.81 2-2.18 2-3.74c0-2.49-2.01-4.5-4.5-4.5s-4.5 2.01-4.5 4.5c0 1.56.79 2.93 2 3.74zm5.5 2.47c-.28-.14-.58-.21-.89-.21h-.61v-6c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v10.74l-3.44-.72c-.37-.08-.76.04-1.03.31c-.43.44-.43 1.14 0 1.58l4.01 4.01c.38.37.89.58 1.42.58h6.1c1 0 1.84-.73 1.98-1.72l.63-4.47c.12-.85-.32-1.69-1.09-2.07l-4.08-2.03z" />
      </svg>
    {:else}
      <svg
        class="w-6"
        viewBox="0 0 24 24"
        fill="currentcolor">
        <path
          d="M21 4H3c-1.1 0-2 .9-2 2v13c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 15H3V6h18v13zM9 8h2v2H9V8zM5 8h2v2H5V8zm3 8h8v1H8v-1zm5-8h2v2h-2V8zm-4 4h2v2H9v-2zm-4 0h2v2H5v-2zm8 0h2v2h-2v-2zm4-4h2v2h-2V8zm0 4h2v2h-2v-2z" />
      </svg>
      <svg
        class="w-5"
        viewBox="0 0 24 24"
        fill="currentcolor">
        <path
          d="M20 9c-.04-4.39-3.6-7.93-8-7.93S4.04 4.61 4 9v6c0 4.42 3.58 8 8 8s8-3.58 8-8V9zm-2 0h-5V3.16c2.81.47 4.96 2.9 5 5.84zm-7-5.84V9H6a6.005 6.005 0 0 1 5-5.84zM18 15c0 3.31-2.69 6-6 6s-6-2.69-6-6v-4h12v4z" />
      </svg>
    {/if}
  </div>
</div>
