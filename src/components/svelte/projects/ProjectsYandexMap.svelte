<script lang="ts">
  // import { BROWSER } from 'esm-env';
  // import { onMount } from 'svelte';
  import { fade, fly, scale } from 'svelte/transition';
  import { sineIn } from 'svelte/easing';
  // import { beforeNavigate } from '$app/navigation';
  import { twMerge } from '@daks.dev/astro.sdk';
  import { YandexMap } from '@daks.dev/astro.sdk/svelte';
  // import type { YandexMapInstance } from '@daks.dev/astro.sdk/svelte';

  import seo from '@app/configs/seo';
  const {
    yandex: { api }
  } = seo;

  type Project = {
    id: string;
    src: ImageResult;
    caption: {
      title: string;
      description: string;
    };
    address: string;
    area?: string;
    area_term?: string;
    area_unit?: string;
    activities?: string[];
    location: string;
  };

  type Props = {
    projects: Project[];
    center?: string;
    zoom?: number; // (x: number) => (x < 768 && 10) || (x < 1024 && 10.3) || (x < 1280 && 10) || 10.3;
    tag?: 'div' | 'aside';
    class?: ClassValue;
    grayscale?: true;
    sepia?: true;
    flyed?: true;
    scaled?: true;
  };

  const {
    projects,
    center = '55.727154, 37.593857',
    zoom = 9,
    tag = 'div',
    class: className,
    grayscale,
    sepia,
    flyed,
    scaled
  }: Props = $props();

  const animate = flyed ? fly : scaled ? scale : fade;
  const options = flyed
    ? {
        x: 512,
        duration: 700,
        delay: 700,
        easing: sineIn
      }
    : scaled
      ? {
          start: 0.5,
          opacity: 0,
          duration: 2000,
          delay: 75,
          easing: sineIn
        }
      : {
          duration: 700,
          delay: 75,
          easing: sineIn
        };

  // let map: YandexMapInstance = {};

  const body = (el: Project) => {
    let res = '---';
    if (el.address || el.activities || el.area) {
      res = '<div class="flex flex-col pt-0.5">';
      if (el.address) res = `${res}<span>${el.address}</span>`;
      if (el.area) {
        res = `${res}<span>${(el.area_term || 'Общая площадь').toLocaleLowerCase()}: `;
        res = `${res}${el.area.toLocaleString()} ${el.area_unit || 'м<sup>2</sup>'}</span>`;
      }
      if (el.activities) res = `${res}<small>[ ${el.activities} ]</small>`;
      res = `${res}</div>`;
    }
    return res;
  };

  const footer = (el: Project) =>
    `<a class="block w-full -mt-0.5 py-0.5 text-sky-700 oversee:text-brand" href=/projects/${el.id}>подробнее...</a>`;

  const geo = {
    locations: projects.map((el, idx) => ({
      geometry: el.location.split(', ').map((x: string) => Number(x)),
      properties: {
        iconContent: idx + 1,
        balloonContentHeader: `${el.caption.title} <sup class="font-normal">(${idx + 1})</sup>`,
        balloonContentBody: body(el),
        balloonContentFooter: footer(el)
      },
      options: {
        preset: 'islands#nightStretchyIcon'
      }
    })),
    state: {
      center: center.split(', ').map((x: string) => Number(x)),
      zoom,
      behaviors: ['drag', 'dblClickZoom', 'rightMouseButtonMagnifier', 'multiTouch'],
      controls: ['zoomControl', 'fullscreenControl']
    },
    options: {
      // avoidFractionalZoom: false,
      autoFitToViewport: 'always',
      suppressMapOpenBlock: true
    }
  };

  /*
  function exitFullscreen() {
    console.log('exitFullscreen', map.controls.get('fullscreenControl').exitFullscreen);
    //map.controls.get('fullscreenControl').exitFullscreen();
  }
  */
  // beforeNavigate(() => map?.controls?.get('fullscreenControl')?.exitFullscreen());

  // let visible = $state(false);
  // onMount(() => (visible = BROWSER));
</script>

<svelte:element
  this={tag}
  in:animate={options}
  id="ymap"
  class={twMerge(className)}>
  <YandexMap
    class={[
      'h-full w-full',
      'ymaps--left-copyright',
      grayscale && 'grayscale hover:grayscale-0',
      sepia && 'sepia hover:sepia-0'
    ]}
    {geo}
    apikey={api.maps} />
</svelte:element>
