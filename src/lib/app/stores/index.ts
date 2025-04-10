import { atom, map } from 'nanostores';

export const meta = map<Record<string, Meta>>({});

export const page = map<{
  url?: URL;
  request?: Request;
}>({});

export const referrer = atom<string>('--');
