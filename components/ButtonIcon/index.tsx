import React from "react";
import Image from "next/image";

import { ButtonWrapper } from "./styles";

interface IButtonIcon {
  children?: React.ReactChild;
  color?: string;
  type?: "button" | "submit" | "reset" | undefined;
  loading?: boolean;
  disabled?: boolean;
  style?: React.CSSProperties;
  onClick?: () => void;
  onSubmit?: () => void;
  icon: any;
  hoverColor?: string;
  activeColor?: string;
  softDisabled?: boolean;
}

const ButtonIcon = ({
  type,
  icon,
  children,
  disabled,
  color,
  onClick,
  hoverColor,
  activeColor,
  softDisabled,
}: IButtonIcon) => {
  return (
    <ButtonWrapper
      color={color}
      type={type}
      disabled={disabled}
      onClick={onClick}
      hoverColor={hoverColor}
      activeColor={activeColor}
      softDisabled={softDisabled}
    >
      <Image src={icon} width={24} height={24} alt="info" />
      {children}
    </ButtonWrapper>
  );
};

export default ButtonIcon;
