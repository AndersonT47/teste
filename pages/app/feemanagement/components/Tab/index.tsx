import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Tooltip } from "@mui/material";
import NewResquest from "./components/newRequest";
import FeeSchedule from "./components/feeSchedule";
import Documents from "./components/Documents";
import InfoIcon from "@/assets/svg/info.svg";
import History from "./components/History";
import { STab, STabs, STabList, STabPanel, Button } from "./styles";
import { useFeeManagementStore } from "@/@core/store/feeManagementStore";
import ApproveRequest from "../ApproveRequest";
import CloseIcon from "@/assets/svg/close-icon-request.svg";
import { useNavigate } from "react-router-dom";
import { useWithout } from "@/@core/store/withoutStore";
import WantToExitModal from "./components/newRequest/components/WantToExitModal";
import { useRevenueReportStore } from "@/@core/store/revenueReportStore";
import RevenueReport from "./components/Revenue Report";
import { FeeManagenmetProvider } from "@/services/feeManagementProvider";
import { tabNavigation } from "@/@core/utils/tabNavigation";

interface ITabs {}

const Tabs = ({}: ITabs) => {
  const [activeTab, setActiveTab] = useState(0);
  const [activeTabAux, setActiveTabAux] = useState(0);
  const [modal, setModal] = useState(false);

  const {
    feeData: FeeObject,
    isAprovalFlowDone,
    setFeeData,
  } = useFeeManagementStore((state) => state);
  const { withoutGlobal, setWithoutGlobal } = useWithout((state) => state);

  const navigate = useNavigate();
  const { getRevenueReport } = FeeManagenmetProvider();
  const { revenueReport } = useRevenueReportStore((state) => state);

  useEffect(() => {
    window.onbeforeunload = function (event) {
      if (withoutGlobal) {
        event.preventDefault();
        event.returnValue = "";
        return "";
      }
    };
    window.onunload = function (event) {
      if (withoutGlobal) {
        event.preventDefault();
        return "";
      }
    };
  }, [withoutGlobal]);

  const handleCloseRequest = () => {
    if (withoutGlobal) {
      setModal(true);
    } else {
      navigate("/app/feemanagement/" + FeeObject.data.cif);
    }
  };

  const handleActiveTab = (tab: number) => {
    if (withoutGlobal) {
      setModal(true);
      setActiveTabAux(tab);
    } else {
      setActiveTab(tab);
      setActiveTabAux(tab);
    }
  };

  const handleApproveModal = () => {
    setModal(false);
    setWithoutGlobal(false);
    if (activeTabAux !== 0) {
      setActiveTab(activeTabAux);
    } else {
      navigate("/app/feemanagement/" + FeeObject?.data?.cif);
    }
  };

  useEffect(() => {
    if (FeeObject && FeeObject.data.caseNumber) {
      const editableFee = FeeObject;
      const index = editableFee.data.feesActives.findIndex(
        (item) => item.caseNumber == FeeObject.data.caseNumber
      );
      if (index < 0) {
        setFeeData(editableFee);
        return;
      }
      if (editableFee.data.canSeeRevenueReport) {
        getRevenueReport(editableFee.data.cif);
      }

      editableFee.data.feesActives[index].clicked = true;
      setFeeData(editableFee);
    }
  }, [FeeObject, getRevenueReport, setFeeData]);

  const Request = (
    <>
      Request: {FeeObject?.data?.caseNumber}
      <Tooltip arrow title="Close" placement="top">
        <Button onClick={() => handleCloseRequest()}>
          <Image src={CloseIcon} width={18} height={18} alt="Close" />
        </Button>
      </Tooltip>
    </>
  );

  return (
    <>
      <STabs
        selectedTabClassName="is-selected"
        selectedTabPanelClassName="is-selected"
        selectedIndex={activeTab}
        onSelect={(index) => handleActiveTab(index)}
      >
        <STabList>
          <STab>{FeeObject?.data?.caseId ? Request : "New Request"}</STab>
          <STab>
            Fee Schedule
            <Tooltip arrow title="Reference Only" placement="top">
              <Image
                src={InfoIcon}
                width={20}
                height={20}
                alt="info"
                style={{ marginLeft: 6 }}
              />
            </Tooltip>
          </STab>
          {FeeObject?.data?.canSeeRevenueReport && revenueReport?.data && (
            <STab>Revenue Report</STab>
          )}
          <STab>Documents</STab>
          {FeeObject.data?.caseId && <STab>History</STab>}
        </STabList>
        <STabPanel>
          {isAprovalFlowDone ? (
            <div
              style={{
                display: "flex",
                height: 400,
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center",
              }}
            >
              <ApproveRequest />
            </div>
          ) : (
            <NewResquest />
          )}
        </STabPanel>

        <STabPanel border>
          <FeeSchedule />
        </STabPanel>

        {FeeObject?.data?.canSeeRevenueReport && revenueReport?.data && (
          <STabPanel border>
            <RevenueReport url={revenueReport.data.revenueReport} />
          </STabPanel>
        )}

        <STabPanel border>
          <Documents />
        </STabPanel>

        {FeeObject.data?.caseId && (
          <STabPanel border>
            <History />
          </STabPanel>
        )}
      </STabs>

      <WantToExitModal
        open={modal}
        onClose={() => setModal(false)}
        onNavigate={() => handleApproveModal()}
      />
    </>
  );
};

export default Tabs;
