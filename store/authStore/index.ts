import { create } from "zustand";
import Cookies from "js-cookie";

const getInitialAuthState = () => {
  const storedAuthState = Cookies.get("isAuth");
  return storedAuthState ? JSON.parse(storedAuthState) : false;
};

const saveAuthStateToCookie = (isAuth: boolean) => {
  Cookies.set("isAuth", JSON.stringify(isAuth), { expires: 7 });
};

interface IUser {
  email?: string;
  externalId?: number | string;
  id?: string;
  status?: number;
  userName?: string;
  userType?: number;
  token?: string;
  showModal?: boolean;
}

const getInitialUserData = () => {
  const storedAuthState = Cookies.get("userData");
  return storedAuthState ? JSON.parse(storedAuthState) : false;
};

const saveUserDataToCookie = (userData: IUser) => {
  Cookies.set("userData", JSON.stringify(userData), { expires: 7 });
};

export interface IAuthStore {
  isAuth: boolean;
  setIsAuth: (isAuth: boolean) => void;
  userData: IUser;
  setUserData: (userData: IUser) => void;
  isPasswordOrUsernameError: boolean;
  setIsPasswordOrUsernameError: (error: boolean) => void;
}

export const useAuthStore = create<IAuthStore>((set) => ({
  isAuth: getInitialAuthState(),
  setIsAuth: (isAuthParam) => {
    set({ isAuth: isAuthParam });
    saveAuthStateToCookie(isAuthParam);
  },
  userData: getInitialUserData(),
  setUserData: (userDataPayload: IUser) => {
    set({ userData: userDataPayload });
    saveUserDataToCookie(userDataPayload);
  },
  isPasswordOrUsernameError: false,
  setIsPasswordOrUsernameError: (error: boolean) => {
    set(() => ({ isPasswordOrUsernameError: error }));
  },
}));
