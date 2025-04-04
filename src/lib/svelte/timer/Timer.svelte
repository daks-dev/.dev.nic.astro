<script
  lang="ts"
  module>
  let time = $state(0);
</script>

<script lang="ts">
  import { twMerge } from '../../tailwind/tailwind-merge.js';

  import type { HTMLTimeAttributes } from 'svelte/elements';
  type Props = Omit<HTMLTimeAttributes, 'class'> & {
    class?: ClassValue;
  };
  const {
    class: className,
    datetime = new Date().toLocaleDateString('ru'),
    ...rest
  }: Props = $props();

  let timer = $derived({
    hour: Math.trunc(time / 3600),
    min: Math.trunc(time / 60)
      .toString()
      .padStart(2, '0'),
    sec: (time % 60).toString().padStart(2, '0')
  });

  $effect(() => {
    const interval = setInterval(() => {
      time += 1;
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  });
</script>

<time
  class={twMerge(className)}
  {datetime}
  {...rest}>
  {timer.hour ? `${timer.hour}:` : ''}{timer.min}:{timer.sec}
</time>
