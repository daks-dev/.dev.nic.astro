<script lang="ts">
  import { getContext } from 'svelte';
  import type { Writable } from 'svelte/store';

  export let title: string | undefined = undefined;
  export let subtitle: string | undefined = undefined;
  export let description: string | undefined = undefined;

  const activeItemStore: Writable<number> = getContext('activeItem');

  const id = getContext<(x: Record<string, string | undefined>) => number>('counterItems')({
    title,
    subtitle,
    description
  });
</script>

{#if $activeItemStore === id}
  <slot {...$$restProps} />
{/if}
