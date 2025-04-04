<script lang="ts">
  import Figure from '../figure/Figure.svelte';
  import Sign from '../sign/Sign.svelte';
  import Img from '../img/Img.svelte';
  import LightboxList from './LightboxList.svelte';
  import LightboxModal from './LightboxModal.svelte';
  import LightboxThumbnail from './LightboxThumbnail.svelte';
  import type { LightboxDataAttributes as Props } from './index.d.ts';

  const {
    data,
    class: className,
    custom = {},
    options = {},
    title: __title,
    subtitle: __subtitle,
    description: __description,
    img,
    alt = '',
    sign: __sign,
    grid,
    adaptive,
    centered,
    rounded,
    shadow,
    scale,
    grayscale,
    invert,
    eager,
    lazyload,
    loader = lazyload ? () => document?.lazyload?.update() : undefined,
    ...rest
  }: Props = $props();

  const sign = __sign
    ? typeof __sign === 'string'
      ? {
          icon: __sign,
          dark: true
        }
      : __sign
    : undefined;

  options.behaviour ??= 'loop';
</script>

<LightboxList
  class={[
    grid ? 'grid grid-cols-none ' : 'flex flex-wrap',
    centered && 'justify-center',
    className
  ]}
  {custom}
  {options}
  {loader}
  {...rest}>
  {#snippet thumbnail()}
    {#each data as { thumb, caption, modal }, idx}
      <LightboxThumbnail class={[sign && 'group relative', 'outline-none']}>
        {#if sign}
          <Sign
            class={custom.inner?.sign}
            {...sign} />
        {/if}
        <Figure
          src={thumb.src}
          {img}
          {caption}
          class={['relative flex flex-col', centered && 'items-center', custom.item]}
          custom={{
            img: [
              adaptive && 'h-auto w-full max-w-full object-contain',
              rounded && 'rounded',
              shadow && 'shadow-md hover:shadow-lg',
              scale && 'hover:scale-105',
              grayscale && 'grayscale hover:grayscale-0',
              invert && 'invert hover:invert-0',
              (shadow || scale || grayscale || invert) && 'transition duration-300 ease-in-out',
              custom.inner?.img
            ],
            caption: [
              'flex flex-col pt-2',
              centered && 'text-center',
              (shadow || scale) && (adaptive ? 'mt-4' : 'mt-2'),
              custom.inner?.caption
            ]
          }}
          alt={`${alt} [${idx}]`.trim()}
          {eager}
          {lazyload} />
        <link
          rel="image"
          href={modal.src} />
        <link
          rel="thumbnailUrl"
          href={thumb.src} />
      </LightboxThumbnail>
    {/each}
  {/snippet}
  {#each data as { modal: { src, attributes }, caption }}
    <LightboxModal {...caption}>
      <Img
        class="bg--loading bg-10% bg-center bg-no-repeat"
        {src}
        {...attributes} />
    </LightboxModal>
  {/each}
</LightboxList>
