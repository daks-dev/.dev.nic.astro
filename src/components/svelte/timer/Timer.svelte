<script lang="ts">
  import { onMount } from 'nanostores';
  import { persistentAtom } from '@nanostores/persistent';
  import { twMerge } from '@daks.dev/astro.sdk';
  import type { HTMLTimeAttributes } from 'svelte/elements';

  type Props = Omit<HTMLTimeAttributes, 'class'> & {
    class?: ClassValue;
  };

  const {
    class: className,
    datetime = new Date().toLocaleDateString('ru'),
    ...rest
  }: Props = $props();

  const timer = persistentAtom<number>('app::timer', 0, {
    encode: (val) => (val ? `${val}` : '0'),
    decode: (val) => (val ? parseInt(val) : 0)
  });

  onMount(timer, () => {
    const interval = setInterval(() => {
      timer.set(timer.get() + 1);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  });

  const format = (s: number) => {
    if (isNaN(s)) return '--:--';
    const d = Math.floor(s / (3600 * 24));
    const h = Math.floor((s % (3600 * 24)) / 3600);
    const m = Math.floor((s % 3600) / 60);
    s = Math.floor(s % 60);
    return (
      (d ? `${d.toString()} - ` : '') +
      (h ? `${h.toString().padStart(2, '0')}:` : '') +
      `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
    );
  };
</script>

<time
  class={twMerge(className)}
  {datetime}
  {...rest}>
  {format($timer)}
</time>
