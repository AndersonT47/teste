import { create } from "zustand";


export interface LoadingData {
    globalLoading: boolean,
    setGlobalLoading:(payload: boolean) => void;
}

export const useLoadingStore = create<LoadingData>((set) =>({
    globalLoading: false,
    setGlobalLoading: (payload: boolean) =>{
        set({ globalLoading: payload });
    }
}));