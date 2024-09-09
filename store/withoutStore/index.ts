import { create } from "zustand";

export interface WithoutProps {
  withoutGlobal: boolean;
  setWithoutGlobal: (payload: boolean) => void;
}

export const useWithout = create<WithoutProps>((set) => ({
  withoutGlobal: false,
  setWithoutGlobal: (payload: boolean) => {
    set({ withoutGlobal: payload });
  },
}));
