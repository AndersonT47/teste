import api from "@/@core/api";
import { useAuthStore, useCustomerSearchStore } from "@/@core/store";
import { useErrorStore } from "@/@core/store/errorStore";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

interface ICIFProviderParams {
  code: number;
  data: {
    cif: string;
    name: string;
    address: string;
    officer: string;
  };
}

export interface CIFCustomersList {
  cif: string;
  name: string;
  value: string;
}

export interface CIFListaSearch {
  code: number;
  data: {
    customers: CIFCustomersList[];
  };
}

export function CIFProvider() {
  const { cif, setCIFList } = useCustomerSearchStore((state) => state);
  const { userData } = useAuthStore();
  const { setErrorGlobal } = useErrorStore((state) => state);

  const { mutateAsync } = useMutation(
    ["searchCIFAddress"],
    async (payload: string) =>
      <AxiosResponse<ICIFProviderParams>>(
        await api.get(`/customer/v1/address/${cif}`)
      ),
    {
      onSuccess: (result) => {
        console.log("Successful!", result.data.data);
      },
      onError: (error) => {
        console.log("Not Found!", error);
        setErrorGlobal(true);
      },
    }
  );

  const { mutateAsync: CIFSearch } = useMutation(
    ["searchCIF"],
    async (payload: string) =>
      <AxiosResponse<ICIFProviderParams>>(
        await api.get(`/customer/v1/${payload}`)
      ),
    {
      onSuccess: (result) => {
        console.log("Successful!", result.data);
      },
      onError: (error) => {
        console.log("Not Found!", error);
        setErrorGlobal(true);
      },
    }
  );

  const { mutateAsync: userIdSearch } = useMutation(
    ["SearchUserId"],
    async (payload: string) =>
      <AxiosResponse<CIFListaSearch>>(
        await api.get(`/customer/v1/${payload}/${userData.userName}`)
      ),
    {
      onSuccess: (response) => {
        setCIFList(response.data.data.customers);
      },
      onError: (error) => {
        console.log("Not Found!", error);
        setErrorGlobal(true);
      },
    }
  );

  return {
    cifSearch: mutateAsync,
    searchFromCIF: CIFSearch,
    cifListSearch: userIdSearch,
  };
}
