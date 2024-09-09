// @ts-nocheck
import React from "react";
import type { ColumnsType } from "antd/es/table";
import { StatusTable } from "./status";
import { TableWrapper } from "./styles";
import { TaskTable } from "./task";
import { CaseAttribute, DashboardRecord } from "@/@core/store";

interface DataType {
  reference: string;
  clientName: string;
  task: string;
  createdBy: string;
  accountOfficer: string;
  cif: string;
  currentActivity: string;
  status: "pending" | "completed";
  createdOn: string;
  submittedOn: string;
}

interface ITable {
  tableReference?: "MyGroupTasks" | "AllRequests" | "AdvancedSearch";
  dataSource?: any;
  handleRowPress: (event: React.MouseEvent, rowItem: string) => void;
}

const rowId = (rowItem) => rowItem?.caseAttribute?.find(
    (item: CaseAttribute) => item.name === "FEE_MANAGEMENT"
  )?.value;

const rowCif = (rowItem) => rowItem?.caseAttribute?.find(
  (item: CaseAttribute) => item.name === "CIF"
)?.value;

const renderLinkCell = (rowItem, value) => (
  <a href={`feemanagement/${rowCif(rowItem)}/${rowId(rowItem)}`} target="_self" rel="noopener noreferrer">
    {value}
  </a>
)

const columns: ColumnsType<any> = [
  {
    title: "Reference #",
    width: 100,
    key: "reference",
    fixed: "left",
    ellipsis: true,
    showSorterTooltip: true,
    render: (item: DashboardRecord) => renderLinkCell(item, item.caseAttribute.find((item) => item.name === "CASE_NUMBER")?.value)
  },
  {
    title: "CIF",
    width: 100,
    key: "cif",
    fixed: "left",
    ellipsis: true,
    render: (item: DashboardRecord) =>
    renderLinkCell(item, item.caseAttribute.find((item) => item.name === "CIF")?.value),
  },
  {
    title: "Client Name",
    key: "clientName",
    width: 180,
    ellipsis: true,
    render: (item: DashboardRecord) =>
      renderLinkCell(item, item.caseAttribute.find((item) => item.name === "CUSTOMER_NAME")?.value),
  },
  {
    title: "Task",
    key: "2",
    width: 200,
    ellipsis: true,
    render: (item) => renderLinkCell(item, <TaskTable task={item.application} />),
  },
  {
    title: "Current Activity",
    key: "3",
    width: 312,
    ellipsis: true,
    render: (item: DashboardRecord) => renderLinkCell(item, item.currentActivity),
  },
  {
    title: "Status",
    key: "status",
    width: 130,
    ellipsis: true,
    render: (item) => renderLinkCell(item, <StatusTable status={item.status} />),
  },
  {
    title: "Created By",
    key: "createdBy",
    width: 150,
    ellipsis: true,
    render: (item) => renderLinkCell(item, item.createdBy)
  },
  {
    title: "Account Officer",
    key: "accountOfficer",
    width: 200,
    ellipsis: true,
    render: (item: DashboardRecord) =>
      renderLinkCell(item, item.caseAttribute.find((item) => item.name === "ACCOUNT_OFFICER")?.value),
  },
  {
    title: "Created On",
    key: "createdOn",
    width: 200,
    ellipsis: true,
    render: (item) =>
      renderLinkCell(item, item.createdOn
        ? new Date(item.createdOn)
            .toLocaleString("en-US", {
              month: "numeric",
              day: "numeric",
              year: "numeric",
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })
            .replace(",", ",")
        : "-"),
  },
  {
    title: "Submitted On",
    key: "submittedOn",
    width: 200,
    ellipsis: true,
    render: (item) =>
      renderLinkCell(item, item.createdOn
        ? new Date(item.createdOn)
            .toLocaleString("en-US", {
              month: "numeric",
              day: "numeric",
              year: "numeric",
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })
            .replace(",", ",")
        : "-"),
  },
] as ColumnsType<DataType>;

export const Table: React.FC<ITable> = (props) => {
  const { handleRowPress } = props;

  return (
    <TableWrapper
      scroll={{ x: 100 }}
      dataSource={props.dataSource}
      pagination={false}
      columns={columns}
      onRow={(record) => {
        return {
          onClick: (e) => {
            const formedData = rowCif(record) + '/' + rowId(record)
            handleRowPress(e, formedData);
            e.preventDefault()
          },
        };
      }}

    />
  );
};
