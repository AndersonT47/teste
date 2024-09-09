import React from "react";
import Image from "next/image";
import CloseIcon from "@/assets/svg/close-icon-card.svg";
import { ButtonWrapper } from "./styles";
import { Tooltip } from "@mui/material";

interface ICifButton {
  children?: React.ReactChild;
  loading?: boolean;
  disabled?: boolean;
  style?: React.CSSProperties;
  clicked?: boolean;
  onClick?: () => void;
  onSubmit?: () => void;
}

const CifButton = ({ children, clicked, onClick }: ICifButton) => {
  return (
    <ButtonWrapper clicked={clicked} onClick={onClick}>
      {children}
      {clicked ? (
        <Tooltip arrow placement="top" title="Close">
          <Image src={CloseIcon} width={15} height={15} alt="Close" />
        </Tooltip>
      ) : null}
    </ButtonWrapper>
  );
};

export default CifButton;
