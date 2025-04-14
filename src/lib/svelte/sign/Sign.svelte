<script lang="ts">
  import { twMerge } from '../../tailwind/tailwind-merge.js';
  import type { SignAttributes as Props } from './index.d.ts';

  const { icon, class: className, link, small, auto, dark, light, ...rest }: Props = $props();
</script>

<div
  class={twMerge(
    'absolute left-1 top-1 z-10',
    small ? 'size-5' : 'size-7',
    (auto || light || dark) && 'rounded-full p-1',
    light && 'bg-white/20',
    dark && 'bg-black/20',
    auto && 'bg-black/20 dark:bg-white/20',
    link ? 'text-blue-600 dark:text-blue-400' : 'text-white',
    'opacity-70',
    'group-hover:mt-2 group-hover:animate-bounce group-hover:opacity-100',
    className
  )}
  {...rest}>
  <span class={[icon, 'size-full']}></span>
</div>
