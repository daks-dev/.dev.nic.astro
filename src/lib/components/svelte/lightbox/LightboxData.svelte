<script lang="ts">
  import Figure from '../figure/Figure.svelte';
  import Sign from '../sign/Sign.svelte';
  import LightboxList from './LightboxList.svelte';
  import LightboxModal from './LightboxModal.svelte';
  import LightboxThumbnail from './LightboxThumbnail.svelte';
  import type { SignAttributes } from '../sign/index.d.ts';
  import type { LightboxAttributes } from './index.d.ts';

  type Props = LightboxAttributes & {
    data: {
      thumb: ImageResult;
      modal: ImageResult;
      caption: Record<string, string>;
    }[];
    alt?: string;
    sign?: string | SignAttributes;
    grid?: boolean;
    adaptive?: boolean;
    centered?: boolean;
    rounded?: boolean;
    shadow?: boolean;
    scale?: boolean;
    grayscale?: boolean;
    invert?: boolean;
    native?: boolean;
  };
  const {
    data,
    class: className,
    custom = {},
    options = {},
    title: __title,
    subtitle: __subtitle,
    description: __description,
    alt = '',
    sign: __sign,
    grid = false,
    adaptive = false,
    centered = false,
    rounded = false,
    shadow = false,
    scale = false,
    grayscale = false,
    invert = false,
    native = false,
    loader = native ? undefined : () => document?.lazyload.update(),
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
    {#each data as { thumb: image, caption, modal }, idx}
      <LightboxThumbnail class={['outline-none']}>
        {#if sign}
          <Sign
            class={custom.inner?.sign}
            {...sign} />
        {/if}
        <Figure
          {image}
          {caption}
          class={['relative flex flex-col', centered && 'items-center', custom.item]}
          custom={{
            image: [
              adaptive && 'h-auto w-full max-w-full object-contain',
              rounded && 'rounded',
              shadow && 'shadow-md hover:shadow-lg',
              scale && 'hover:scale-105',
              grayscale && 'grayscale hover:grayscale-0',
              invert && 'invert hover:invert-0',
              (shadow || scale || grayscale || invert) && 'transition duration-300 ease-in-out',
              custom.inner?.image
            ],
            caption: [
              'flex flex-col pt-2',
              centered && 'text-center',
              (shadow || scale) && (adaptive ? 'mt-4' : 'mt-2'),
              custom.inner?.caption
            ]
          }}
          alt={`${alt} [${idx}]`.trim()}
          {native} />
        <link
          rel="image"
          href={modal.src} />
        <link
          rel="thumbnailUrl"
          href={image.src} />
      </LightboxThumbnail>
    {/each}
  {/snippet}
  {#each data as { modal: { src, attributes }, caption }}
    <LightboxModal {...caption}>
      <img
        class="bg--loading bg-10% bg-center bg-no-repeat"
        {src}
        {...attributes}
        alt=""
        decoding="async"
        loading="lazy" />
    </LightboxModal>
  {/each}
</LightboxList>
