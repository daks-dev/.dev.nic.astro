export const prerender = true;

// import pkg from 'package.json';

import app from '@app/configs/app';
const {
  id,
  scope,
  name,
  shortName,
  description,
  displayOverride,
  display,
  backgroundColor,
  themeColor
} = app;

const pathname = import.meta.env.PUBLIC_APP_CANONICAL
  ? new URL(import.meta.env.PUBLIC_APP_CANONICAL).pathname
  : './';

const any = [128, 192, 256, 384, 512];
const maskable = [192, 384, 512];
const monochrome = [128, 192, 256];
const icons: Record<string, string>[] = [];
const push = (arr = any, purpose = 'any') => {
  arr.forEach((val) => {
    const png = typeof val === 'number';
    const dir =
      purpose.indexOf('maskable') > -1
        ? 'maskable/'
        : purpose.indexOf('monochrome') > -1
          ? 'monochrome/'
          : '';
    const file = png ? `${val}.png` : val;
    icons.push({
      src: `/favicon/${dir}${file}`,
      sizes: png ? `${val}x${val}` : 'any',
      type: `image/${png ? 'png' : 'svg+xml'}`,
      purpose
    });
  });
};

push();
push(maskable, 'maskable');
push(monochrome, 'monochrome');

const data = {
  id,
  start_url: pathname,
  scope,
  display_override: displayOverride,
  display,
  background_color: backgroundColor,
  theme_color: themeColor,
  name,
  short_name: shortName,
  description,
  icons
};

export async function GET() {
  return new Response(JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/manifest+json'
    }
  });
}
