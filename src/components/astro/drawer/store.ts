import { atom } from 'nanostores';

export const $drawer = atom(false);

// $drawer.listen((x) => document.body.classList[x ? 'add' : 'remove']('app-drawer'));
