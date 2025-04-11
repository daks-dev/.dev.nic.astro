<script lang="ts">
  import { twMerge } from '../../../tailwind/tailwind-merge.js';
  import type { Custom, Status } from '../index.d.ts';

  type Props = {
    custom: Custom;
    title?: string;
    description?: string;
    fullscreen: boolean;
    status?: Status;
  };

  const { custom, title, description, fullscreen, status, ...rest }: Props = $props();

  const list = status && status.countItems > 1;
</script>

<div class={twMerge('scoped', 'relative z-30', fullscreen && 'fullscreen', custom.footer)}>
  <div
    class={twMerge(
      'min-h-24 px-4 pt-2 sm:min-h-12',
      'grid grid-cols-2 items-center',
      'text-sm leading-snug text-white/50 hover:text-white',
      'cursor-default',
      custom.inner?.cuption
    )}>
    {#if title}
      <div class={twMerge('font-semibold', !list && 'col-span-2', custom.inner?.title)}>
        {@html title}
      </div>
    {/if}
    {#if list}
      <div
        class={twMerge('whitespace-nowrap font-mono', title && 'text-right', custom.inner?.status)}>
        {status.activeItem + 1} <sup>[{status.countItems}]</sup>
      </div>
    {/if}
    {#if description}
      <small class={twMerge('col-span-2', custom.inner?.description)}>
        {@html description}
      </small>
    {/if}
  </div>
</div>

<style scoped>
  :where(.scoped) {
    &.fullscreen {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
    }
  }
</style>
