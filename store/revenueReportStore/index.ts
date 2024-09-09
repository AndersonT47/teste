import { create } from "zustand";


export interface RevenueReportData {
    code: number;
    data: {
        revenueReport: string;
    };
}

interface RevenueReportStore {
    revenueReport: RevenueReportData;
    setRevenueReport: (revenueReport: RevenueReportData) => void;
}

export const useRevenueReportStore = create<RevenueReportStore>((set) => ({
    revenueReport: {} as RevenueReportData,
    setRevenueReport: (payload: RevenueReportData) => {
        set({ revenueReport: payload });
    },
}));