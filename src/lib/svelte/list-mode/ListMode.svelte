<script lang="ts">
  import { twMerge } from '../../tailwind/tailwind-merge.js';
  import Icon from '../icon/Icon.svelte';
  import { toObj } from '../../utils/scroll.js';

  type Props = {
    mode: 'app' | 'list' | 'map';
    length: number;
    class?: ClassValue;
    classButton?: ClassValue;
    app?: boolean;
    list?: boolean;
    map?: boolean;
    icons?: Record<'app' | 'list' | 'map', string>;
    size?: number | string;
  };
  let {
    mode = $bindable(),
    length,
    class: className,
    classButton,
    app = false,
    list = false,
    map = false,
    icons,
    size = '1.5em'
  }: Props = $props();

  icons = Object.assign(
    {
      app: 'squares-four',
      list: 'list-dashes',
      map: 'map-trifold'
    },
    icons
  );
  size = typeof size === 'number' ? `${size}em` : size;

  let innerWidth = $state(0);

  const buttonClass = [
    'rounded-sm p-1.5',
    'disabled:text-cyan-600 dark:disabled:text-cyan-700',
    'oversee:bg-gray-300 dark:oversee:bg-gray-700',
    'hover:cursor-pointer'
  ];

  $effect.pre(() => {
    if (mode === 'map' && innerWidth < 640) mode = 'app';
  });
  $effect(() => {
    if (mode === 'app') document?.lazyload.update();
    if (mode === 'map') setTimeout(() => toObj('#ymap', { offset: -96, duration: 2100 }), 700);
  });
</script>

<svelte:window bind:innerWidth />

<div class={twMerge('overflow-hidden', 'flex items-center gap-4', className)}>
  <span class="mr-auto p-1.5 pl-0">[ <small>{length}</small> ]</span>
  {#if app}
    <button
      onclick={() => (mode = 'app')}
      class={twMerge(buttonClass, classButton)}
      type="button"
      disabled={mode === 'app' || undefined}>
      <Icon
        icon={icons.app}
        {size} />
    </button>
  {/if}
  {#if list}
    <button
      onclick={() => (mode = 'list')}
      class={twMerge(buttonClass, classButton)}
      type="button"
      disabled={mode === 'list' || undefined}>
      <Icon
        icon={icons.list}
        {size} />
    </button>
  {/if}
  {#if map}
    <button
      onclick={() => (mode = 'map')}
      class={twMerge(buttonClass, classButton)}
      type="button"
      disabled={mode === 'map' || undefined}>
      <Icon
        icon={icons.map}
        {size} />
    </button>
  {/if}
</div>
