export type Custom = {
  button: ClassValue;
  progress: ClassValue;
  item: ClassValue;
  inner: Record<string, ClassValue>;
};

export type Easing = (x: number) => number;

export type Tweening = (x?: number) => {
  duration: number;
  delay: number;
  easing: Easing;
};

export type Show = number | ((x: number) => number);

export type Controls = string | string[];

export type Loaded = ((x?: Event | HTMLElement) => void) | undefined;
