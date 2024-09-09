import React, { useState } from "react";
import Image from "next/image";
import Modal from "@mui/material/Modal";
import Button from "@/@core/components/Button";
import TextField from "@/@core/components/TextField";
import RadioButton from "@/@core/components/RadioButton";
import ScrollableSection from "@/@core/components/ScrollableSection";
import TouchableOpacity from "@/@core/components/TouchableOpacity";
import closeIcon from "@/assets/svg/close.svg";
import errorAlert from "@/assets/svg/error-alert.svg";
import {
  Container,
  Title,
  Div,
  Text,
  Divider,
  TextPadding,
  TextContainer,
  RadioContainer,
  ItemContainer,
  SelectContainer,
  SelectLabelButton,
  Exception,
  Change,
  ImageContainer,
  TextError,
} from "./styles";
import separateValues from "@/@core/utils/separator";
import { Tooltip } from "@mui/material";

export interface EquityAndCommission {
  value: string;
  text: string;
  visible: boolean;
  _id: string;
}

interface IResultException {
  result: string;
}
interface EquityModalInterface {
  options?: EquityAndCommission[];
  onSelect: (selected: EquityAndCommission) => void;
  selected?: EquityAndCommission;
  disableOther?: boolean;
  disabled?: boolean;
  value?: any;
  _id?: string;
  exception?: IResultException;
  defaultValue?: string;
  labelValue?: string;
  rejected?: boolean;
  height?: number;
  onError?: boolean;
  showException?: boolean;
}

export const SelectEquityOptionsModalModal: React.FC<EquityModalInterface> = ({
  options,
  onSelect,
  selected,
  disabled,
  disableOther,
  exception,
  defaultValue,
  labelValue,
  rejected,
  height,
  onError,
  showException,
}) => {
  const [open, setOpen] = React.useState(false);
  const [equity, setEquety] = useState<EquityAndCommission>();
  const [firstSelectEditEquity, setFirstSelectEditEquity] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleClear = () => {
    setOpen(false);
    setOtherText(labelValue);
  };
  const handleClick = (equityItem: EquityAndCommission | null) => {
    if (equityItem) {
      setEquety(equityItem);
      onSelect(equityItem);
      setFirstSelectEditEquity(false);
    }
  };

  const otherOption = options ? options[options.length - 1] : null;
  const [otherText, setOtherText] = React.useState(otherOption?.value);
  const handleChangeOtherText = (newText: string) => {
    setOtherText(newText);
    if (selected) {
      selected.value = newText;
    }
  };

  const getPreviewText = () => {
    if (disableOther && firstSelectEditEquity) {
      return "Select";
    }
    if (rejected) {
      return "Comission rejected by Equity Team.";
    }
    if (selected?.text !== "Other" && labelValue === "Other") {
      return (
        selected?.text ||
        `Other: ${otherText !== "" ? otherText : defaultValue}`
      );
    } else if (selected?.text === "Other" || labelValue === "Other") {
      return `Other: ${otherText !== "" ? otherText : defaultValue}`;
    }
    return selected?.text || labelValue;
  };

  const renderValueWithTooltip = () => {
    if (
      (selected?.text && selected?.text.length > 20) ||
      (labelValue && labelValue.length > 20) ||
      (getPreviewText() && getPreviewText()!.length > 20)
    ) {
      return (
        <Tooltip title={getPreviewText()} placement="top" arrow>
          <SelectLabelButton
            isDisabled={disabled}
            onClick={() => handleOpen()}
            rejected={rejected}
            height={height}
            showException={exception?.result ? true : false}
          >
            {getPreviewText()}
            {rejected ? null : exception?.result === "EXCEPTION" ? (
              <Exception>Exception</Exception>
            ) : exception?.result === "CHANGED" ? (
              <Change>Change</Change>
            ) : null}
          </SelectLabelButton>
        </Tooltip>
      );
    } else {
      return (
        <>
          <SelectLabelButton
            disabled={disabled}
            onClick={() => handleOpen()}
            rejected={rejected}
            height={height}
            onAlertError={onError}
            showException={exception?.result ? true : false}
          >
            {getPreviewText()}
            {onError && (
              <ImageContainer>
                <Image src={errorAlert} width={20} height={20} alt="close" />
              </ImageContainer>
            )}
            {rejected ? null : exception?.result === "EXCEPTION" ? (
              <Exception>Exception</Exception>
            ) : exception?.result === "CHANGED" ? (
              <Change>Change</Change>
            ) : null}
          </SelectLabelButton>
          {onError && <TextError>Please select a fee</TextError>}
        </>
      );
    }
  };

  return (
    <SelectContainer>
      {renderValueWithTooltip()}
      <Modal
        open={disabled ? false : open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Container>
          <Div>
            <Title>Select Equity and Options Commission</Title>
            <TouchableOpacity onClick={handleClose}>
              <Image src={closeIcon} width={20} height={20} alt="close" />
            </TouchableOpacity>
          </Div>
          <div style={{ paddingInline: 24 }}>
            <ScrollableSection>
              <div style={{ marginTop: 10, paddingRight: 15 }}>
                {options?.slice(0, options.length - 1).map((item) => (
                  <>
                    <ItemContainer>
                      <RadioContainer>
                        <RadioButton
                          checked={item?._id === equity?._id}
                          onClick={() => {
                            handleChangeOtherText("");
                            handleClick(item);
                          }}
                        />
                      </RadioContainer>
                      <TextContainer>
                        <TextPadding>
                          <Text>
                            <b>{item?.value}-Equity: </b>
                            {separateValues(item?.text)[0]}
                          </Text>
                        </TextPadding>
                        <TextPadding>
                          <Text>
                            <b>Option: </b>
                            {separateValues(item?.text)[1]}
                          </Text>
                        </TextPadding>
                      </TextContainer>
                    </ItemContainer>
                    <Divider />
                  </>
                ))}
                {!disableOther && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      margin: "15px 0px",
                    }}
                  >
                    <RadioButton
                      checked={selected?.text === "Other"}
                      onClick={() => {
                        handleClick(otherOption);
                        labelValue = selected?.text;
                      }}
                      label="Other"
                      disabled={disableOther}
                    />
                    <TextField
                      disabled={selected?.text !== "Other" || disableOther}
                      width="100%"
                      height="40px"
                      fontSize="15px"
                      value={otherText !== "" ? otherText : otherOption?.value}
                      onChange={(change) => {
                        handleChangeOtherText(change);
                        handleClick(selected || null);
                      }}
                      style={{ marginLeft: 10 }}
                    />
                  </div>
                )}
                {/*  */}
              </div>
            </ScrollableSection>
          </div>
          <div>
            <Divider end />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "15px 24px 15px 24px",
              }}
            >
              <TouchableOpacity
                style={{
                  color: "#1E2347",
                  width: "69px",
                  fontSize: "16px",
                  fontWeight: 600,
                }}
                onClick={handleClear}
              >
                Cancel
              </TouchableOpacity>
              <Button style={{ width: "69px" }} onClick={handleClose}>
                Save
              </Button>
            </div>
          </div>
        </Container>
      </Modal>
    </SelectContainer>
  );
};

export default SelectEquityOptionsModalModal;
