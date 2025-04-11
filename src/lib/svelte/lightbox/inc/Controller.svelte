<script lang="ts">
  import Button from './Button.svelte';
  import type { Snippet } from 'svelte';
  import type { Options } from '../index.d.ts';

  type Props = {
    children: Snippet<[]>;
    next: () => void;
    previous: () => void;
    activeItem: number;
    countItems: number;
    options: Options;
  };

  const { children, next, previous, activeItem, countItems, options }: Props = $props();

  function handleKey(e: KeyboardEvent): void {
    if (options.enableKeyboard) {
      switch (e.key) {
        case 'ArrowLeft':
        case 'ArrowRight':
          e.preventDefault();
          e.stopPropagation();
        case 'ArrowLeft':
          previous();
          break;
        case 'ArrowRight':
          next();
      }
    }
  }
</script>

<svelte:window onkeydown={handleKey} />

{#if countItems > 1}
  <Button
    {previous}
    {options}
    {activeItem}
    {countItems} />
{/if}

{@render children?.()}

{#if countItems > 1}
  <Button
    {next}
    {options}
    {activeItem}
    {countItems} />
{/if}
