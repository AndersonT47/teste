import { allDashboard } from "@/@core/api/swaggers/all";
import { create } from "zustand";

type IDropdownOptions = "pending" | "completed" | null;

interface CaseItem {
  name?: string;
  value?: string;
}

export interface CaseAttribute {
  name: string;
  value: string;
}

export interface DashboardRecord {
  currentActivity: string;
  status: number;
  createdBy: string;
  application: number;
  caseAttribute: CaseAttribute[];
  createdOn: string;
  editedAt: string | null;
  editedBy: string | null;
}

interface Data {
  record: DashboardRecord[];
}

export interface DashboardData {
  code: number;
  data: Data;
}

export interface IDashboardStore {
  myGroupTasksBadger: number;
  allRequestsBadger: number;
  createdOnDataPeriodFilter: string | undefined;
  taskDropdown: IDropdownOptions;
  statusAdvantageSearch: IDropdownOptions;
  shwoHeaderSearch: boolean;
  isTableRefreash: boolean;
  myGroupTasksData: DashboardData;
  tasksWithRequestData: DashboardData;
  allRequestsData: DashboardData;
  setMyGroupTasksBadger: (myGroupTasksBadger: number) => void;
  setAllRequestsBadger: (allRequestsBadger: number) => void;
  setCreatedOnDataPeriodFilter: (
    createdOnDataPeriodFilter: string | undefined
  ) => void;
  setTaskDropdown: (taskDropdown: IDropdownOptions) => void;
  setStatusAdvantageSearch: (statusAdvantageSearch: IDropdownOptions) => void;
  setShwoHeaderSearch: (shwoHeaderSearch: boolean) => void;
  setIsTableRefreash: (isTableRefreash: boolean) => void;
  setMyGroupTasksData: (myGroupTasksData: DashboardData) => void;
  setTasksWithRequestData: (tasksWithRequestData: DashboardData) => void;
  setAllRequestsData: (allRequestsData: DashboardData) => void;
}

export const useDashboardStore = create<IDashboardStore>((set) => ({
  myGroupTasksBadger: 0,
  allRequestsBadger: 0,
  createdOnDataPeriodFilter: "",
  taskDropdown: null,
  statusAdvantageSearch: null,
  shwoHeaderSearch: false,
  isTableRefreash: false,
  myGroupTasksData: {} as DashboardData,
  tasksWithRequestData: {} as DashboardData,
  allRequestsData: {} as DashboardData,
  advancedData: [],
  setMyGroupTasksBadger: (payload) => {
    set({ myGroupTasksBadger: payload });
  },
  setAllRequestsBadger: (payload) => {
    set({ allRequestsBadger: payload });
  },
  setCreatedOnDataPeriodFilter: (payload: any) => {
    set({ createdOnDataPeriodFilter: payload });
  },
  setTaskDropdown: (payload) => {
    set({ taskDropdown: payload });
  },
  setStatusAdvantageSearch: (payload) => {
    set({ statusAdvantageSearch: payload });
  },
  setShwoHeaderSearch: (payload) => {
    set({ shwoHeaderSearch: payload });
  },
  setIsTableRefreash: (payload) => {
    set({ isTableRefreash: payload });
  },
  setMyGroupTasksData: (payload: DashboardData) => {
    set({ myGroupTasksData: payload });
  },
  setTasksWithRequestData: (payload: DashboardData) => {
    set({ tasksWithRequestData: payload });
  },
  setAllRequestsData: (payload: DashboardData) => {
    set({ allRequestsData: payload });
  },
}));
