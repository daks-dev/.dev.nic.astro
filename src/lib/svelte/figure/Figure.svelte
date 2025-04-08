<script lang="ts">
  import { twMerge } from '../../tailwind/tailwind-merge.js';
  import Img from '../img/Img.svelte';
  import type { FigureAttriibutes as Props } from './index.d.ts';

  const {
    children,
    src,
    img,
    caption: __caption = {},
    class: className,
    alt = img?.alt ?? '',
    custom = {},
    eager,
    lazyload,
    loaded,
    before,
    after,
    ...rest
  }: Props = $props();

  const attributes = {
    ...img,
    src,
    alt,
    loaded
  };

  const caption = Object.entries(__caption);
</script>

<figure
  class={twMerge('relative flex flex-col', className)}
  {...rest}>
  {@render before?.()}
  <Img
    class={custom.img}
    {...attributes} />
  {#if children}
    {@render children()}
  {:else if caption.length}
    <figcaption class={twMerge('flex flex-col', custom.caption)}>
      {#each caption as [key, val]}
        {#if val}
          {#if key === 'title'}
            <span class={twMerge('order-first font-medium', custom[key])}>{@html val}</span>
          {:else if key === 'description'}
            <small class={twMerge('order-last', custom[key])}>{@html val}</small>
          {:else}
            <span class={twMerge(custom[key])}>{@html val}</span>
          {/if}
        {/if}
      {/each}
    </figcaption>
  {/if}
  {@render after?.()}
</figure>
