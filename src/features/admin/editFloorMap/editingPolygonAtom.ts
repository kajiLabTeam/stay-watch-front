// atoms.ts
import { atom } from 'recoil';

const editingPolygonAtom = atom({
  key: 'editingPolygon',
  default: [
    [0, 0],
    [1, 1],
  ],
});







