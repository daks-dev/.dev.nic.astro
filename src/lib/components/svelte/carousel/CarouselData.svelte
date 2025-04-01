<script lang="ts">
  import { twMerge } from '../../../tailwind/tailwind-merge.js';
  import Carousel from './Carousel.svelte';
  import type { CarouselAttributes } from './index.d.ts';

  import type { SvelteHTMLElements } from 'svelte/elements';
  type Props = Omit<SvelteHTMLElements['div'], 'class'> &
    Pick<SvelteHTMLElements['a'], 'href' | 'target'> &
    Omit<CarouselAttributes, 'loaded'> & {
      grayscale?: boolean;
      invert?: boolean;
      checked?: boolean | string;
    };
  const {
    data,
    custom = {},
    grayscale = false,
    invert = false,
    checked = false,
    ...rest
  }: Props = $props();

  custom.item = [custom.item, (grayscale || invert) && 'group'];
  (custom.inner ??= {}).image = [
    custom.inner?.image,
    grayscale && 'grayscale group-hover:grayscale-0',
    invert && 'invert group-hover:invert-0'
  ];

  let count = $state(0);
  const loaded = () => ++count;
</script>

<Carousel
  {data}
  {custom}
  {loaded}
  {...rest}>
  {#snippet check()}
    {#if checked}
      <small
        class={twMerge(
          'absolute bottom-2 left-2',
          'font-semibold text-black/50',
          typeof checked === 'string' && checked
        )}>
        {count}
        <sup>{data?.length}</sup>
      </small>
    {/if}
  {/snippet}
</Carousel>
