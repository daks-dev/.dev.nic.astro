<script lang="ts">
  import { getContext } from 'svelte';
  import { twMerge } from '../../tailwind/tailwind-merge.js';

  import type { SvelteHTMLElements } from 'svelte/elements';
  type Props = Omit<SvelteHTMLElements['div'], 'class'> & {
    class?: ClassValue;
    idx?: number;
  };
  const {
    children,
    class: className,
    idx = getContext<() => number>('counterThumbnails')(),
    ...rest
  }: Props = $props();

  const openImage = getContext<(x: number) => void>('openImage');
</script>

<div
  onclick={() => openImage(idx)}
  class={twMerge('lightbox-thumbnail cursor-zoom-in outline-none', className)}
  role="button"
  tabindex="-1"
  {...rest}>
  {@render children?.()}
</div>
