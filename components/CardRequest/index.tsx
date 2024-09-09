import React from "react";
import Image from "next/image";
import TouchableOpacity from "@/@core/components/TouchableOpacity";
import PlusRequestIcon from "@/assets/svg/plus-request-icon.svg"
import {
  CardWrapper, Text
} from "./styles";


interface ICardRequest {
  onClick: (index: number) => void;
  index: number;
}

const CardRequest = (props: ICardRequest) => {
  const { onClick, index } = props;
  return (
    <CardWrapper>
      <TouchableOpacity onClick={() => onClick(index)}>
        <Image src={PlusRequestIcon} width={48} height={48} alt="info" style={{}} />
      </TouchableOpacity>
      <Text>Request Exception</Text>
    </CardWrapper>
  )
};

export default CardRequest;
