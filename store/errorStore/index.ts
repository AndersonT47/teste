import { create } from "zustand";

export interface errorData {
  errorGlobal: boolean;
  setErrorGlobal: (payload: boolean) => void;
}

export const useErrorStore = create<errorData>((set) => ({
  errorGlobal: false,
  setErrorGlobal: (payload: boolean) => {
    set({ errorGlobal: payload });
  },
}));
