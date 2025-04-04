import type { HTMLAttributes } from 'astro/types';

type IconItem = {
  body?: string;
  stroke?: string | null;
  fill?: string | null;
  viewBox?: string | null;
};

const bundle = Object.entries(
  import.meta.glob('@iconset/**/*.svg', {
    query: '?raw',
    eager: true,
    import: 'default'
  }) as Record<string, string>
).reduce((acc: Record<string, IconItem>, [key, val]) => {
  const idx = key.replace(/(.+)\/([\w-]+).svg/, '$2');
  const str = val.replace(/\n+/g, '').replace(/\s{2}/g, ' ').replace('> <', '><').trim();
  acc[idx] = {
    body: str.match(/^<svg(.*?)>(.+)<\/svg>(.*)$/)?.at(2),
    stroke: str.match(/^<svg(.+?)stroke="(.+?)"(.+)$/)?.at(2),
    fill: str.match(/^<svg(.+?)fill="(.+?)"(.+)$/)?.at(2),
    viewBox: str.match(/^<svg(.+?)viewBox="(.+?)"(.+)$/)?.at(2)
  };
  return acc;
}, {});

export type IconAttributes = Omit<HTMLAttributes<'svg'>, 'class'> & {
  icon: string;
  class?: ClassValue;
  size?: number | string;
  gradient?: {
    rotate?: number;
    stops: Record<
      string,
      | string
      | {
          color: string;
          opacity?: number;
        }
    >[];
  };
};

export default bundle;
