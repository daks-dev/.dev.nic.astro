<script lang="ts">
  import Carousel from './Carousel.svelte';
  import Sign from '../sign/Sign.svelte';
  import type { CarouselDataAttributes as Props } from './index.d.ts';

  const {
    data,
    class: className,
    custom = {},
    sign: __sign,
    grayscale = false,
    invert = false,
    checked = false,
    ...rest
  }: Props = $props();

  custom.item = [custom.item, (grayscale || invert) && 'group'];
  (custom.inner ??= {}).img = [
    custom.inner?.img,
    grayscale && 'grayscale group-hover:grayscale-0',
    invert && 'invert group-hover:invert-0'
  ];

  const sign = __sign
    ? typeof __sign === 'string'
      ? {
          custom: __sign,
          dark: true
        }
      : __sign
    : undefined;

  let count = $state(0);
  const loaded = () => ++count;
</script>

<Carousel
  {data}
  class={[sign && 'group', className]}
  {custom}
  {loaded}
  {...rest}>
  {#snippet after()}
    {#if sign}
      <Sign
        class={custom.inner?.sign}
        {...sign} />
    {/if}
  {/snippet}
  {#snippet check()}
    {#if checked}
      <small
        class={[
          'absolute bottom-2 left-2',
          'font-semibold text-black/50',
          typeof checked === 'string' && checked
        ]}>
        {count}
        <sup>{data?.length}</sup>
      </small>
    {/if}
  {/snippet}
</Carousel>
