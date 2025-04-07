<script lang="ts">
  import { onMount, setContext } from 'svelte';
  import { twMerge } from '../../tailwind/tailwind-merge.js';
  import Overlay from './inc/Overlay.svelte';
  import Header from './inc/Header.svelte';
  import Footer from './inc/Footer.svelte';
  import Body from './inc/Body.svelte';
  import Controller from './inc/Controller.svelte';
  import type { Item } from './index.d.ts';
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
      behaviour: '',
      swipe: true,
      wheel: true,
      clickableClose: true,
      buttonClose: true,
      buttonFullscreen: true,
      enableKeyboard: true,
      bodyScroll: false,
      duration: 200
    },
    __options
  );
  if (scrollable) {
    options.buttonFullscreen = false;
    options.wheel = false;
  }

  let fullscreen = $state(scrollable ? false : __fullscreen);

  let visible = $state(false);

  let items = $state<Item[]>([]);
  let countItems = $derived(items.length);
  let activeItem = $state(0);
  let status = $derived({ countItems, activeItem });

  setContext('activeItem', () => activeItem);
  setContext('counterItems', (item: Item) => {
    item.id = items.length;
    items = [...items, item];
    return items.length - 1;
  });

  let countThumbnails = $state(0);
  setContext('counterThumbnails', () => countThumbnails++);

  setContext('openImage', openImage);

  let activeItemTitle = $derived(items[activeItem]?.title || title);
  let activeItemDescription = $derived(items[activeItem]?.description || description);

  $effect(() => {
    if (!visible) items = [];
  });

  let toggleScroll: () => void;

  function toggle(): void {
    visible = !visible;
    toggleScroll();
  }

  function open(): void {
    visible = true;
    toggleScroll();
  }

  function close(): void {
    visible = false;
    toggleScroll();
  }

  function openImage(id: number): void {
    open();
    activeItem = id;
  }

  function toogleFullscreen(): void {
    fullscreen = !fullscreen;
  }

  export function next(): void {
    if (activeItem === countItems - 1) {
      if (options.behaviour === 'loop') {
        activeItem = 0;
      }
    } else {
      activeItem++;
    }
  }

  export function previous(): void {
    if (activeItem === 0) {
      if (options.behaviour === 'loop') {
        activeItem = countItems - 1;
      }
    } else {
      activeItem--;
    }
  }

  onMount(() => {
    loader?.call(null);
    if (!options.bodyScroll || scrollable) {
      toggleScroll = function () {
        if (window.scrollbars.visible)
          if (visible) {
            document.documentElement.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`;
            document.body.style.overflowY = 'hidden';
          } else {
            document.body.style.overflowY = '';
            document.documentElement.style.paddingRight = '';
          }
      };
    }
  });
</script>

{#if thumbnail}
  <svelte:element
    this={tag}
    class={twMerge(className)}
    {...rest}>
    {@render thumbnail()}
  </svelte:element>
{/if}

{#if visible}
  <Overlay
    {close}
    {next}
    {previous}
    {custom}
    {fullscreen}
    {options}>
    <Header
      {close}
      {toogleFullscreen}
      {custom}
      {fullscreen}
      {options} />
    <Controller
      {next}
      {previous}
      {activeItem}
      {countItems}
      {options}>
      <Body
        {fullscreen}
        {scrollable}
        {options}
        {status}>
        {@render children?.()}
      </Body>
    </Controller>
    <Footer
      {custom}
      {fullscreen}
      title={activeItemTitle}
      description={activeItemDescription}
      {status} />
  </Overlay>
{/if}
