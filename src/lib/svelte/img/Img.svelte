<script lang="ts">
  import { twMerge } from '../../tailwind/tailwind-merge.js';
  import placeholder from '../../assets/images/placeholder.js';
  import type { ImgAttriibutes as Props } from './index.d.ts';

  const {
    src,
    class: className,
    alt = '',
    eager,
    lazyload,
    loaded,
    before,
    after,
    ...rest
  }: Props = $props();

  const image = typeof src === 'string' ? { src } : src;
  const attributes = Object.assign(
    {},
    image.attributes,
    {
      alt,
      loading: lazyload || !eager ? 'lazy' : 'eager',
      decoding: 'async',
      itemprop: 'image'
    },
    rest
  );

  const handleLoad = loaded ? (x: Event) => loaded?.(x) : undefined;
</script>

{@render before?.()}
<img
  onload={handleLoad}
  class={twMerge(lazyload && 'lazy', className)}
  src={lazyload ? placeholder : image.src}
  data-src={lazyload ? image.src : undefined}
  {...attributes} />
{@render after?.()}
