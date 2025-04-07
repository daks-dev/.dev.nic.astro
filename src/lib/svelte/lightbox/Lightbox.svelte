<script lang="ts">
  import { twMerge } from '../../tailwind/tailwind-merge.js';
  import { onMount } from 'svelte';
  import Overlay from './inc/Overlay.svelte';
  import Header from './inc/Header.svelte';
  import Footer from './inc/Footer.svelte';
  import Body from './inc/Body.svelte';
  import type { LightboxAttributes as Props } from './index.d.ts';

  const {
    tag = 'div',
    children,
    class: className,
    custom = {},
    options: __options = {},
    title,
    description,
    fullscreen: __fullscreen = false,
    scrollable = false,
    loader,
    thumbnail,
    ...rest
  }: Props = $props();

  const options = Object.assign(
    {
      clickableClose: true,
      buttonClose: true,
      buttonFullscreen: true,
      enableKeyboard: true,
      bodyScroll: false,
      duration: 200
    },
    __options,
    {
      swipe: false,
      wheel: false
    }
  );
  if (scrollable) options.buttonFullscreen = false;

  let fullscreen = $state(scrollable ? false : __fullscreen);
  let visible = $state(false);

  let toggleScroll: () => void;

  export function open(): void {
    visible = true;
    toggleScroll();
  }

  export function close(): void {
    visible = false;
    toggleScroll();
  }

  function toogleFullscreen(): void {
    fullscreen = !fullscreen;
  }

  onMount(() => {
    loader?.();
    if (!options.bodyScroll || scrollable) {
      toggleScroll = () => {
        if (visible) document.body.classList.add('overflow-y-hidden');
        else document.body.classList.remove('overflow-y-hidden');
      };
    }
  });
</script>

{#if thumbnail}
  <svelte:element
    this={tag}
    onclick={open}
    class={twMerge('hover:cursor-zoom-in', className)}
    role="button"
    tabindex="-1"
    {...rest}>
    {@render thumbnail()}
  </svelte:element>
{/if}

{#if visible}
  <Overlay
    {close}
    {custom}
    {fullscreen}
    {options}>
    <Header
      {close}
      {toogleFullscreen}
      {custom}
      {fullscreen}
      {options} />
    <Body
      {fullscreen}
      {scrollable}
      {options}>
      {@render children?.()}
    </Body>
    <Footer
      {custom}
      {fullscreen}
      {title}
      {description} />
  </Overlay>
{/if}
