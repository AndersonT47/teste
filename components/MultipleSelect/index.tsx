import React, { useEffect, useRef, useState } from "react";
import { useOutsideClick } from "@/@core/hooks/useOutsideClick";
import { ExceptionOption } from "@/@core/store/feeManagementStore";
import Checkbox from "@/@core/components/CheckBox";
import {
  SelectContainer,
  SelectLabelButton,
  DropdownStyle,
  DropdownItem,
  ScrollFlow,
  Divider,
} from "./styles";

interface IMultipleSelect {
  onChange?: (value: any) => void | undefined;
  label?: string;
  options?: ExceptionOption[] | any;
  disabled?: boolean;
  onSelectAll?: () => void;
  height?: number;
}

const MultipleSelect = ({
  onChange,
  label,
  options,
  disabled,
  onSelectAll,
  height,
}: IMultipleSelect) => {
  const [currentValue, setCurrentValue] = useState<string[]>(
    options.map((item: ExceptionOption) => item.text)
  );
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);

  const handleOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const getSelectedAccountOfficers = localStorage.getItem(
      "accountOfficeSelected"
    );
    if (getSelectedAccountOfficers && getSelectedAccountOfficers.length > 0) {
      setCurrentValue(
        JSON.parse(getSelectedAccountOfficers).map(
          (item: ExceptionOption) => item
        )
      );
    } else if (options.length > 0) {
      setCurrentValue(options.map((item: ExceptionOption) => item.text));
    }
  }, [options]);

  const handleChange = (item: ExceptionOption) => {
    const selectedValues = [...currentValue];

    if (selectedValues.includes(item.text)) {
      const index = selectedValues.indexOf(item.text);
      selectedValues.splice(index, 1);
    } else {
      selectedValues.unshift(item.text);
    }
    setCurrentValue(selectedValues);
    onChange && onChange(selectedValues);
  };

  const handleSelectAll = () => {
    if (currentValue.length === options.length) {
      setCurrentValue([]);
      onChange && onChange([]);
    } else {
      const allValues = options.map((item: ExceptionOption) => item.text);
      setCurrentValue(allValues);
      onChange && onChange(allValues);
    }

    if (onSelectAll) onSelectAll();
  };

  const handleClickOutside = () => {
    setOpen(false);
  };

  useOutsideClick(ref, handleClickOutside);

  return (
    <SelectContainer>
      <SelectLabelButton
        ref={ref}
        onClick={handleOpen}
        disabled={disabled}
        height={height}
      >
        {currentValue.length > 0 ? currentValue.join(", ") : label}
      </SelectLabelButton>
      <DropdownStyle isVisible={open}>
        <ScrollFlow>
          {options?.map((item: ExceptionOption) => (
            <DropdownItem
              onClick={(e) => {
                handleChange(item);
                e.stopPropagation();
              }}
              active={currentValue.includes(item.text)}
              key={item?._id}
            >
              <Checkbox
                checked={currentValue.includes(item.text)}
                onChange={() => handleChange(item)}
                stopClickPropagation={true}
              />
              {item?.labelValue ?? item?.text}
            </DropdownItem>
          ))}
        </ScrollFlow>
        <Divider />
        <DropdownItem
          onClick={handleSelectAll}
          active={currentValue.length === options?.length}
        >
          <Checkbox
            checked={currentValue.length === options?.length}
            onChange={handleSelectAll}
            stopClickPropagation={true}
          />
          {currentValue.length !== options?.length
            ? "Select All"
            : "Unselect All"}
        </DropdownItem>
      </DropdownStyle>
    </SelectContainer>
  );
};

export default MultipleSelect;
