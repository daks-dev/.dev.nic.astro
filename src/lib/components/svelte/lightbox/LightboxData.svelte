<script lang="ts">
  import LightboxList from './LightboxList.svelte';
  import LightboxModal from './LightboxModal.svelte';
  import LightboxThumbnail from './LightboxThumbnail.svelte';
  import Figure from '../figure/Figure.svelte';
  import type { Custom } from '.';

  export let custom: Partial<Custom> = {};

  export let data: {
    thumb: ImageResult;
    modal: ImageResult;
    caption: Record<string, string>;
  }[];
</script>

<LightboxList
  {custom}
  {...$$restProps}>
  <svelte:fragment slot="thumbnail">
    {#each data as { thumb: image, caption, modal: { src: href } }}
      <LightboxThumbnail>
        <Figure
          class={['not-prose leading-none', custom.item]}
          custom={custom.inner}
          {image}
          attributes={{
            itemprop: 'imageThumbnail'
          }}
          {caption} />
        <link
          rel="image"
          {href}
          itemprop="image" />
      </LightboxThumbnail>
    {/each}
  </svelte:fragment>
  {#each data as { modal: { src, attributes }, caption }}
    <LightboxModal {...caption}>
      <img
        {src}
        {...attributes}
        alt="" />
    </LightboxModal>
  {/each}
</LightboxList>
