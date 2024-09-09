import React from "react";
import {
  Input, CheckboxWrapper, IconIndicator
} from "./styles";

interface ICheckbox {
  checked: boolean
  onChange: (event: any) => void
  stopClickPropagation?: boolean
  props?: any[]
  value?: string,
  name?: string,
  id?: string,
  label?: string,
  disabled?: boolean,
}

const Checkbox = ({
  value,
  checked,
  onChange,
  stopClickPropagation,
  name,
  id,
  label,
  disabled
}: ICheckbox) => {
  return (
    <CheckboxWrapper htmlFor={id} disabled={disabled} onClick={(e) => stopClickPropagation ? e.stopPropagation() : null}>
      {label}
      <Input
        id={id}
        type="checkbox"
        name={name}
        value={value}
        disabled={disabled}
        checked={checked}
        onChange={onChange}
      />
      <IconIndicator />
    </CheckboxWrapper>
  )
};

export default Checkbox;



