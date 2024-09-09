import api from "@/@core/api";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

interface CreateCaseResponse {
  code: number;
  data: {
    id: string;
    externalId: string;
    email: string;
    userName: string;
    userType: number;
    status: number;
    showModal: boolean;
    token: string;
  };
}

interface userModalData {
  userName: string;
  name: string;
  showModal: boolean;
}

export function UserProvider() {
  const { mutateAsync: userFeeApproveAllModal } = useMutation(
    ["userFeeApproveAllModal"],
    async (userModalData: userModalData) => {
      return await api.post("/user-management/v1/userupdate", userModalData);
    },
    {
      onSuccess: (result: AxiosResponse<CreateCaseResponse>) => {},
      onError: () => {},
    }
  );

  return {
    userFeeApproveAllModal,
  };
}
