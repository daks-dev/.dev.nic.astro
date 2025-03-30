<script lang="ts">
  import { blur } from 'svelte/transition';
  import type { Options } from '..';

  export let fullscreen: boolean;
  export let scrollable: boolean;
  export let options: Partial<Options>;

  const delay = 300;
</script>

<div
  in:blur={{ duration: options.duration, delay }}
  out:blur={{ duration: delay }}
  class="
    lightbox-body
    relative z-10 flex cursor-default overflow-hidden"
  class:fullscreen
  class:scrollable
  class:overflow-y-auto={scrollable}
  class:cursor-ew-resize={options.swipe}>
  <slot />
</div>
