import React, { useState } from "react";
import Image from "next/image";
import { Tooltip } from "@mui/material";
import Select from "@/@core/components/Select";
import TextField from "@/@core/components/TextField";
import ButtonIcon from "@/@core/components/ButtonIcon";
import TouchableOpacity from "@/@core/components/TouchableOpacity";
import InfoIcon from "@/assets/svg/info.svg";
import Info2Icon from "@/assets/svg/info2.svg";
import CloseCardIcon from "@/assets/svg/close-icon-card.svg";
import CheckCardIcon from "@/assets/svg/check-icon-card.svg";
import ErrorCircleIcon from "@/assets/svg/error-circle-color.svg";
import CheckCircleIcon from "@/assets/svg/check-circle-color.svg";
import NoteIcon from "@/assets/svg/note.svg";
import ButtonSecondary from "@/assets/svg/button-secondary.svg";
import CloseCircleIcon from "@/assets/svg/close-circle-dark.svg";
import {
  CardWrapper,
  CardTitle,
  CardText,
  InputDiv,
  TextNote,
  Divider,
  Div,
} from "./styles";
import { FeeField } from "@/@core/store/feeManagementStore";
import SelectEquityOptionsModalModal, {
  EquityAndCommission,
} from "@/@core/components/SelectEquityOptionsModal";
import { exceptionValidation } from "@/@core/utils/exceptionValidation";
import { exceptionValidationLabel } from "@/@core/utils/exceptionValidationLabel";
import NoteCard from "../Note";

interface ICard {
  options: any;
  type: "primary" | "secondary" | "success" | "error" | undefined;
  note?: boolean;
  noteKYC?: any;
  noteDDA?: any;
  margin?: number | string;
  exception?: boolean;
  onCancel?: () => void;
  onApprove?: boolean;
  requestApprove?: boolean;
  editEquity?: boolean;
  approvalResults?: any;
  isModal?: boolean;
  disabled?: boolean;
  onChange: (payload: any, index: number) => void;
  showRejectNote?: boolean;
  onPressAprove: (options: any, index: number) => void;
  onRejectPress: (options: any, index: number) => void;
  index: number;
  defaultValue: any;
  onCaseId?: boolean;
  clientValue?: any;
  onEdit?: () => void;
  onSelectedEquity?: (selected: boolean) => void;
  selectedEquity?: boolean;
}

interface ITypes {
  primary: string;
  secondary: string;
}

interface ExceptionsOptions {
  value: string;
  text: string;
  visible: boolean;
  _id: string;
}

interface CurrentValues {
  [index: number]: {
    currentValue: string;
  };
}

const Card = ({
  options,
  disabled,
  type,
  noteKYC,
  noteDDA,
  margin,
  exception,
  onCancel,
  onApprove,
  requestApprove,
  editEquity,
  approvalResults,
  isModal,
  showRejectNote,
  onChange,
  onEdit,
  onPressAprove,
  onRejectPress,
  index,
  defaultValue,
  onCaseId,
  clientValue,
  onSelectedEquity,
  selectedEquity,
}: ICard) => {
  const fees: ITypes = {
    primary: "Standard Fees",
    secondary: "Client Current Fees",
  };

  const title: string =
    type === "primary"
      ? fees.primary
      : type === "secondary"
      ? fees.secondary
      : "Exception Request";

  const [modalSelected, setModalSelected] = useState<EquityAndCommission>();
  const [currentValue, setCurrentValue] = useState<CurrentValues>([]);
  const [firstSelectEditEquity, setFirstSelectEditEquity] = useState(true);

  const disabledRejectButton =
    options.slice(-1)[0]?.approved === true ? true : false;

  const disabledApprovedButton =
    options.slice(-1)[0]?.reject === true ? true : false;

  const checkDisabled = (name: string, labelValue: string) => {
    if (name === "Hold mail" && labelValue === "NOT APPLICABLE") {
      return true;
    }
    return false;
  };

  return (
    <CardWrapper margin={margin} type={type}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <CardTitle>{title}</CardTitle>
          {type === "primary" && (
            <Tooltip
              arrow
              title="Please refer to the tab: Fee Schedule - Reference Only"
              placement="top"
            >
              <Image
                src={InfoIcon}
                width={20}
                height={20}
                alt="info"
                style={{ marginLeft: 6 }}
              />
            </Tooltip>
          )}
        </div>
        <div>
          {!onCaseId && title === "Exception Request" && (
            <TouchableOpacity onClick={onCancel}>
              <Image src={CloseCircleIcon} width={22} height={22} alt="Close" />
            </TouchableOpacity>
          )}
        </div>
      </div>

      {options?.map((item: FeeField, index: number) => {
        if (editEquity && item?.name !== "Equity and Options Commission") {
          return;
        }
        return (
          <div key={item?.id} style={{ width: "100%" }}>
            <InputDiv>
              <CardText>{item?.name}</CardText>
              {item?.tooltip?.length !== 0
                ? type === "primary" && (
                    <Tooltip arrow title={item?.tooltip} placement="top">
                      <Image
                        src={Info2Icon}
                        width={20}
                        height={20}
                        alt="info"
                        style={{ marginLeft: 6 }}
                      />
                    </Tooltip>
                  )
                : null}
            </InputDiv>
            {type != "primary" && type != "secondary" ? (
              <div style={{ display: "flex" }}>
                {item?.name === "Equity and Options Commission" ? (
                  <div style={{ width: "100%" }}>
                    {editEquity && (
                      <>
                        <Select
                          label={`Other: ${
                            item.exceptionOptions[
                              item.exceptionOptions.length - 1
                            ].value
                          }`}
                          index={index}
                          options={[
                            item.exceptionOptions[
                              item.exceptionOptions.length - 1
                            ],
                          ]}
                          disabled={true}
                          exception={exceptionValidation(
                            defaultValue[index]?.labelValue,
                            clientValue[index]?.labelValue,
                            currentValue[index]?.currentValue ?? item.labelValue
                          )}
                        />
                        <div style={{ marginTop: "16px" }}>
                          <CardText>
                            Select Equity and Options Commision to approve
                          </CardText>
                        </div>
                      </>
                    )}
                    <SelectEquityOptionsModalModal
                      exception={
                        !editEquity
                          ? exceptionValidation(
                              defaultValue[index]?.labelValue,
                              clientValue[index]?.labelValue,
                              modalSelected?.text ?? item?.labelValue
                            )
                          : { result: "" }
                      }
                      onSelect={(selected: EquityAndCommission) => {
                        item.labelValue = selected?.text;
                        setModalSelected(selected);
                        onChange(selected, index);
                        setFirstSelectEditEquity(false);
                        onSelectedEquity?.(true);
                      }}
                      selected={modalSelected}
                      onError={selectedEquity}
                      options={item?.exceptionOptions}
                      defaultValue={item?.defaultValue}
                      labelValue={item?.labelValue}
                      disabled={disabled && !editEquity}
                      disableOther={editEquity}
                      rejected={approvalResults?.length > 1 && item.reject}
                    />
                  </div>
                ) : (
                  <Select
                    label={item.labelValue ?? item.defaultValue}
                    value={item.defaultValue}
                    exception={exceptionValidation(
                      defaultValue[index]?.labelValue,
                      clientValue[index]?.labelValue,
                      currentValue[index]?.currentValue ?? item.labelValue
                    )}
                    options={item?.exceptionOptions.sort(
                      (itemA, itemB) =>
                        parseFloat(itemA.value) - parseFloat(itemB.value)
                    )}
                    index={index}
                    onChange={(e) => {
                      onChange(e, index);
                      setCurrentValue({
                        ...currentValue,
                        [index]: {
                          currentValue: e.text,
                        },
                      });
                    }}
                    disabled={
                      disabled || checkDisabled(item.name, item.labelValue)
                    }
                  />
                )}
              </div>
            ) : (
              <>
                {title === "Client Current Fees" ? (
                  <TextField
                    value={item.labelValue ?? item?.defaultValue}
                    onChange={() => {}}
                    disabled
                    exception={exceptionValidationLabel(
                      defaultValue[index]?.labelValue,
                      item.labelValue
                    )}
                  />
                ) : (
                  <TextField
                    value={item.labelValue ?? item?.defaultValue}
                    onChange={() => {}}
                    disabled
                  />
                )}
              </>
            )}
          </div>
        );
      })}

      {noteKYC && type === "primary" && noteKYC.length > 0 ? (
        <Div>
          <CardText>KYC Mailing Status:</CardText>
          <CardText style={{ marginLeft: 6 }}>
            <b>{noteKYC}</b>
          </CardText>
          <Tooltip
            arrow
            title="Mailing Status update must follow the regular Operations procedure"
            placement="top"
          >
            <Image
              src={InfoIcon}
              width={20}
              height={20}
              alt="info"
              style={{ marginLeft: 5 }}
            />
          </Tooltip>
        </Div>
      ) : null}

      {noteDDA && (
        <Div>
          <CardText>Charges will be assessed to the DDA#:</CardText>
          <CardText style={{ marginLeft: 6 }}>
            <b>{noteDDA}</b>
          </CardText>
          <Tooltip
            arrow
            title="Customer fees are assessed to the main active DDA at the time of charge."
            placement="top"
          >
            <Image
              src={InfoIcon}
              width={20}
              height={20}
              alt="info"
              style={{ marginLeft: 5 }}
            />
          </Tooltip>
        </Div>
      )}

      {!editEquity &&
        approvalResults?.map((approver: any) => {
          return approver.approved ? (
            <div style={{ width: "100%" }}>
              <Divider color="#73B9A1" />
              <div style={{ display: "flex" }}>
                <Image
                  src={CheckCircleIcon}
                  width={21}
                  height={21}
                  alt="info"
                  style={{ marginRight: 8 }}
                />
                <div style={{ flex: 1, flexWrap: "wrap" }}>
                  <TextNote>{approver.message}</TextNote>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ width: "100%" }}>
              <Divider color="#F0BABB" />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                  }}
                >
                  <Image
                    src={ErrorCircleIcon}
                    width={21}
                    height={21}
                    alt="info"
                    style={{ marginRight: 8 }}
                  />
                  <div style={{ flex: 1, flexWrap: "wrap" }}>
                    <TextNote>{approver.message}</TextNote>
                  </div>
                </div>
                <TouchableOpacity>
                  <NoteCard
                    arrow="left"
                    label="Note"
                    width={78}
                    height={36}
                    onEdit={onEdit}
                  />
                </TouchableOpacity>
              </div>
            </div>
          );
        })}

      {(requestApprove || editEquity) &&
        type != "primary" &&
        type != "secondary" &&
        options.filter(
          (field: any) =>
            field.results && Object.values(field.results).includes("Rejected")
        ).length === 0 && (
          <>
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <ButtonIcon
                color="#CA3D3D"
                activeColor="#a82e2e"
                hoverColor="#d25b5b"
                icon={CloseCardIcon}
                onClick={() => onRejectPress(options, index)}
                softDisabled={disabledRejectButton}
              >
                Reject
              </ButtonIcon>
              <ButtonIcon
                color="#008056"
                activeColor="#006141"
                hoverColor="#009e6a"
                icon={CheckCardIcon}
                onClick={() => onPressAprove(options, index)}
                softDisabled={disabledApprovedButton}
              >
                Approve
              </ButtonIcon>
            </div>
            {showRejectNote ? (
              <TouchableOpacity
                style={{ marginTop: -5, width: "100%", display: "block" }}
              >
                <NoteCard arrow="top" label="Rejection Note" onEdit={onEdit} />
              </TouchableOpacity>
            ) : null}
          </>
        )}
    </CardWrapper>
  );
};

export default Card;
