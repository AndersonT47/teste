import Image from "next/image";
import HourglassIcon from "../../../assets/svg/hourgless.svg";
import CheckIcon from "../../../assets/svg/check.svg";
import { ContainerWrapper, TextStatus, IconWrapper } from "./styles";

export interface IStatusTableProps {
  status: number;
}

export const StatusTable = (props: IStatusTableProps) => {
  const { status } = props;
  if (status === 1) {
    return (
      <ContainerWrapper>
        <IconWrapper>
          <Image src={HourglassIcon} width={16} height={16} alt="Pedding" />
        </IconWrapper>
        <TextStatus>Pending</TextStatus>
      </ContainerWrapper>
    );
  } else {
    return (
      <ContainerWrapper completed>
        <IconWrapper>
          <Image src={CheckIcon} width={16} height={16} alt="Complete" />
        </IconWrapper>
        <TextStatus completed>Completed</TextStatus>
      </ContainerWrapper>
    );
  }
};
