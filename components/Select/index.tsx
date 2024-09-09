import React, { useEffect, useRef, useState } from "react";
import { useOutsideClick } from "@/@core/hooks/useOutsideClick";
import { ExceptionOption } from "@/@core/store/feeManagementStore";
import { Tooltip } from "@mui/material";
import {
  SelectContainer,
  SelectLabelButton,
  DropdownStyle,
  DropdownItem,
  Exception,
  Change,
  ScrollFlow,
} from "./styles";

interface IResultException {
  result: string;
}

interface ISelect {
  onChange?: (value: any, index: number) => void;
  value?: any;
  label?: string;
  options?: ExceptionOption[] | any;
  exception?: IResultException;
  disabled?: boolean;
  index?: number;
  height?: number;
  showException?: boolean;
}

const Select = ({
  onChange,
  value,
  label,
  options,
  exception,
  disabled,
  height,
  showException,
}: ISelect) => {
  const [currentValue, setCurrentValue] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLButtonElement | null>(null);
  const handleOpen = () => {
    setOpen(true);
  };
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const handleClose = () => {
    setOpen(false);
  };
  const handleValueChange = (newValue: React.SetStateAction<string>) => {
    if (value) {
      value = newValue;
      setCurrentValue(value);
    } else {
      setCurrentValue(newValue);
    }
  };

  useEffect(() => {
    if (focusedIndex !== null && options) {
      const currentItem = options[focusedIndex];
      if (currentItem) {
        setCurrentValue(currentItem.value);
      }
    }
  }, [focusedIndex, options]);

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLSpanElement>,
    index: number
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (index !== null) {
        handleChange(options[index], index);
      }
    }
  };

  const handleChange = (newValue: ExceptionOption, index: number) => {
    handleValueChange(newValue.value);
    handleClose();
    onChange && onChange(newValue, index);
  };

  const handleClickOutside = () => {
    setOpen(false);
  };

  const getTextToolTip = () => {
    return actualValue !== ""
      ? options.find((item: any) => item.value === actualValue).text
      : label;
  };

  useOutsideClick(ref, handleClickOutside);

  const actualValue = value ?? currentValue;

  const renderValueWithTooltip = () => {
    if (
      (actualValue && actualValue.length > 20) ||
      (label && label.length > 20)
    ) {
      return (
        <Tooltip title={getTextToolTip()} placement="top" arrow>
          <SelectLabelButton
            ref={ref}
            onClick={handleOpen}
            isDisabled={disabled}
            height={height}
            showException={exception?.result ? true : false}
          >
            {getTextToolTip()}
            {exception?.result === "EXCEPTION" ? (
              <Exception>Exception</Exception>
            ) : exception?.result === "CHANGED" ? (
              <Change>Change</Change>
            ) : null}
          </SelectLabelButton>
        </Tooltip>
      );
    } else {
      return (
        <SelectLabelButton
          ref={ref}
          onClick={handleOpen}
          isDisabled={disabled}
          height={height}
          showException={exception?.result ? true : false}
        >
          {actualValue !== "" && options.find((item: any) => item.value === actualValue)
            ? options.find((item: any) => item.value === actualValue).text
            : label}
          {exception?.result === "EXCEPTION" ? (
            <Exception>Exception</Exception>
          ) : exception?.result === "CHANGED" ? (
            <Change>Change</Change>
          ) : null}
        </SelectLabelButton>
      );
    }
  };

  return (
    <SelectContainer onClick={handleOpen}>
      {renderValueWithTooltip()}
      <DropdownStyle isVisible={disabled ? false : open}>
        <ScrollFlow>
          {options?.map((item: ExceptionOption, index: number) => (
            <DropdownItem
              onClick={() => handleChange(item, index)}
              active={item?.value === actualValue}
              key={item?._id}
              onKeyDown={(event) => handleKeyDown(event, index)}
              tabIndex={0}
              ref={index === focusedIndex ? ref : null}
            >
              {item?.labelValue ?? item?.text}
            </DropdownItem>
          ))}
        </ScrollFlow>
      </DropdownStyle>
    </SelectContainer>
  );
};

export default Select;
