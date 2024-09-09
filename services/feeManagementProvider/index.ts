import api from "@/@core/api";
import { apiPathAddress } from "@/@core/api/apiAddress";
import { useAuthStore, useCustomerSearchStore } from "@/@core/store";
import { DocumentLinkData } from "@/@core/store/documents";
import { useErrorStore } from "@/@core/store/errorStore";
import {
  FeeManagementData,
  FeeManagementDataUpdate,
  useFeeManagementStore,
} from "@/@core/store/feeManagementStore";
import { useLoadingStore } from "@/@core/store/loadingStore";
import {
  RevenueReportData,
  useRevenueReportStore,
} from "@/@core/store/revenueReportStore";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useState } from "react";

interface CaseAttributes {
  name: string;
  value: string;
}

interface Data {
  conductorId: string;
  caseId: string;
  caseNumber: string;
  userOwner: string;
  feeManagementId: string;
  cif: string;
  caseAttributes: CaseAttributes[];
}

interface CreateCaseResponse {
  code: number;
  data: Data;
}

export function FeeManagenmetProvider() {
  const { cif } = useCustomerSearchStore((state) => state);
  const {
    setFeeData,
    newFeeRequest,
    feeApprovedData,
    newFeeRequestId,
    setNewFeeRequestId,
    rejectGroup,
    setRejectGroup,
  } = useFeeManagementStore((state) => state);
  const { userData } = useAuthStore((state) => state);
  const { setGlobalLoading } = useLoadingStore((state) => state);
  const { setErrorGlobal } = useErrorStore((state) => state);
  const { setRevenueReport } = useRevenueReportStore((state) => state);

  const { mutateAsync: getFeeByCIF, isLoading: getFeeIsLoading } = useMutation(
    ["getFeesByCIF"],
    async (customerCif: string) => {
      setGlobalLoading(true);
      return await api.get(`${apiPathAddress.feeManagement}/${customerCif}`);
    },
    {
      onSuccess: (response: AxiosResponse<FeeManagementData>) => {
        response.data.data.fees.map((fees) => {
          return fees.feeGroups.map((feeGroups) => {
            return feeGroups.fields.map((fields) => {
              return (fields.defaultLabelValue = fields.labelValue);
            });
          });
        });
        setFeeData(response.data);
        setGlobalLoading(false);
      },
      onError(error, variables, context) {
        console.log("Error on get feedata", error, variables, context);
        setGlobalLoading(false);
        setErrorGlobal(true);
      },
    }
  );

  const {
    mutateAsync: getCurrentFeesByCIF,
    isLoading: getCurrentFeesIsLoading,
  } = useMutation(
    ["getCurrentFeesByCIF"],
    async (cif: string) => {
      return await api.get(
        `${apiPathAddress.conductorCustomer}/${cif}/fees/current`
      );
    },
    {
      onSuccess: (response: AxiosResponse) => {
        return response;
      },
      onError(error, variables, context) {},
    }
  );

  const { mutateAsync: newFeeCase, isLoading: newFeeCaseLoading } = useMutation(
    ["newFeeRequest"],
    async (newFeeCaseRequest: FeeManagementData) => {
      setGlobalLoading(true);
      return await api.post("/v1/conductor/fee/case", newFeeCaseRequest);
    },
    {
      onSuccess: (result: AxiosResponse<CreateCaseResponse>) => {
        setNewFeeRequestId(result.data.data.feeManagementId);
        console.log(result.status);
        setGlobalLoading(false);
      },
      onError: () => {
        console.log(newFeeRequest);
        setGlobalLoading(false);
      },
    }
  );

  const {
    mutateAsync: getActiveFee,
    isLoading: getActiveFeeLoading,
    isSuccess: getActiveFeeSuccess,
  } = useMutation(
    ["getActiveFee"],
    async (feedId: string) => {
      setGlobalLoading(true);
      return await api.get(`/v1/fee/case/${feedId}/${userData.userName}`);
    },
    {
      onSuccess: (response: AxiosResponse<FeeManagementData>) => {
        setFeeData(response.data);
        setGlobalLoading(false);
      },
      onError: (error) => {
        console.log(error);
        setGlobalLoading(false);
      },
    }
  );

  const { mutateAsync: viewActiveFee, isLoading: getViewActiveFeeLoading } =
    useMutation(
      ["getViewActiveFee"],
      async () => {
        setGlobalLoading(true);
        return await api.get(
          `/v1/fee/case/${newFeeRequestId}/${userData.userName}`
        );
      },
      {
        onSuccess: (response: AxiosResponse<FeeManagementData>) => {
          setFeeData(response.data);
          setGlobalLoading(false);
        },
        onError: (error) => {
          console.log(error);
          setGlobalLoading(false);
        },
      }
    );

  const { mutateAsync: updateFeeCase, isLoading: updateFeeCaseLoading } =
    useMutation(
      ["putUpdateFeeCaseFee"],
      async (updateFeeCase: FeeManagementDataUpdate) => {
        setGlobalLoading(true);
        return await api.put(`/v1/fee/case`, updateFeeCase);
      },
      {
        onSuccess: (response: AxiosResponse<FeeManagementData>) => {
          console.log(response);
          setGlobalLoading(false);
        },
        onError: (error) => {
          console.log(error);
          setGlobalLoading(false);
        },
      }
    );

  const { mutateAsync: getRevenueReport } = useMutation(
    ["getRevenueReport"],
    async (cif: string) => {
      return await api.get(`customer/v1/${cif}/revenue`);
    },
    {
      onSuccess: (response: AxiosResponse<RevenueReportData>) => {
        setRevenueReport(response.data);
      },
      onError: (error) => {},
    }
  );

  const { mutateAsync: getFeeDocumentLink } = useMutation(
    ["getFeeDocumentLink"],
    async (documentName: string) => {
      return await api.get(`/v1/file/feeMangementTemp/${documentName}`);
    },
    {
      onSuccess: (response: AxiosResponse<DocumentLinkData>) => {},
      onError: (error) => {},
    }
  );

  return {
    getFeeByCIF, // Buscar Fee por CIF
    newFeeCase, // Criar novo fee
    getActiveFee, // Buscar Active Fee
    updateFeeCase,
    viewActiveFee,
    getCurrentFeesByCIF,
    rejectGroup,
    setRejectGroup,
    getCurrentFeesIsLoading,
    getFeeIsLoading, // Loading do carregamento do fee
    getActiveFeeLoading, // Loading da busca do active Fee
    newFeeCaseLoading, // Loading da criação do fee
    updateFeeCaseLoading,
    getViewActiveFeeLoading,
    getActiveFeeSuccess,
    getRevenueReport,
    getFeeDocumentLink,
  };
}
