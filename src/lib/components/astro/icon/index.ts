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
  const idx = key.match(/^(.+)\/([\w-]+).svg$/)?.at(2);
  if (idx)
    acc[idx] = {
      body: val.match(/^<svg(.*?)>(.+)<\/svg>$/)?.at(2),
      stroke: val.match(/^<svg([^>]+)stroke="(.+?)"/)?.at(2),
      fill: val.match(/^<svg([^>]+)fill="(.+?)"/)?.at(2),
      viewBox: val.match(/^<svg([^>]+)viewBox="(.+?)"/)?.at(2)
    };
  return acc;
}, {});

export default bundle;
