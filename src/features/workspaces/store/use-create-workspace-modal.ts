
// the jotai makes the state functions global, i.e, accessible to all files
import { atom, createStore, useAtom } from 'jotai';

const modalAtom = atom(false);


export const useCreateWorkSpaceModal = () => {
  return useAtom(modalAtom);
};