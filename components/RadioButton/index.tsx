import React from "react";
import { RadioButtonWrapper, Text } from "./styles";

interface IRadioButton {
  name?: string;
  value?: string;
  checked?: boolean;
  label?: string;
  disabled?: boolean;
  onClick?: () => void;
}

const RadioButton = ({
  name,
  value,
  checked,
  label,
  onClick,
  disabled,
}: IRadioButton) => {
  return (
    <RadioButtonWrapper>
      <input type="radio" name={name} value={value} checked={checked} onClick={onClick} disabled={disabled} />
      <Text>{label}</Text>
    </RadioButtonWrapper>
  )
};

export default RadioButton;
