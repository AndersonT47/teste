import React from "react";
import Animation from "@/@core/components/Animation";
import animationLoading from "@/assets/animation/preloading.json";
import { ButtonWrapper } from "./styles";

interface IButton {
  children?: React.ReactChild;
  type?: "button" | "submit" | "reset" | undefined;
  loading?: boolean;
  disabled?: boolean;
  outline?: boolean;
  style?: React.CSSProperties;
  onClick?: () => void;
  onSubmit?: () => void;
}

const defaultOptions = {
  loop: false,
  autoplay: true,
  animationData: animationLoading,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const Button = ({
  type,
  children,
  disabled,
  loading,
  outline,
  style,
  onClick,
  onSubmit,
}: IButton) => {
  return (
    <ButtonWrapper
      type={type}
      onClick={onClick}
      onSubmit={onSubmit}
      disabled={disabled}
      outline={outline}
      style={{ ...style }}
    >
      {loading ?
        <>
          <Animation options={defaultOptions} width={24} height={24} />
        </>
        :
        children}
    </ButtonWrapper>
  )
};

export default Button;
