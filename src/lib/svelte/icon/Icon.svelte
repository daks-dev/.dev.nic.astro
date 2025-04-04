<script lang="ts">
  import { twMerge } from '../../tailwind/tailwind-merge.js';
  import bundle from './index.js';
  import type { IconAttributes } from './index.d.ts';

  const {
    icon,
    class: className,
    color = 'currentcolor',
    size = '1em',
    width = size,
    height = size,
    gradient,
    ...rest
  }: IconAttributes = $props();

  const { body, viewBox = '0 0 256 256' } = bundle[icon];

  const id = `_${Math.floor((1 + Math.random()) * 0x1000)
    .toString(16)
    .substring(1)}`;
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  class={twMerge('linecap-round linejoin-round align-middle', className)}
  {width}
  {height}
  fill={gradient ? `url(#${id})` : color}
  {viewBox}
  aria-hidden="true"
  {...rest}>
  <g>{@html body}</g>
  {#if gradient}
    <defs>
      <linearGradient
        {id}
        x1="0%"
        y1="0%"
        x2="100%"
        y2="0%"
        gradientTransform={`rotate(${gradient.rotate ? gradient.rotate : 0})`}>
        {#each gradient.stops as stop}
          {#each Object.entries(stop) as [offset, val]}
            <stop
              {offset}
              stop-color={typeof val === 'string' ? val : val.color}
              stop-opacity={typeof val !== 'string' &&
              typeof val.opacity !== 'undefined' &&
              val.opacity < 1
                ? val.opacity
                : ''} />
          {/each}
        {/each}
      </linearGradient>
    </defs>
    )
  {/if}
</svg>
