import api from "@/@core/api";
import { useAuthStore } from "@/@core/store";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { clear } from "@/@core/utils/storege";

interface impersonateAttributes {
  userName: string;
  userNameImpersonate: string;
}

interface Data {
  message: string;
}

interface CreateCaseResponse {
  code: number;
  data: Data;
}

export function ImpersonateProvider() {
  const { userData, setIsAuth } = useAuthStore((state) => state);

  const { mutateAsync: newImpersonate, isLoading: newImpersonateLoading } = useMutation(
    ["newImpersonate"],
    async (newImpersonateRequest: impersonateAttributes) =>
      <AxiosResponse<CreateCaseResponse>>(
        await api.post("/user-management/v1/impersonate", newImpersonateRequest)
      ),
    {
      onSuccess: () => {
        clear("@conductor:token")
        setIsAuth(false)
      },
      onError: (e) => {
        console.log(e);
      },
    }
  );

  return {
    newImpersonate,
    newImpersonateLoading
  };
}
