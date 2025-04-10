import { persistentMap } from '@nanostores/persistent';

export const meta = persistentMap<Record<string, Meta>>(
  'app::meta::',
  {},
  {
    encode: JSON.stringify,
    decode: JSON.parse
  }
);
