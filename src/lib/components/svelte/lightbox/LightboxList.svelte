<script lang="ts">
  import { onMount, setContext } from 'svelte';
  import { writable, type Writable } from 'svelte/store';
  import { twMerge } from '../../../tailwind/tailwind-merge.js';
  import Overlay from './components/Overlay.svelte';
  import Header from './components/Header.svelte';
  import Footer from './components/Footer.svelte';
  import Body from './components/Body.svelte';
  import Controller from './components/Controller.svelte';
  import type { Options, Custom, Item, Loader } from '.';

  import './index.css';

  // Lightbox
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
      behaviour: '',
      swipe: true,
      wheel: true,
      clickableClose: true,
      buttonClose: true,
      buttonFullscreen: true,
      enableKeyboard: true,
      bodyScroll: false,
      duration: 300
    },
    options
  );

  export let loader: Loader = undefined;

  if (scrollable) fullscreen = options.buttonFullscreen = options.wheel = false;

  // LightboxList
  let activeItem = 0;
  export { activeItem as active };

  //
  $: fullscreen;

  let controller: Controller;
  let visible = false;
  let items: Item[] = [];
  let countThumbnails = 0;

  let toggleScroll: () => void;

  export function toggle(): void {
    visible = !visible;
    toggleScroll();
  }

  export function open(): void {
    visible = true;
    toggleScroll();
  }

  export function close(): void {
    visible = false;
    toggleScroll();
  }

  export function openImage(id: number): void {
    open();
    activeItem = id;
  }

  function toogleFullscreen(): void {
    fullscreen = !fullscreen;
  }

  function keepOrEmptyImageList(visible: boolean): void {
    if (!visible) items = [];
  }
  $: keepOrEmptyImageList(visible);

  const countItemsStore: Writable<number> = writable(items.length);
  const activeItemStore: Writable<number> = writable(activeItem);
  $: activeItemStore.set(activeItem);

  $: status = { countItems: $countItemsStore, activeItem: $activeItemStore };

  setContext('activeItem', activeItemStore);
  setContext('counterItems', (item: Item) => {
    item.id = items.length;
    items = [...items, item];
    $countItemsStore = items.length;
    return $countItemsStore - 1;
  });
  setContext('counterThumbnails', () => countThumbnails++);
  setContext('openImage', openImage);

  $: activeItemTitle = items[$activeItemStore]?.title || title || '';
  $: activeItemSubTitle = items[$activeItemStore]?.subtitle || subtitle || '';
  $: activeItemDescription = items[$activeItemStore]?.description || description || '';

  onMount(() => {
    loader?.call(null);
    if (!options.bodyScroll || scrollable) {
      toggleScroll = function () {
        if (visible) document.body.classList.add('overflow-y-hidden');
        else document.body.classList.remove('overflow-y-hidden');
      };
    }
  });
</script>

{#if $$slots.thumbnail}
  <svelte:element
    this={tag}
    class={twMerge(className)}>
    <slot
      name="thumbnail"
      {custom} />
  </svelte:element>
{/if}

{#if visible}
  <Overlay
    on:close={close}
    on:previous={controller.previous}
    on:next={controller.next}
    {custom}
    {fullscreen}
    {options}>
    <Header
      on:close={close}
      on:fullscreen={toogleFullscreen}
      {custom}
      {fullscreen}
      {options} />
    <Controller
      bind:this={controller}
      {options}
      {countItemsStore}
      {activeItemStore}>
      <Body
        {fullscreen}
        {scrollable}
        {options}>
        <slot />
      </Body>
    </Controller>
    <Footer
      {custom}
      {fullscreen}
      title={activeItemTitle}
      subtitle={activeItemSubTitle}
      description={activeItemDescription}
      {status} />
  </Overlay>
{/if}
