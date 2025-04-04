<script lang="ts">
  import { twMerge } from '../../../tailwind/tailwind-merge.js';
  import type { Custom, Status } from '../index.d.ts';

  import type { SvelteHTMLElements } from 'svelte/elements';
  type Props = Omit<SvelteHTMLElements['div'], 'class' | 'title'> & {
    custom: Custom;
    title?: string;
    subtitle?: string;
    description?: string;
    fullscreen: boolean;
    status?: Status;
  };
  const { custom, title, subtitle, description, fullscreen, status }: Props = $props();
</script>

<div class={twMerge('scoped', 'relative z-30', fullscreen && 'fullscreen', custom.footer)}>
  <div
    class={twMerge(
      'min-h-24 pt-1 sm:min-h-12',
      'grid grid-cols-2 items-center gap-2',
      'text-white/50 hover:text-white',
      'cursor-default',
      custom.inner?.cuption
    )}>
    {#if title}
      <div class={twMerge('font-semibold', custom.inner?.title)}>
        {@html title}
      </div>
    {/if}
    {#if status}
      <div
        class={twMerge('whitespace-nowrap font-mono', title && 'text-right', custom.inner?.status)}>
        {status.activeItem + 1} <sup>[{status.countItems}]</sup>
      </div>
    {/if}
    {#if subtitle}
      <span class={twMerge('col-span-2', custom.inner?.subtitle)}>
        {@html subtitle}
      </span>
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
      padding-inline: 1rem;
    }
  }
</style>
