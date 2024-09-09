import React, { useEffect } from "react";
import Paper from "@/@core/components/Paper";
import Tabs from "./components/Tab";
import CifRequest from "./components/cifRequest";
import BankIcon from "@/assets/svg/bank-icon.svg";
import ClientIcon from "@/assets/svg/client-icon.svg";
import LocationIcon from "@/assets/svg/location-icon.svg";
import OfficerIcon from "@/assets/svg/officer-icon.svg";
import { MainContainer } from "./styles";
import { useFeeManagementStore } from "@/@core/store/feeManagementStore";
import Text from "@/@core/components/Text";
import Animation from "@/@core/components/Animation";
import animationData from "../../../assets/animation/bank-search.json";
import { CircularProgress } from "@mui/material";
import { useLoadingStore } from "@/@core/store/loadingStore";
import { useParams } from "react-router-dom";
import { FeeManagenmetProvider } from "@/services/feeManagementProvider";
import { useNavigate } from "react-router-dom";
import { useCustomerSearchStore } from "@/@core/store";
import { CIFProvider } from "@/services/cifProvider";
import { useRouter } from "next/router";

import GenericErrorMsgModal from "./components/GenericErrorMsgModal";
import { useErrorStore } from "@/@core/store/errorStore";
import { useDocumentStore } from "@/@core/store/documents";

const defaultOptions = {
  loop: false,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

export default function FeeManagement() {
  const { feeData, isAprovalFlowDone, setIsAprovalFlowDone } = useFeeManagementStore((state) => state);

  const { errorGlobal, setErrorGlobal } = useErrorStore((state) => state);

  const navigate = useNavigate();
  const { globalLoading } = useLoadingStore((state) => state);
  const { feeCaseNumber, customerCif } = useParams()
  const { getActiveFee, getFeeByCIF } = FeeManagenmetProvider();
  const { search, setSearch } = useCustomerSearchStore((state) => state);
  const { cifListSearch } = CIFProvider();
  const router = useRouter()
  const { setDocumentList } = useDocumentStore((state) => state);

  useEffect(() => {
    setDocumentList(feeData?.data?.documents || [])
    if (customerCif) {
      const baseRoute = '/app/feemanagement'
      const route = baseRoute + '/' + customerCif
      setIsAprovalFlowDone(false)
      if (!search || search === '') {
        setSearch(customerCif)
      }
      if (feeCaseNumber) {
        getActiveFee(feeCaseNumber).catch((error) => {
          if ([400, 404].includes(error.response?.status)) {
            navigate(route)
          }
        })
      } else {
        cifListSearch(customerCif).then((response) => {
          if (response.data.data.customers.length > 0) {
            getFeeByCIF(customerCif).catch((error) => {
              if ([400, 404].includes(error.response?.status)) {
                navigate(route)
              }
            })
          } else {
            router.replace(baseRoute)
          }
        })
      }
    }
  }, [feeCaseNumber, customerCif])

  if (globalLoading === false) {
    if (feeData?.data?.fees?.length > 0) {
      return (
        <MainContainer>
          <div
            style={{ paddingTop: 24, width: "100%", height: "100%" }}
            className="content-container"
          >
            <div style={{ display: "flex", marginBottom: 24 }}>
              <Paper
                title="CIF"
                width="20%"
                label={feeData.data.cif}
                icon={BankIcon}
                alt="Bank Acount"
              />
              <Paper
                title="Client Name"
                width="20%"
                label={feeData.data.customerName}
                icon={ClientIcon}
                alt="Bank Acount"
                margin="0px 16px"
              />
              <Paper
                title="Client Address"
                width="40%"
                label={feeData.data.customerAddress}
                icon={LocationIcon}
                alt="Bank Acount"
                margin="0px 16px 0px 0px"
              />
              <Paper
                title="Client Officer"
                width="20%"
                label={feeData.data.customerAccountOfficer}
                icon={OfficerIcon}
                alt="Bank Acount"
              />
            </div>
            {feeData?.data?.feesActives.length > 0 && !isAprovalFlowDone && (
              <div
                style={{
                  justifyContent: "center",
                  display: "flex",
                  margin: "0px 0px 24px 0px",
                }}
              >
                <CifRequest />
              </div>
            )}
            <div style={{ minHeight: "60vh" }}>
              <Tabs />
            </div>
          </div>
        </MainContainer>
      );
    } else {
      return (
        <div
          style={{
            display: "flex",
            height: "110vh",
            background: "#f7f7f8",
            alignItems: "center",
            justifyContent: "center",
            alignContent: "center",
            flexDirection: "column",
            textAlign: "center",
          }}
        >
          <>
            <Animation options={defaultOptions} width={250} height={200} />
            <div style={{ marginTop: 24 }}>
              <Text>Enter CIF or Short Name to get started.</Text>
            </div>

            <GenericErrorMsgModal
              open={errorGlobal}
              onClose={() => setErrorGlobal(false)}
            />
          </>
        </div>
      );
    }
  } else {
    return (
      <div
        style={{
          display: "flex",
          height: "110vh",
          background: "#f7f7f8",
          alignItems: "center",
          justifyContent: "center",
          alignContent: "center",
          flexDirection: "column",
          textAlign: "center",
        }}
      >
        <CircularProgress />
      </div>
    );
  }
}
