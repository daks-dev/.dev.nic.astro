<script
  lang="ts"
  module>
  let mode = $state<'app' | 'list' | 'map'>('app');
</script>

<script lang="ts">
  import { sineIn, sineOut } from 'svelte/easing';
  import { blur, fade } from 'svelte/transition';
  import { twMerge } from '@daks.dev/astro.sdk';
  import { ListMode, Figure, Sign } from '@daks.dev/astro.sdk/svelte';
  import ProjectsYandexMap from './ProjectsYandexMap.svelte';

  type Project = {
    id: string;
    src: ImageResult;
    caption: {
      title: string;
      description: string;
    };
    address: string;
    area?: string;
    area_unit?: string;
    location: string;
  };

  type Custom = {
    app?: ClassValue;
    list?: ClassValue;
    map?: ClassValue;
  };

  type Props = {
    projects: Project[];
    class?: ClassValue;
    custom?: Custom;
    grayscale?: true;
    center?: string;
    zoom?: number; // (x: number) => (x < 768 && 10) || (x < 1024 && 10.3) || (x < 1280 && 10) || 10.3;
  };

  const { projects, class: className, custom = {}, grayscale, center, zoom }: Props = $props();
  custom.app ??= className;

  const transition = {
    in: { duration: 150, delay: 50, easing: sineIn },
    out: { duration: 75, easing: sineOut }
  };
</script>

{#if projects.length}
  <ListMode
    bind:mode
    length={projects.length}
    class="-mt-4 mb-4"
    app
    list
    map />

  {#if mode === 'app'}
    <div
      in:blur={transition.in}
      out:fade={transition.out}
      class={twMerge(
        'grid gap-x-8 gap-y-12 max-sm:place-items-center lg:gap-16',
        'grid-cols-1 sm:grid-cols-2 md:grid-cols-3',
        custom.app
      )}>
      {#each projects as { id, src, caption }}
        <a
          class="group relative"
          href="/projects/{id}"
          itemprop="relatedLink">
          <Sign
            custom="iconify ph--link"
            class="top-2 left-2"
            link
            dark />
          <Figure
            class={[
              'overflow-hidden',
              'rounded-sm border border-gray-400 dark:border-gray-600',
              'shadow-md shadow-black group-hover:shadow-sm',
              'pointer-events-none',
              'transition-easy'
            ]}
            custom={{
              img: [
                'h-auto w-full max-w-full',
                'aspect-square object-contain',
                grayscale && ['grayscale group-hover:grayscale-0', 'transition-easy']
              ],
              caption: [
                'absolute bottom-0 left-0',
                'h-20 w-full overflow-hidden p-2',
                'flex flex-col justify-start',
                'leading-tight text-ellipsis text-white',
                'bg-gray-700/70',
                'group-hover:opacity-0',
                'duration-1000 ease-in-out motion-safe:ready:transition-opacity'
              ]
            }}
            {src}
            {caption} />
          <small class="absolute top-2 right-2 text-black">{id}</small>
        </a>
      {/each}
    </div>
  {:else if mode === 'list'}
    <div
      in:blur={transition.in}
      out:fade={transition.out}
      class={twMerge('flex flex-col', custom.list)}>
      {#each projects as { id, caption: { title }, address, area, area_unit }, idx}
        <a
          class={[
            'group',
            'px-2 py-4',
            'grid grid-cols-[32px_minmax(0,_1fr)_96px] md:grid-cols-[32px_288px_minmax(0,_1fr)_96px]',
            'items-center',
            'no-underline',
            'odd:bg-slate-400/20',
            'hover:text-sky-500 hover:!bg-slate-400/40'
          ]}
          href="/projects/{id}"
          itemprop="relatedLink">
          <small>{idx + 1}</small>
          <span class="text-slate-600 group-hover:!text-inherit dark:text-slate-400">
            {@html title}
          </span>
          <small class="max-md:hidden">
            {@html address}
          </small>
          <span class="text-right">
            {Number(area).toLocaleString()}
            <small>{@html area_unit || 'м<sup>2</sup>'}</small>
          </span>
        </a>
      {/each}
    </div>
  {:else}
    <div class="frame-xl hidden sm:block">
      <ProjectsYandexMap
        class={[
          'aspect-square w-full lg:aspect-video',
          'bg--waiting bg-center bg-no-repeat',
          'bg-[size:25%] sm:bg-[size:20%] md:bg-[size:10%]',
          'bg-gray-100 dark:bg-slate-200',
          'border-4 border-slate-400',
          custom.map
        ]}
        {projects}
        {center}
        {zoom} />
    </div>
  {/if}
{:else}
  <div class="frame text-center">Проектов нет!</div>
{/if}
