<script lang="ts">
  import { getContext } from 'svelte';
  import { twMerge } from '../../../tailwind/tailwind-merge.js';
  import type { Custom } from '.';

  let className: ClassValue = undefined;
  export { className as class };

  export let custom: Partial<Custom> = {};

  export let tag = 'div';

  export let id = getContext<() => number>('counterThumbnails')();

  const openImage = getContext<(x: number) => void>('openImage');
</script>

<svelte:element
  this={tag}
  on:click={() => openImage(id)}
  role="button"
  tabindex="-1"
  class={twMerge('lightbox-thumbnail cursor-zoom-in', className)}
  {...$$restProps}>
  <slot {custom} />
</svelte:element>
