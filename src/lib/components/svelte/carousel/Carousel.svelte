<script lang="ts">
  import { onMount } from 'svelte';
  import { tweened } from 'svelte/motion';
  import { linear, quadInOut } from 'svelte/easing';
  import { Figure } from '../figure';
  import { lazyload, swipe, wheel, type LazyLoad } from '../../utils';
  import { twMerge } from '../../../tailwind/tailwind-merge';
  import ButtonMove from './components/ButtonMove.svelte';
  import ButtonPlay from './components/ButtonPlay.svelte';
  import type { Custom, Show, Easing, Controls, Loaded } from '.';

  let className: ClassValue = undefined;
  export { className as class };

  export let custom: Partial<Custom> = {};
  custom = Object.assign(
    {
      button: 'text-slate-400/70 hover:text-white/70 disabled:text-gray-700/50 hover:bg-black/50',
      progress: 'bottom-full opacity-50'
    },
    custom
  );
  custom.inner ??= {};

  export let data: (ImageResult & {
    caption: Record<string, string>;
  })[] = [];
  let total = data.length;

  export let appear = 0;
  export let show: Show = (x: number) => (x < 480 && 1) || (x < 640 && 2) || (x < 1024 && 3) || 4;
  export let ratio: number | undefined = undefined;

  custom.inner.image = twMerge(
    'w-full max-w-full',
    ratio ? 'h-full object-cover' : 'h-auto object-contain',
    'pointer-events-none',
    custom.inner.image
  );

  export let stream = false;

  export let duration = stream ? 7000 : 3000;
  export let delay = stream ? 0 : 2000;
  export let easing: Easing = stream ? linear : quadInOut;

  export let autoplay = stream;
  export let pause = 500;

  export let controls: Controls = ['move', 'play'];
  function control(x: string, cb?: () => void): boolean {
    const res = controls.indexOf('all') > -1 || controls.indexOf(x) > -1;
    res && cb?.call(null);
    return res;
  }

  export let progress = false;

  export let native = false;
  export let loaded: Loaded = undefined;

  let auto = autoplay;

  let innerWidth: number = 0;
  $: count = typeof show === 'function' ? show(innerWidth) : show;

  let carousel: HTMLElement;
  $: width = carousel?.clientWidth / count;

  let __timeout: ReturnType<typeof setTimeout>;
  function timeout(cb?: () => void, ms = pause): void {
    if (cb) ms ? (__timeout = setTimeout(cb, ms)) : cb();
    else clearTimeout(__timeout);
  }

  let step = 0;
  let wait = false;

  function tweening(ms?: number) {
    return {
      duration: ms ?? (auto ? duration : pause),
      delay: auto ? delay : 0,
      easing
    };
  }
  const tween = tweened(0, tweening());

  function set(val: number, cb: () => void, ms?: number): void {
    step = val;
    wait = true;
    tween.set(step, tweening(ms)).then(cb);
  }

  export function next(): void {
    if (step < total - count) set(++step, play);
    else auto ? timeout(() => play(false), pause) : reset();
  }

  export function prev(): void {
    if (step) set(--step, () => play(false));
    else timeout(play, auto ? delay : 0);
  }

  export function play(forward = true): void {
    wait = false;
    auto && (forward ? next() : prev());
  }

  export function stop(): void {
    set(step, () => (wait = false), pause);
  }

  export function toogle(): void {
    auto = !auto;
    auto ? play() : stop();
  }

  export function reset(ms = pause): void {
    set(0, play, ms);
  }

  function resize(): void {
    width = carousel?.clientWidth / count;
    step + count > total && set((step = total - count), play, 0);
  }

  let observer: ResizeObserver;
  let loader: LazyLoad;
  export function start(): void {
    observer ??= new ResizeObserver(resize);
    observer.observe(carousel);
    if (!native)
      loader
        ? loader.update()
        : (loader = lazyload({
            container: carousel,
            callback_loaded: (x: unknown) => loaded?.call(x)
          }));
    (auto = autoplay) && timeout(play, pause);
  }

  function actionSwipe(delta: { x: number; h: boolean; v: boolean }): void {
    if (!auto && delta.h && !delta.v) delta.x > 0 ? prev() : next();
  }

  function actionWheel(delta: { y: number }): void {
    if (!auto) {
      delta.y > 0 && next();
      delta.y < 0 && prev();
    }
  }

  let slider: HTMLElement;
  onMount(() => {
    //carousel.addEventListener('wheel', handleWheel);
    total ||= slider.children.length;
    start();
    return timeout;
  });
</script>

<svelte:window bind:innerWidth />

<div
  class={twMerge(
    'not-prose text-base',
    'linecap-round linejoin-round vector-non-scaling-stroke',
    appear && (observer ? 'opacity-100' : 'opacity-0'),
    appear && 'transition-opacity ease-in',
    className
  )}
  style:transition-delay={appear ? `${appear}ms` : undefined}
  style:transition-duration={appear ? `${appear}ms` : undefined}
  {...$$restProps}>
  <div class="relative w-full">
    <div
      bind:this={carousel}
      use:swipe={actionSwipe}
      use:wheel={control('wheel') ? actionWheel : undefined}
      class={twMerge(
        'w-full overflow-x-hidden',
        'select-none',
        auto || wait ? 'cursor-wait' : 'cursor-ew-resize'
      )}>
      <div
        bind:this={slider}
        class="
          relative
          grid grid-flow-col grid-rows-1
          will-change-transform"
        class:overflow-x-hidden={ratio}
        style:height={ratio ? `${width / ratio}px` : ''}
        style:width="{width * total}px"
        style:transform="translate3d(-{width * $tween}px, 0px, 0px)">
        {#each data as { caption, ...image }}
          <Figure
            class={custom.item}
            style="width:{width}px"
            custom={custom.inner}
            {image}
            {caption}
            {native}
            {loaded} />
        {/each}
        <slot
          {ratio}
          {total}
          {count}
          {auto}
          {wait}
          {step}
          {width}
          {tween}
          {next}
          {prev}
          {toogle}
          {control} />
      </div>
    </div>

    <slot name="check" />

    <slot name="control">
      {#if control('move') && !auto}
        <ButtonMove
          on:click={next}
          class={custom.button}
          disabled={auto || wait || undefined}
          flip />
      {/if}
      {#if control('play')}
        <ButtonPlay
          on:click={toogle}
          class={custom.button}
          {auto} />
      {/if}
      {#if control('move') && !auto}
        <ButtonMove
          on:click={prev}
          class={custom.button}
          disabled={auto || wait || !step || undefined} />
      {/if}
    </slot>

    {#if progress}
      <slot name="progress">
        <progress
          class={twMerge('absolute left-0 z-10 h-1 w-full', custom.progress)}
          value={$tween / (total - count)}></progress>
      </slot>
    {/if}
  </div>
</div>
