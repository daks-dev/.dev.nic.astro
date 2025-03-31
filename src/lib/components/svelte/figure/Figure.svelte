<script lang="ts">
  import { twMerge } from '../../../tailwind/tailwind-merge.js';
  import placeholder from '../../../assets/images/placeholder.js';
  import type { SvelteHTMLElements } from 'svelte/elements';
  import type { Snippet } from 'svelte';

  type ImgAttriibutes = Omit<SvelteHTMLElements['img'], 'src' | 'class'>;

  type Props = Omit<SvelteHTMLElements['figure'], 'class'> & {
    image: string | ImageResult;
    img?: ImgAttriibutes;
    caption?: Record<string, string | undefined>;
    class?: ClassValue;
    custom?: Record<string, ClassValue>;
    alt?: string;
    native?: boolean;
    loaded?: (x?: Event | HTMLElement) => void;
    before?: Snippet;
    after?: Snippet;
  };
  const {
    children,
    image: __image,
    img,
    caption: __caption = {},
    class: className,
    alt = img?.alt ?? '',
    custom = {},
    native = false,
    loaded,
    before,
    after,
    ...rest
  }: Props = $props();

  const image = typeof __image === 'string' ? { src: __image } : __image;
  const attributes = Object.assign(
    {
      itemprop: 'image',
      loading: 'lazy',
      decoding: 'async'
    },
    image.attributes,
    img,
    { alt }
  );

  const caption = Object.entries(__caption);
  const handleLoad = native && loaded ? (x: Event) => loaded?.call(x) : undefined;
</script>

<figure
  class={twMerge('relative flex flex-col', className)}
  {...rest}>
  {#if before}
    {@render before()}
  {/if}
  <img
    onload={handleLoad}
    class={twMerge(!native && 'lazy', custom.image)}
    src={native ? image.src : placeholder}
    data-src={native ? undefined : image.src}
    {...attributes} />
  {#if children}
    {@render children()}
  {:else if caption.length}
    <figcaption class={twMerge('flex flex-col', custom.caption)}>
      {#each caption as [key, val]}
        {#if val}
          {#if key === 'title'}
            <span class={twMerge('order-first font-semibold', custom[key])}>{@html val}</span>
          {:else if key === 'description'}
            <small class={twMerge('order-last', custom[key])}>{@html val}</small>
          {:else}
            <span class={twMerge(custom[key])}>{@html val}</span>
          {/if}
        {/if}
      {/each}
    </figcaption>
  {/if}
  {#if after}
    {@render after()}
  {/if}
</figure>
