<script lang="ts">
  import { onMount } from 'svelte';
  import { twMerge } from '../../../tailwind/tailwind-merge.js';
  import Overlay from './components/Overlay.svelte';
  import Header from './components/Header.svelte';
  import Footer from './components/Footer.svelte';
  import Body from './components/Body.svelte';
  import type { Options, Custom, Loader } from '.';

  import './index.css';

  let className: ClassValue = undefined;
  export { className as class };

  export let custom: Partial<Custom> = {};

  export let tag = 'div';

  export let title = '';
  export let subtitle = '';
  export let description = '';

  export let fullscreen = false;
  export let scrollable = false;

  export let options: Partial<Options> = {};
  options = Object.assign(
    {
      clickableClose: true,
      buttonClose: true,
      buttonFullscreen: true,
      enableKeyboard: true,
      bodyScroll: false,
      duration: 300
    },
    options,
    {
      swipe: false,
      wheel: false
    }
  );

  export let loader: Loader = undefined;

  if (scrollable) fullscreen = options.buttonFullscreen = false;

  //
  $: fullscreen;

  let visible = false;

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
    loader?.call(null);
    //window.getComputedStyle(document.body).overflowY
    //window.innerWidth - document.documentElement.clientWidth
    if (!options.bodyScroll || scrollable) {
      toggleScroll = () => {
        if (visible) document.body.classList.add('overflow-y-hidden');
        else document.body.classList.remove('overflow-y-hidden');
      };
    }
  });
</script>

{#if $$slots.thumbnail}
  <svelte:element
    this={tag}
    on:keypress
    on:click={open}
    class={twMerge('hover:cursor-zoom-in', className)}
    role="button"
    tabindex="-1">
    <slot
      name="thumbnail"
      {custom} />
  </svelte:element>
{/if}

{#if visible}
  <Overlay
    on:close={close}
    {custom}
    {fullscreen}
    {options}>
    <Header
      on:close={close}
      on:fullscreen={toogleFullscreen}
      {custom}
      {fullscreen}
      {options} />
    <Body
      {fullscreen}
      {scrollable}
      {options}>
      <slot />
    </Body>
    <Footer
      {custom}
      {fullscreen}
      {title}
      {subtitle}
      {description} />
  </Overlay>
{/if}
