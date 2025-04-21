// import pkg from 'package.json';

import app from '@app/configs/app';

export const prerender = true;

export async function GET() {
  return new Response(
    `
<?xml version="1.0" encoding="UTF-8" ?>
<browserconfig>
  <msapplication>
    <tile>
      <square70x70logo src="/favicon/mstile/70.png" />
      <square150x150logo src="/favicon/mstile/150.png" />
      <square310x310logo src="/favicon/mstile/310.png" />
      <wide310x150logo src="/favicon/mstile/310x150.png" />
      <TileImage src="/favicon/mstile/150.png" />
      <TileColor>${app.tileColor}</TileColor>
    </tile>
  </msapplication>
</browserconfig>
    `
      .replace(/\n/g, '')
      .replace(/\s{2,}/g, ' ')
      .replace(/> </g, '><')
      .trim(),
    {
      headers: {
        'Content-Type': 'application/xml'
      }
    }
  );
}
