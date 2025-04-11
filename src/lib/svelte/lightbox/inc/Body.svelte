<script lang="ts">
  import { twMerge } from '../../../tailwind/tailwind-merge.js';
  import { blur } from 'svelte/transition';
  import type { Snippet } from 'svelte';
  import type { Options, Status } from '../index.d.ts';

  type Props = {
    children?: Snippet<[]>;
    fullscreen: boolean;
    scrollable: boolean;
    options: Options;
    status?: Status;
  };

  const { children, fullscreen, scrollable, options, status }: Props = $props();

  const delay = options.duration && Math.round(options.duration / 4);
</script>

<div
  in:blur={{ duration: options.duration, delay }}
  out:blur={{ duration: delay }}
  class={twMerge(
    'scoped',
    'relative z-10 flex overflow-hidden',
    fullscreen && 'fullscreen',
    scrollable && 'scrollable overflow-y-auto',
    options.swipe && status && status.countItems > 1 ? 'cursor-ew-resize' : 'cursor-default'
  )}>
  {@render children?.()}
</div>

<style scoped>
  :where(.scoped) {
    :global(> *) {
      height: inherit;
      max-height: inherit;
    }
    :global(> img) {
      pointer-events: none;
      margin-inline: auto;
      object-fit: contain;
    }
    &.fullscreen {
      height: inherit;
      max-height: inherit;
      width: inherit;
      align-items: center;
      justify-content: center;
      :global(> img) {
        flex-grow: 1;
      }
    }
    &.scrollable {
      :global(> :not(img)) {
        height: 100%;
        max-height: 100%;
      }
    }
  }
</style>
