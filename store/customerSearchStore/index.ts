
import { CIFCustomersList } from "@/services/cifProvider";
import { create } from "zustand";

interface ICIFError {
  statusCode: number;
  description: string;
}

interface CustomerInfo {
  cif: string;
  name: string;
  address: string;
  officer: string;
}

interface AccountOffice {
  userName?: string;
  userId?: string;
  text?: string;
  value?: string;
  isPartOfGroup?: number;
}

export interface CustomerUserGroup {
  code: number;
  data: {
    userGroup: AccountOffice[]
  };
}

interface ICustomerSearch {
  cif: string;
  search: string;
  userCIFData: CustomerInfo;
  isCifError: ICIFError;
  cifList: CIFCustomersList[];
  accountOfficers: AccountOffice[];
  setCIFList: (cifList: CIFCustomersList[]) => void;
  setCif: (setCif: string) => void;
  setSearch: (setSearch: string) => void;
  setUserData: (setUserCIFData: CustomerInfo) => void;
  setisCifError: (error: ICIFError) => void;
  setAccountOfficers: (accountOfficers: AccountOffice[]) => void;
}

export const useCustomerSearchStore = create<ICustomerSearch>((set) => ({
  cif: "",
  setCif: (payload: string) => {
    set({ cif: payload });
  },
  cifList: [],
  setCIFList: (payload: CIFCustomersList[]) => {
    set({ cifList: payload });
  },
  search: "",
  setSearch: (payload: string) => {
    set({ search: payload });
  },
  userCIFData: {} as CustomerInfo,
  setUserData: (payload: CustomerInfo) => {
    set({ userCIFData: payload });
  },
  isCifError: {} as ICIFError,
  setisCifError: (isCifParams) => set(() => ({ isCifError: isCifParams })),
  accountOfficers: [],
  setAccountOfficers: (payload: AccountOffice[]) => {
    set({ accountOfficers: payload });
  },

}));
