import axios, { AxiosResponse } from "axios";
import { useAuthStore } from "@/@core/store";
import { useMutation } from "@tanstack/react-query";
import { IAuthParams } from "./types";
import api from "@/@core/api";
import { saveObject } from "@/@core/utils/storege";
import { apiConstants, apiPathAddress } from "@/@core/api/apiAddress";

export function AuthProvider() {
  const { setIsAuth, setIsPasswordOrUsernameError, setUserData } = useAuthStore(
    (state) => state
  );

  const { mutateAsync, isLoading } = useMutation(
    async (props: IAuthParams) =>
      await api.post(
        `${apiPathAddress.userAuthentication}/${apiConstants.realm}/${apiConstants.profile}/authenticate`,
        props
      ),
    {
      onSuccess: (response: AxiosResponse) => {
        if (response.data.data.user.token) {
          setIsAuth(true);
          setUserData(response.data?.data?.user);
          saveObject("@conductor:token", response.data?.data?.user?.token);
          console.log("Login successful!", response);
        }
      },
      onError: (error) => {
        setIsPasswordOrUsernameError(true);
      },
    }
  );

  return {
    doLogin: mutateAsync,
    isLoading,
  };
}
