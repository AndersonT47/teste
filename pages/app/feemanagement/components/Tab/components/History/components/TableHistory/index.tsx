import React from "react";
import StepItem from "./step";
import { ContainerWrapper } from "./styles";
import { useFeeManagementStore } from "@/@core/store/feeManagementStore";
import StepRejectIcon from "@/assets/svg/error-circle-color.svg";
import StepStopIcon from "@/assets/svg/error-circle-gray-small.svg";
import StepApproveIcon from "@/assets/svg/check-circle-color-small.svg";
import FlagIcon from "@/assets/svg/flag.svg";
import Result from "./result";
import capitalizeFirstLetter from "@/@core/utils/capitalizeFirstLetter";
import filterApproverResult from "@/@core/utils/filterResult";
import { someRejected, someApproved, somePartial } from "@/@core/utils/some";

interface ITableHistory {}

const TableHistory = ({}: ITableHistory) => {
  const { feeData } = useFeeManagementStore((state) => state);

  let stepNumber = 1;

  const equityTeam = feeData?.data?.equityTeam;
  const secopsTeam = feeData?.data?.secopsTeam;
  const order = ["PB AA", "PB AAS", "PB AAA", "ExCom AA"];
  const usersApprovers = feeData?.data?.usersApprovers.sort(
    (a, b) => order.indexOf(a.signature) - order.indexOf(b.signature)
  );

  const STATUS = feeData?.data?.status;

  const signature = feeData?.data?.signatureApprover;
  const approverType = feeData?.data?.levelApproverType;

  const statusUserApprover = filterApproverResult(usersApprovers);
  const statusEquityTeam = filterApproverResult(equityTeam);
  const statusSecopsTeam = filterApproverResult(secopsTeam);

  const StepUserApprovers =
    statusUserApprover?.length === 0
      ? FlagIcon
      : someRejected(usersApprovers)
      ? StepRejectIcon
      : StepApproveIcon;

  const StepEquityTeam =
    (someRejected(usersApprovers) && STATUS === "REJECTED") ||
    ((somePartial(usersApprovers) &&
      STATUS === "DONE" || STATUS === "PENDING_SECOPS") &&
      !someApproved(equityTeam))
      ? StepStopIcon
      : someRejected(equityTeam)
      ? StepRejectIcon
      : someApproved(equityTeam)
      ? StepApproveIcon
      : FlagIcon;

  const StepSecopsTeam =
    (someRejected(usersApprovers) && STATUS === "REJECTED") ||
    (somePartial(usersApprovers) &&
      STATUS === "DONE" &&
      !someApproved(secopsTeam)) ||
    (someRejected(equityTeam) && STATUS === "REJECTED")
      ? StepStopIcon
      : someRejected(secopsTeam)
      ? StepRejectIcon
      : someApproved(secopsTeam) && STATUS === "DONE"
      ? StepApproveIcon
      : FlagIcon;

  const allApproved =
    feeData?.data?.status === "DONE" || feeData?.data?.status === "REJECTED"
      ? StepApproveIcon
      : FlagIcon;

  const finishedApproved =
    feeData?.data?.status === "DONE" || feeData?.data?.status === "REJECTED";

  const ResultUserApprovers = capitalizeFirstLetter(
    statusUserApprover[0]?.result
  );
  const ResultEquityTeam = capitalizeFirstLetter(statusEquityTeam[0]?.result);
  const ResultSecopsTeam = capitalizeFirstLetter(statusSecopsTeam[0]?.result);

  return (
    <ContainerWrapper>
      <StepItem
        stepStatus={StepApproveIcon}
        stepTitle={`${stepNumber++}. Initiator`}
        userOwnerName={feeData?.data?.userOwnerName}
        signature={"-"}
        createdOn={feeData?.data?.createdAt}
        status="APPROVED"
        comments={feeData?.data?.reason}
      />
      {usersApprovers?.length === 0 ? null : statusUserApprover?.length ===
        0 ? (
        <StepItem
          stepStatus={StepUserApprovers}
          stepTitle={`${stepNumber++}. ${approverType} - ${signature} or Higher`}
          options={usersApprovers}
        />
      ) : (
        <StepItem
          stepStatus={StepUserApprovers}
          stepTitle={`${stepNumber++}. Bank Fee Exception - ${signature} or Higher`}
          userOwnerName={statusUserApprover[0]?.userNameFull}
          signature={statusUserApprover[0]?.signature}
          createdOn={statusUserApprover[0]?.updatedAt}
          resultcolumn={
            <Result type={ResultUserApprovers}>{ResultUserApprovers}</Result>
          }
          status={statusUserApprover[0]?.result}
        />
      )}

      {equityTeam?.length === 0 ? null : statusEquityTeam?.length === 0 ? (
        <StepItem
          stepStatus={StepEquityTeam}
          stepTitle={`${stepNumber++}. Equity and Commission Approval`}
          options={equityTeam}
        />
      ) : (
        <StepItem
          stepStatus={StepEquityTeam}
          stepTitle={`${stepNumber++}. Equity and Commission Approval`}
          userOwnerName={statusEquityTeam[0]?.userNameFull}
          signature={statusEquityTeam[0]?.signature || "-"}
          createdOn={statusEquityTeam[0]?.updatedAt}
          resultcolumn={
            <Result type={ResultEquityTeam}>{ResultEquityTeam}</Result>
          }
          status={statusEquityTeam[0]?.result}
        />
      )}

      {secopsTeam?.length === 0 ? null : statusSecopsTeam?.length === 0 ? (
        <StepItem
          stepStatus={StepSecopsTeam}
          stepTitle={`${stepNumber++}. Security Operations Updates`}
          options={secopsTeam}
        />
      ) : (
        <StepItem
          stepStatus={StepSecopsTeam}
          stepTitle={`${stepNumber++}. Security Operations Updates`}
          userOwnerName={statusSecopsTeam[0]?.userNameFull}
          signature={statusSecopsTeam[0]?.signature || "-"}
          resultcolumn={
            <Result type={ResultSecopsTeam}>{ResultSecopsTeam}</Result>
          }
          createdOn={statusSecopsTeam[0]?.updatedAt}
          status={statusSecopsTeam[0]?.result}
        />
      )}
      <StepItem
        stepStatus={allApproved}
        stepTitle={`${stepNumber++}. Account Officer Notified`}
        userOwnerName={feeData?.data?.userOwnerName}
        signature={"-"}
        createdOn={allApproved ? feeData?.data?.updatedAt : ""}
        status={finishedApproved ? "APPROVED" : "-"}
      />
    </ContainerWrapper>
  );
};

export default TableHistory;
