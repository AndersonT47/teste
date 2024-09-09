import React, { useEffect, useState } from "react";
import Button from "@/@core/components/Button";
import Animation from "@/@core/components/Animation";
import animationData from "@/assets/animation/green-check-mark.json";
import { Text } from "./styles";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  FeeManagementData,
  useFeeManagementStore,
} from "@/@core/store/feeManagementStore";
import scrollToTop from "@/@core/utils/scroolToTop";

interface IApproveRequest {}

const ApproveRequest = ({}: IApproveRequest) => {
  const { customerCif } = useParams()
  const navigate = useNavigate();
  const location = useLocation();
  const {
    setIsAprovalFlowDone,
    setFeeData,
    setFeeApprovedData,
    setNewFeeRequest,
    newFeeRequestId,
    setNewFeeRequestId,
    setIsNewRequestFlow,
  } = useFeeManagementStore((state) => state);

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Animation options={defaultOptions} width={70} height={70} />
      <div style={{ display: "flex", margin: "4px 0px 24px 0px" }}>
        <Text>The request has been submitted.</Text>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "335px",
        }}
      >
        <Button
          outline
          style={{ width: "158px" }}
          onClick={() => {
            const route = `/app/feemanagement/${customerCif}/${newFeeRequestId}`
            if (location.pathname === route) {
              navigate(0);
            } else {
              navigate(route);
            }
            scrollToTop();
          }}
        >
          See Request
        </Button>
        <Button
          style={{ width: "158px" }}
          onClick={() => {
            setFeeData({} as FeeManagementData);
            setFeeApprovedData({} as FeeManagementData);
            setNewFeeRequest({} as FeeManagementData);
            setNewFeeRequestId("");
            setIsNewRequestFlow(false);
            setIsAprovalFlowDone(false);
            navigate("/app/dashboard");
            scrollToTop();
          }}
        >
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default ApproveRequest;
