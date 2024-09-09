import React, { ReactNode } from "react";
import Image from "next/image";
import Status from "@/@core/components/Status/status";
import { Divider, Text, StepTitleWrapper, StepGridItem } from "./styles";
import { formatData } from "@/@core/utils/format";

interface IUsers {
  id?: string;
  result?: string;
  comments?: string;
  userName?: string;
  signature?: string;
  createdAt?: string;
  updatedAt?: string;
  userNameFull?: string;
  resultcolumn?: string;
}
interface IStepItem {
  userOwnerName?: string;
  stepStatus?: any;
  stepTitle?: string;
  options?: IUsers[];
  status?: string;
  createdOn?: string;
  resultcolumn?: ReactNode;
  comments?: string;
  signature?: string;
}

const StepItem = ({
  stepStatus,
  stepTitle,
  options,
  status,
  userOwnerName,
  createdOn,
  resultcolumn,
  comments,
  signature,
}: IStepItem) => {
  return (
    <>
      <StepTitleWrapper>
        <Image src={stepStatus} width={18} height={18} alt={""} />
        <Text>{stepTitle}</Text>
      </StepTitleWrapper>
      <StepGridItem>
        <Text>Participant</Text>
        <Text>Signature</Text>
        <Text>Completed</Text>
        <Text>Status</Text>
        <Text>Result</Text>
        <Text>Comments</Text>
      </StepGridItem>
      <Divider />

      {userOwnerName && (
        <StepGridItem>
          <Text normal>{userOwnerName}</Text>
          <Text normal>{signature}</Text>
          <Text normal>{createdOn ? formatData(createdOn) : "-"}</Text>
          {status === "REJECTED" ||
          status === "PARTIAL" ||
          status === "APPROVED" ? (
            <Text normal>
              <Status />
            </Text>
          ) : (
            <Text normal>Active</Text>
          )}
          <Text normal>{resultcolumn}</Text>
          <Text normal>{comments ? comments : "-"}</Text>
        </StepGridItem>
      )}

      {options?.map((item: IUsers, index: number) => (
        <>
          <StepGridItem>
            <Text normal>{item?.userNameFull || "-"}</Text>
            <Text normal>{item?.signature || "-"}</Text>
            <Text normal>-</Text>
            <Text normal>
              {item.result &&
              ["REJECTED", "PARTIAL", "APPROVED"].includes(item.result) ? (
                <Status />
              ) : (
                "Active"
              )}
            </Text>
            <Text normal>{item?.resultcolumn || "-"}</Text>
            <Text normal>{item?.comments || "-"}</Text>
          </StepGridItem>
          {index !== options?.length - 1 && <Divider opacity />}
        </>
      ))}
    </>
  );
};

export default StepItem;
