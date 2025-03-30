<script lang="ts">
  import type { Writable } from 'svelte/store';
  import Button from './Button.svelte';
  import type { Options } from '..';

  export let options: Partial<Options>;

  export let countItemsStore: Writable<number>;
  export let activeItemStore: Writable<number>;

  export function previous(): void {
    if ($activeItemStore === 0) {
      if (options.behaviour === 'loop') {
        activeItemStore.set($countItemsStore - 1);
      }
    } else {
      activeItemStore.set($activeItemStore - 1);
    }
  }

  export function next(): void {
    if ($activeItemStore === $countItemsStore - 1) {
      if (options.behaviour === 'loop') {
        activeItemStore.set(0);
      }
    } else {
      activeItemStore.set($activeItemStore + 1);
    }
  }

  function handleKey(event: KeyboardEvent): void {
    if (options.enableKeyboard) {
      switch (event.key) {
        case 'ArrowLeft': {
          previous();
          break;
        }
        case 'ArrowRight': {
          next();
          break;
        }
      }
    }
  }
</script>

<svelte:window on:keydown={handleKey} />

{#if $countItemsStore > 1}
  <Button
    on:click={previous}
    {options}
    activeItem={$activeItemStore}
    countItems={$countItemsStore} />
{/if}

<slot />

{#if $countItemsStore > 1}
  <Button
    on:click={next}
    {options}
    next
    activeItem={$activeItemStore}
    countItems={$countItemsStore} />
{/if}
