import React from "react";
import { Title } from "./styles";
import PaperDark from "@/@core/components/PaperDark";
import Timeline from "@/@core/components/Timeline";
import TableHistory from "./components/TableHistory";
import { useFeeManagementStore } from "@/@core/store/feeManagementStore";
import filterApproverResult from "@/@core/utils/filterResult";

export default function History() {
  const { feeData } = useFeeManagementStore((state) => state);

  const usersApprovers = feeData?.data?.usersApprovers;
  const equityTeam = feeData?.data?.equityTeam;
  const statusUserApprovers = filterApproverResult(usersApprovers) 
  const statusEquityApprovers = filterApproverResult(equityTeam)
  const status =
    feeData?.data?.status === "DONE" || feeData?.data?.status === "REJECTED"
      ? "Completed"
      : "Pending";

  return (
    <div>
      <Title>Approvals</Title>
      <div style={{ display: "flex", margin: "16px 0px 24px 0px" }}>
        <PaperDark title="Status" status={status} />
        <PaperDark
          title="Approver"
          status={statusUserApprovers[0]?.userNameFull || "-"}
          level={statusUserApprovers[0]?.signature || "-"}
          margin="0px 16px"
        />
        {equityTeam?.length > 0 ? (
          <PaperDark
            title="Equity and Commission Approver"
            status={statusEquityApprovers[0]?.userNameFull || "-"}
            level={statusEquityApprovers[0]?.signature || "-"}
          />
        ) : null}
      </div>
      <Title>Timeline</Title>
      <div style={{ display: "flex", margin: "16px 0px 24px 0px" }}>
        <Timeline />
      </div>
      {feeData?.data?.status !== 'INITIAL' && <TableHistory />}
    </div>
  );
}
