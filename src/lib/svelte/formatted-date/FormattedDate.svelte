<script lang="ts">
  import dayjs from 'dayjs';
  import custom from 'dayjs/plugin/customParseFormat.js';
  dayjs.extend(custom);

  import { twMerge } from '../../tailwind/tailwind-merge.js';

  import type { HTMLTimeAttributes } from 'svelte/elements';
  type Props = Omit<HTMLTimeAttributes, 'class'> & {
    date: string | Date;
    parse: string;
    class?: ClassValue;
    locale?: 'en-US' | 'ru-RU';
    year?: 'numeric' | '2-digit';
    month?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow';
    day?: 'numeric' | '2-digit';
  };
  const {
    class: className,
    date: __date,
    parse,
    locale = 'ru-RU',
    year = 'numeric',
    month = 'long',
    day = 'numeric',
    ...rest
  }: Props = $props();
  const date = typeof __date === 'string' ? dayjs(__date, parse).toDate() : __date;
</script>

<time
  class={twMerge(className)}
  datetime={date.toISOString()}
  {...rest}>
  {date.toLocaleDateString(locale, { year, month, day })}
</time>
