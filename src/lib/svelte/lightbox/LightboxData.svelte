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
    show = Infinity,
    class: className,
    custom = {},
    options = {},
    title: __title,
    description: __description,
    img: __img,
    alt = '',
    figcaption,
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

  const img = Object.assign(
    {
      rel: 'thumbnailUrl',
      itemprop: 'thumbnailUrl'
    },
    __img
  );

  const sign = __sign
    ? typeof __sign === 'string'
      ? {
          custom: __sign,
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
      {#if idx < show}
        <LightboxThumbnail class={[sign && 'group relative', 'outline-none', custom.thumb]}>
          {#if sign}
            <Sign
              class={custom.inner?.sign}
              {...sign} />
          {/if}
          <Figure
            src={thumb}
            {img}
            caption={figcaption ? caption : undefined}
            class={['relative flex flex-col', centered && 'items-center', custom.item]}
            custom={{
              img: [
                adaptive && 'h-auto w-full max-w-full object-contain',
                rounded && 'rounded',
                shadow && [
                  scale ? 'shadow-sm hover:shadow-md' : 'shadow-md hover:shadow-sm',
                  'shadow-black'
                ],
                scale && 'hover:scale-105',
                grayscale && 'grayscale hover:grayscale-0',
                invert && 'invert hover:invert-0',
                (shadow || scale || grayscale || invert) &&
                  'motion-safe:ready:transition duration-300 ease-in-out',
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
        </LightboxThumbnail>
      {/if}
      <link
        rel="image"
        href={modal.src} />
    {/each}
  {/snippet}
  {#each data as { modal: { src, attributes }, caption: { title, description } }}
    <LightboxModal
      title={title ?? __title}
      description={description ?? __description}>
      <Img
        class="bg--loading bg-[size:20%] bg-center bg-no-repeat"
        {src}
        {...attributes}
        decoding="async"
        loading="lazy" />
    </LightboxModal>
  {/each}
</LightboxList>
