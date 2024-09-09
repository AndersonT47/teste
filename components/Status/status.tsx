import Image from "next/image";
import Text from "@/@core/components/Text";
import CheckIcon from "@/assets/svg/check.svg";

import { ContainerWrapper } from "./styles";

export interface IStatus { }

const Status = () => {
  return (
    <ContainerWrapper>
      <Image src={CheckIcon} width={15} height={15} alt="Completed" />
      <Text
        style={{
          fontFamily: "Figtree",
          fontStyle: "normal",
          fontWeight: 600,
          fontSize: 14,
          display: "flex",
          letterSpacing: 0.12,
          color: "#008056",
        }}
      >
        Completed
      </Text>
    </ContainerWrapper>
  );
};

export default Status;