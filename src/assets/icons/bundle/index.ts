type IconBundleItem = {
  body?: string;
  stroke?: string | null;
  fill?: string | null;
  viewBox?: string | null;
};
type IconBundle = Record<string, IconBundleItem>;

const bundle = Object.entries(
  import.meta.glob('./*.svg', {
    query: '?raw',
    eager: true,
    import: 'default'
  }) as Record<string, string>
).reduce((acc: IconBundle, [key, val]) => {
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

// type IconKeys = keyof typeof bundle;
// type IconKeysExt = keyof typeof bundle | (string & NonNullable<unknown>);

export default bundle;
