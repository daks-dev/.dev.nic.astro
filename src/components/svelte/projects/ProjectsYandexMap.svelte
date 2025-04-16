<script lang="ts">
  // @ts-nocheck
  import { BROWSER } from 'esm-env';
  import { onMount } from 'svelte';
  import { fade, fly, scale } from 'svelte/transition';
  import { sineIn } from 'svelte/easing';
  import { beforeNavigate } from '$app/navigation';
  import { twMerge, YandexMap, type YandexMapInstance } from '@daks.dev/svelte.sdk';

  let className: ClassName = undefined;
  export { className as class };

  // export let grayscale = false;
  // export let sepia = false;

  export let flyed = false;
  export let scaled = false;
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

  export let tag = 'div';

  export let projects: Project[];
  export let center = '55.727154, 37.593857';
  export let zoom = 9.2;

  let map: YandexMapInstance = {};

  const body = (el: Project) => {
    let res = '---';
    if (el.address || el.activities || el.area || el.note) {
      res = '<div class="flex flex-col pt-0.5">';
      if (el.address) res = `${res}<span>${el.address}</span>`;
      if (el.area) {
        res = `${res}<span>${(el.area_term || 'Общая площадь').toLocaleLowerCase()}: `;
        res = `${res}${el.area.toLocaleString()} ${el.area_unit || 'м<sup>2</sup>'}</span>`;
      }
      if (el.note) res = `${res}<small>${el.note}</small>`;
      if (el.activities) res = `${res}<small>[ ${el.activities} ]</small>`;
      res = `${res}</div>`;
    }
    return res;
  };

  const footer = (el: Project) => {
    const href = `href="/projects/${el.id.toString().padStart(3, '0')}"`;
    return `<a class="block w-full -mt-0.5 py-0.5 text-sky-700 oversee:text-brand" ${href}">подробнее...</a>`;
  };

  const data = {
    locations: projects.map((el, idx) => ({
      geometry: el.location.split(', ').map((x: string) => Number(x)),
      properties: {
        iconContent: idx + 1,
        balloonContentHeader: `${el.name} <sup class="font-normal">(${idx + 1})</sup>`,
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
  beforeNavigate(() => map?.controls?.get('fullscreenControl')?.exitFullscreen());

  let visible = false;
  onMount(() => (visible = BROWSER));
</script>

{#if visible}
  <svelte:element
    this={tag}
    in:animate={options}
    id="ymap"
    class={twMerge(className)}>
    <YandexMap
      bind:map
      class={twMerge(
        'ymaps--left-copyright h-full w-full'
        // grayscale && 'grayscale oversee:grayscale-0'
        // sepia && 'sepia oversee:sepia-0'
      )}
      {data} />
  </svelte:element>
{/if}
