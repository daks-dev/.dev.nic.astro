export const prerender = true;

import pkg from 'package.json';
const { version } = pkg;

import app from '@app/configs/app';

const canonical = import.meta.env.PUBLIC_APP_CANONICAL
  ? new URL(import.meta.env.PUBLIC_APP_CANONICAL).origin
  : '';

const data = {
  version,
  api_version: 1,
  layout: {
    logo: `${canonical}/favicon/tableau/60.png`, //encodeURIComponent()
    color: app.tileColor,
    show_title: true
  }
};

export async function GET() {
  return new Response(JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
