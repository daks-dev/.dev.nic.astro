<script lang="ts">
  import Icon from '../icon/Icon.svelte';
  import type { SignAttributes } from './index.d.ts';

  /**
   * 'mdi:link-variant'
   * 'ic:round-zoom-out-map'
   */

  const {
    class: className,
    link = false,
    small = false,
    auto = false,
    dark = false,
    light = false,
    ...rest
  }: SignAttributes = $props();
</script>

<Icon
  class={[
    'absolute left-1 top-1 z-10',
    small ? 'h-5 w-5' : 'h-7 w-7',
    (auto || light || dark) && 'rounded-full p-1 shadow-md',
    light && 'bg-white/20',
    dark && 'bg-black/20',
    auto && 'bg-black/20 dark:bg-white/20',
    link ? 'text-sky-600 dark:text-sky-400' : 'text-white',
    'opacity-70',
    'group-hover:mt-2 group-hover:animate-bounce group-hover:opacity-100',
    className
  ]}
  {...rest} />
