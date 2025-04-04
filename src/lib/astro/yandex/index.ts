export type YandexMapGeo = {
  state: Record<string, unknown>;
  options: Record<string, unknown>;
  locations: Record<string, unknown>[];
};

export type YandexMapInstance = Record<string, (...x: unknown[]) => unknown> &
  Record<string, Record<string, (...x: unknown[]) => Record<string, (...x: unknown[]) => unknown>>>;

export type Ymaps = {
  ready?: (...x: unknown[]) => unknown;
  Map: new (...x: unknown[]) => YandexMapInstance;
  Placemark: new (...x: unknown[]) => unknown;
} & Record<string, (...x: unknown[]) => unknown>;

export type Ym = (...x: unknown[]) => void;

export { default as YandexMap } from './YandexMap.astro';
export { default as YandexMetrika } from './YandexMetrika.astro';
