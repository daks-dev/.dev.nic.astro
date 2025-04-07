<script lang="ts">
  import { getContext } from 'svelte';
  import type { Snippet } from 'svelte';

  type Props = {
    children?: Snippet;
    title?: string;
    description?: string;
  };
  const { children, title, description }: Props = $props();

  let activeItem = $derived(getContext<() => number>('activeItem')());

  const idx = getContext<(x: Record<string, string | undefined>) => number>('counterItems')({
    title,
    description
  });
</script>

{#if activeItem === idx}
  {@render children?.()}
{/if}
