import Image from "next/image";
import { ReactNode } from "react";
import styled from "styled-components";
import CheckApproved from "@/assets/svg/check.svg";
import CheckPartial from "@/assets/svg/check-partial.svg";
import CheckRejected from "@/assets/svg/check-rejected.svg";

export interface IStatus {
  color: "Approved" | "Partial" | "Rejected";
}

const bgcolors = {
  Approved: "#E6F2EE",
  Partial: "#FAE9B5",
  Rejected: "#FBEAEA",
};

const txtcolors = {
  Approved: "#008056",
  Partial: "#AA8400",
  Rejected: "#CA303D",
};

export const ContainerWrapper = styled.div<IStatus>`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 6px 8px;
  gap: 4px;
  /* width: 118px; */
  height: 33px;
  background: ${(props) => bgcolors[props.color] || bgcolors.Approved};
  border-radius: 4px;
  flex: none;
  order: 0;
`;
export const Text = styled.text<IStatus>`
  font-family: "Figtree";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
  display: flex;
  align-items: center;
  letter-spacing: 0.12px;
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
  color: ${(props) => txtcolors[props.color] || txtcolors.Approved};
`;

interface StatusProps {
  children?: ReactNode;
  type: "Approved" | "partial" | "Rejected" | any;
}
const Result = ({ type, children }: StatusProps) => {
  const CheckIcon =
    (type === "Approved" && CheckApproved) ||
    (type === "Partial" && CheckPartial) ||
    (type === "Rejected" && CheckRejected);

  return (
    <ContainerWrapper color={type}>
      <Image src={CheckIcon} width={15} height={15} alt="Completed" />
      <Text color={type}>
        {children === "Partial" ? "Partially Approved" : children}
      </Text>
    </ContainerWrapper>
  );
};

export default Result;
