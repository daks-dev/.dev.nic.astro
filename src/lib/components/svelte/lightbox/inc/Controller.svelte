<script lang="ts">
  import { swipe, wheel } from '../../../utils/index.js';
  import Button from './Button.svelte';
  import type { Snippet } from 'svelte';
  import type { Options } from '../index.d.ts';

  type Props = {
    children: Snippet;
    activeItem: number;
    countItems: number;
    options: Options;
  };
  let { children, activeItem = $bindable(), countItems = $bindable(), options }: Props = $props();

  export function previous(): void {
    if (activeItem === 0) {
      if (options.behaviour === 'loop') {
        activeItem = countItems - 1;
      }
    } else {
      activeItem--;
    }
  }

  export function next(): void {
    if (activeItem === countItems - 1) {
      if (options.behaviour === 'loop') {
        activeItem = 0;
      }
    } else {
      activeItem++;
    }
  }

  const actionSwipe = options.swipe
    ? function (delta: { x: number; h: boolean; v: boolean }): void {
        if (options.swipe && delta.h && !delta.v) delta.x > 0 ? previous() : next();
      }
    : undefined;

  const actionWheel = options.wheel
    ? function (delta: { y: number }): void {
        if (options.wheel) {
          delta.y > 0 && next();
          delta.y < 0 && previous();
        }
      }
    : undefined;

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

<svelte:window
  use:swipe={actionSwipe}
  use:wheel={actionWheel}
  onkeydown={handleKey} />

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
