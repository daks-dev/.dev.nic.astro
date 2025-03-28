<script lang="ts">
  import { twMerge } from '@styles/tailwind/tailwind-merge';
  import { meta } from '@app/state';

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
    hour: Math.trunc(meta.sessionTime / 3600),
    min: Math.trunc(meta.sessionTime / 60)
      .toString()
      .padStart(2, '0'),
    sec: (meta.sessionTime % 60).toString().padStart(2, '0')
  });

  $effect(() => {
    const interval = setInterval(() => {
      meta.sessionTime += 1;
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
