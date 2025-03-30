<script lang="ts">
  import { twMerge } from '../../../tailwind/tailwind-merge.js';
  import placeholder from '../../../assets/images/placeholder';

  let className: ClassValue = undefined;
  export { className as class };

  export let custom: Record<string, ClassValue> = {};

  export let image: ImageResult;

  export let attributes: Metadata = {};
  attributes = Object.assign(image.attributes, attributes);
  attributes.itemprop ??= 'image';
  attributes.loading ??= 'lazy';
  attributes.decoding ??= 'async';

  export let caption: Record<string, string> = {};
  const entries = Object.entries(caption);

  export let alt = attributes.alt?.toString() || '';
  delete attributes.alt;

  export let native = true;

  export let loaded: ((x?: Event | HTMLElement) => void) | undefined = undefined;
  const handle = native && loaded ? (ev: Event) => loaded?.call(ev) : undefined;
</script>

<figure
  class={twMerge('relative flex flex-col', className)}
  {...$$restProps}>
  <slot name="before" />
  <img
    on:load={handle}
    class={twMerge(!native && 'lazy', custom.image)}
    src={native ? image.src : placeholder}
    data-src={native ? undefined : image.src}
    {...attributes}
    {alt} />
  <slot>
    {#if entries.length}
      <figcaption class={twMerge('flex flex-col', custom.caption)}>
        {#each entries as [key, val]}
          {#if val}
            {#if key === 'title'}
              <span class={twMerge('font-semibold', custom[key])}>{@html val}</span>
            {:else if key === 'description'}
              <small class={twMerge(custom[key])}>{@html val}</small>
            {:else}
              <span class={twMerge(custom[key])}>{@html val}</span>
            {/if}
          {/if}
        {/each}
      </figcaption>
    {/if}
  </slot>
  <slot name="after" />
</figure>
