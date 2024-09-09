import React, { useState, useEffect } from "react";
import Image from "next/image";
import Card from "@/@core/components/Card";
import TextArea from "@/@core/components/TextArea";
import CardRequest from "@/@core/components/CardRequest";
import WarningIcon from "@/assets/svg/warning.svg";
// import DeleteRequestModal from "./components/DeleteRequestModal";
import SaveRequestModal from "./components/SaveRequestModal";
import ClientCurrentFeesModal from "./components/ClientCurrentFeesModal";
import CheckCircleIcon from "@/assets/svg/check-circle-color.svg";
import {
  TitleTab,
  SubtitleTab,
  Text,
  TitleTextArea,
  SubtitleTextArea,
  TextWarning,
  CheckboxText,
  Divider,
  TextNote,
  ContainerSubtitle,
  ContainerSutitleTextArea,
  ContainerConfirm,
  ContainerButtons,
  ContainerApproveRejectArea,
  ApproveRejectArea,
  TextBtn,
} from "./styles";
import Checkbox from "@/@core/components/CheckBox";
import {
  ExceptionOption,
  FeeGroup,
  FeeManagementDataUpdate,
  FeeManagementRejectGroup,
  // UsersApprovers,
  useFeeManagementStore,
} from "@/@core/store/feeManagementStore";
import { FeeManagenmetProvider } from "@/services/feeManagementProvider";
import { useDocumentStore } from "@/@core/store/documents";
import { useAuthStore } from "@/@core/store";
import ExceptionRequestModal from "./components/ExceptionRequestModal";
import { formatData } from "@/@core/utils/format";
import GenericErrorMsgModal from "../../../GenericErrorMsgModal";
import scrollToTop from "@/@core/utils/scroolToTop";
import { useErrorStore } from "@/@core/store/errorStore";
import { useWithout } from "@/@core/store/withoutStore";
import RadioButton from "@/@core/components/RadioButton";
import CheckAllExceptionsModal from "./components/CheckAllExceptionsModal";
import { UserProvider } from "@/services/userProvider";

export default function NewResquest() {
  const [checked, setCheckbox] = useState(false);
  // const [createException, setCreateException] = useState<boolean>(false);
  const [createBankAccountFee, setCreateBankAccountFee] =
    useState<boolean>(false);
  // const [createExceptionInvestment, setCreateExceptionInvestiment] =
  // useState<boolean>(false);
  const {
    feeData,
    setNewFeeRequest,
    newFeeRequest,
    setFeeData,
    setFeeApprovedData,
    setIsAprovalFlowDone,
    setNewFeeRequestId,
  } = useFeeManagementStore((state) => state);
  const { newFeeCase, updateFeeCase, rejectGroup, setRejectGroup } =
    FeeManagenmetProvider();
  const { userFeeApproveAllModal } = UserProvider();
  const { userData, setUserData } = useAuthStore((state) => state);
  const { documentList } = useDocumentStore((state) => state);
  const { errorGlobal, setErrorGlobal } = useErrorStore((state) => state);
  const { withoutGlobal, setWithoutGlobal } = useWithout((state) => state);

  const [reason, setReason] = useState<string>(feeData?.data?.reason || '');
  const [open, setOpen] = useState(false);
  const [openModalRject, setOpenModalReject] = useState<boolean>(false);
  const [checkAllExceptionsModal, setCheckAllExceptionsModal] =
    useState<boolean>(false);
  const [rejectNote, setRejectNote] = useState<string>("");
  const [btnApproveReject, setBtnApproveReject] = useState<string>("");
  const [rejectAll, setRejectAll] = useState<boolean>(false);
  const [selectedEquity, setSelectedEquity] = useState<boolean>(false);
  const [errorOnEquity, setErrorOnEquity] = useState<boolean>(false);

  const completedFee = ["DONE", "REJECTED"].includes(feeData.data?.status);
  const secopsApprove = feeData?.data?.secopsTeam?.filter(
    (item) => item.result && item.result === "APPROVED"
  );

  const isSecOpsUser = feeData.data?.canEditSecops ? true : false;
  const caseID = feeData.data.caseId;
  const statusFee = feeData.data.status === "REJECTED" ? false : true;

  const approvetype = (): boolean => {
    if (feeData.data?.caseId?.length > 0) {
      return feeData.data?.canApprove ||
        (feeData.data?.canEditEquity &&
          feeData.data?.fees.filter((fee) => {
            return (
              fee.feeGroups.filter((feeGroup) => {
                return (
                  feeGroup.fields.filter((field) => {
                    return field.labelValue === "Other" && !field.rejectComment;
                  }).length !== 0
                );
              }).length !== 0
            );
          }).length === 0) ||
        (feeData.data?.canEditSecops && checked && isSecOpsUser)
        ? false
        : true;
    } else if (reason === undefined) {
      return true;
    } else if (reason.length === 0) {
      return true;
    } else if (
      feeData.data?.fees.filter((fee) => {
        return (
          fee.feeGroups.filter((feeGroup) => {
            if (feeGroup.name === "Exception Request") {
              return (
                feeGroup.fields.filter((field) => {
                  return (
                    (field.defaultValue !== "" &&
                      field.valueChanged !== field.labelValue &&
                      field.labelValue !== "NOT APPLICABLE") ||
                    (field.name === "Equity and Options Commission" &&
                      field.labelValue !== field.defaultLabelValue)
                  );
                }).length !== 0
              );
            }
          }).length !== 0
        );
      }).length !== 0
    ) {
      return false;
    } else {
      return true;
    }
  };

  const handleNewExceptionRequest = (
    fee: number,
    feeGroup: number,
    positionException: number,
    updatedValue: ExceptionOption
  ) => {
    const editableFee = feeData;
    editableFee.data.fees[fee].feeGroups[feeGroup].fields.map((item, index) =>
      index === positionException
        ? Object.assign(item, {
            defaultValue: updatedValue.value,
            valueChanged: updatedValue.text,
          })
        : item
    );
    setNewFeeRequest(editableFee);
    setFeeData(editableFee);
  };

  const sendNewFeeRequest = () => {
    setOpen(true);
    if (newFeeRequest.data?.fees?.length > 0) {
      const addDocumentListToNew = Object.assign({
        ...newFeeRequest.data,
        documents: documentList.map((document) => document.documentName),
        reason: reason ?? "",
        userOwner: userData.userName ?? "",
        applicationName: 2,
        currentActivity: "1",
      });
      setNewFeeRequest(addDocumentListToNew);
      setIsAprovalFlowDone(true);
      newFeeCase(addDocumentListToNew);
    } else {
      const addDocumentListToNew = Object.assign({
        ...feeData.data,
        documents: documentList.map((document) => document.documentName),
        reason: reason ?? "",
        userOwner: userData.userName ?? "",
        applicationName: 2,
        currentActivity: "1",
      });
      setNewFeeRequest(addDocumentListToNew);
      newFeeCase(addDocumentListToNew);
      setIsAprovalFlowDone(true);
    }
  };

  const handleApproveFee = async (
    feeGroup: number,
    action: "APPROVE" | "REJECTED" | "MODAL_SAVE" | "REJECT_ALL",
    fieldPosition: number,
    feePosition: number,
    value: string
  ) => {
    const editableFee = feeData;

    setRejectGroup({
      feeGroup,
      feePosition,
      fieldPosition,
    });

    if (action === "REJECTED") {
      editableFee.data.fees[feePosition].feeGroups[feeGroup].fields.forEach(
        (item) => {
          item.approved = false;
          item.reject = true;
        }
      );

      setRejectNote(
        editableFee.data.fees[feePosition].feeGroups[feeGroup].fields.filter(
          (item) => item.rejectComment && item.rejectComment.length > 0
        )[0]?.rejectComment ?? ""
      );

      setRejectAll(false);
      setOpenModalReject(true);
      setFeeData(editableFee);

      setWithoutGlobal(statusFee);
    } else if (action === "MODAL_SAVE") {
      editableFee.data.fees[feePosition].feeGroups[feeGroup].fields.forEach(
        (item) => {
          item.rejectComment = value;
        }
      );
    } else if (action === "REJECT_ALL") {
      setWithoutGlobal(true);

      editableFee.data.fees.forEach((fee) => {
        fee.feeGroups.forEach((feeGroup, index) => {
          if ((index + 1) % 3 === 0) {
            feeGroup.fields.forEach((field) => {
              field.approved = false;
              field.reject = true;
              field.rejectComment = value;
            });
          }
        });
      });

      setFeeData(editableFee);
    } else {
      if (feeData?.data?.canEditEquity && !selectedEquity) {
        setErrorOnEquity(true);
        return;
      }
      editableFee.data.fees[feePosition].feeGroups[feeGroup].fields.forEach(
        (item) =>
          Object.assign(item, {
            approved: true,
            reject: false,
            rejectComment: "",
          })
      );
      setFeeData(editableFee);
      setWithoutGlobal(true);
    }
    checkBtnApproveReject();
  };

  const checkBtnApproveReject = () => {
    const editableFee = feeData;
    const filteredArray = editableFee.data.fees.map((fee) => {
      return fee.feeGroups.filter((feeGroup, index) => (index + 1) % 3 === 0);
    });

    if (
      filteredArray.every((fee) =>
        fee.every((feeGroup) =>
          feeGroup.fields.every((field) => field.approved === true)
        )
      )
    ) {
      setBtnApproveReject("APPROVE");
    } else if (
      filteredArray.every((fee) =>
        fee.every((feeGroup) =>
          feeGroup.fields.every((field) => field.approved === false)
        )
      )
    ) {
      setBtnApproveReject("REJECTED");
    } else {
      setBtnApproveReject("");
    }
  };

  const handleUpdateFeeApproval = async (
    feeUpdate: FeeManagementDataUpdate
  ) => {
    await updateFeeCase(feeUpdate);
    setIsAprovalFlowDone(true);
  };

  const handleSaveRequest = async () => {
    if (feeData?.data?.caseId) {
      setRejectGroup({} as FeeManagementRejectGroup);
      const approvalObject = Object.assign({
        userUpdate: userData.userName,
        feeCase: {
          id: feeData.data.id,
          fees: feeData.data.fees,
        },
      });
      setFeeApprovedData(approvalObject);
      setFeeData(feeData);
      setNewFeeRequestId(feeData.data.id);
      setWithoutGlobal(false);
      await handleUpdateFeeApproval(approvalObject);
    } else {
      sendNewFeeRequest();
      scrollToTop();
      setWithoutGlobal(false);
    }
  };

  const handleOpenException = (
    option: boolean,
    feePosition: number,
    group: number
  ) => {
    const editableFee = feeData;
    const feeGroups = editableFee.data.fees[feePosition].feeGroups[group];

    if (!option) {
      feeGroups.fields.forEach((item) => {
        item.defaultValue = "";
        item.labelValue = item.defaultLabelValue ?? "";
        item.exceptionOptions.map((item) => {
          item.text == "Other" ? (item.value = "") : "";
        });
      });
    }

    editableFee.data.fees[feePosition].feeGroups[group].open = option;
    setFeeData(editableFee);
  };

  const feeGroupsDivided = (feeGroups: Array<FeeGroup>) => {
    const divideds: Array<Array<FeeGroup>> = [];
    let chunks: Array<FeeGroup> = [];
    feeGroups.forEach((feeGroup) => {
      chunks.push(feeGroup);
      if (chunks.length === 3) {
        divideds.push(chunks);
        chunks = [];
      }
    });
    return divideds;
  };

  const handleApproveRejectAll = (action: "APPROVE" | "REJECTED") => {
    setBtnApproveReject(action);

    const showModalApproveReject = userData.showModal;
    const editableFee = feeData;

    if (action === "APPROVE") {
      if (showModalApproveReject) {
        setCheckAllExceptionsModal(true);
      } else {
        setWithoutGlobal(true);
        editableFee.data.fees.forEach((fee) => {
          fee.feeGroups.forEach((feeGroup, index) => {
            if ((index + 1) % 3 === 0) {
              feeGroup.fields.forEach((field) => {
                field.approved = true;
                field.reject = false;
                field.rejectComment = "";
              });
            }
          });
        });
        setFeeData(editableFee);
      }
    } else {
      if (showModalApproveReject) {
        setCheckAllExceptionsModal(true);
      } else {
        setRejectAll(true);
        setOpenModalReject(true);
      }
    }
  };

  const continueAllExceptionsModal = (checked: boolean) => {
    const userDataObject = Object.assign({
      ...userData,
      name: userData.userName,
      showModal: !checked,
    });
    userFeeApproveAllModal(userDataObject);
    setUserData(userDataObject);
    setCheckAllExceptionsModal(false);
    const editableFee = feeData;
    if (btnApproveReject === "APPROVE") {
      setWithoutGlobal(true);

      editableFee.data.fees.forEach((fee) => {
        fee.feeGroups.forEach((feeGroup, index) => {
          if ((index + 1) % 3 === 0) {
            feeGroup.fields.forEach((field) => {
              field.approved = true;
              field.reject = false;
              field.rejectComment = "";
            });
          }
        });
      });
      setFeeData(editableFee);
    } else {
      setRejectAll(true);
      setOpenModalReject(true);
    }
  };

  return (
    <>
      {feeData?.data?.canApprove && (
        <ContainerApproveRejectArea>
          <ApproveRejectArea>
            <RadioButton
              checked={btnApproveReject === "APPROVE" ? true : false}
              onClick={() => {
                handleApproveRejectAll("APPROVE");
              }}
            />
            <TextBtn>Approve All</TextBtn>
          </ApproveRejectArea>
          <ApproveRejectArea>
            <RadioButton
              checked={btnApproveReject === "REJECTED" ? true : false}
              onClick={() => {
                handleApproveRejectAll("REJECTED");
              }}
            />
            <TextBtn>Reject All</TextBtn>
          </ApproveRejectArea>
          <ClientCurrentFeesModal cif={feeData.data.cif} />
        </ContainerApproveRejectArea>
      )}
      {feeData?.data?.fees.map((feeMapItem, index) => {
        if (
          feeData?.data?.canEditEquity &&
          feeMapItem.feeType !== "Investment Account Fees"
        )
          return;
        return (
          <div key={index} style={{ marginTop: 56 }}>
            <TitleTab>
              {feeMapItem.feeType === "Customer Fees"
                ? "CIF Fees"
                : feeMapItem.feeType}
            </TitleTab>
            {feeGroupsDivided(feeMapItem.feeGroups).map(
              (feeGroupsItem, feeGroupsItemIndex) => {
                const lastException = feeGroupsItem[2].fields
                  .slice(-1)[0]
                  .exceptionOptions.slice(-1)[0];
                if (
                  feeData?.data?.canEditEquity &&
                  (lastException.text !== "Other" ||
                  lastException.value === "")
                )
                  return;
                if (
                  feeData?.data?.canEditSecops &&
                  !feeGroupsItem[2].fields
                    .map((field) => field.approved)
                    .includes(true)
                )
                  return;
                const accountMaintenanceDescription =
                  index === 0 ? feeGroupsItem[0].accountNumber : "";

                const accountMaintenanceKYC =
                  feeData.data.fees[index]?.feeGroups[feeGroupsItemIndex]
                    ?.kycMailingStatus || "";

                return (
                  <>
                    <ContainerSubtitle>
                      {feeMapItem.feeType === "Customer Fees" ? (
                        <div style={{ display: "flex" }}>
                          <SubtitleTab>CIF#</SubtitleTab>
                          <Text>{feeGroupsItem[0].cif}</Text>
                        </div>
                      ) : (
                        <div style={{ display: "flex" }}>
                          <SubtitleTab>Account#</SubtitleTab>
                          <Text>{feeGroupsItem[0].accountNumber}</Text>
                        </div>
                      )}
                      {feeMapItem.feeType === "Investment Account Fees" && (
                        <div style={{ display: "flex", marginLeft: 40 }}>
                          <SubtitleTab>Entity/Type</SubtitleTab>
                          <Text>{feeGroupsItem[0].entityCode}</Text>
                        </div>
                      )}
                    </ContainerSubtitle>

                    <div style={{ display: "flex" }}>
                      <Card
                        type="primary"
                        index={index}
                        options={feeGroupsItem[0].fields}
                        onChange={(e: string) => {}}
                        onPressAprove={(e) => console.log(e)}
                        onRejectPress={(e) => console.log(e)}
                        defaultValue="0"
                        editEquity={feeData?.data?.canEditEquity}
                        noteKYC={
                          feeMapItem.feeType === "Customer Fees" &&
                          accountMaintenanceKYC
                        }
                      />
                      <Card
                        margin="0px 24px"
                        type="secondary"
                        editEquity={feeData?.data?.canEditEquity}
                        index={index}
                        options={feeGroupsItem[1].fields}
                        onChange={(e: string) => {}}
                        onPressAprove={(e) => console.log(e)}
                        onRejectPress={(e) => console.log(e)}
                        defaultValue={feeGroupsItem[0].fields}
                        clientValue={feeGroupsItem[2].fields}
                        noteDDA={
                          feeMapItem.feeType === "Customer Fees" &&
                          accountMaintenanceDescription
                        }
                      />

                      {feeData.data?.caseId ||
                      feeData.data?.canApprove ||
                      feeData.data?.canEditEquity ||
                      feeData.data?.canEditSecops ? (
                        <Card
                          type={
                            feeGroupsItem[2].fields
                              .map((field) => field.approved)
                              .includes(true)
                              ? "success"
                              : feeGroupsItem[2].fields
                                  .map((field) => field.reject)
                                  .includes(true)
                              ? "error"
                              : "success"
                          }
                          options={feeGroupsItem[2].fields}
                          onCancel={() => setCreateBankAccountFee(false)}
                          defaultValue={feeGroupsItem[0].fields}
                          clientValue={feeGroupsItem[1].fields}
                          exception
                          index={3}
                          showRejectNote={
                            feeGroupsItem[2].fields[0].reject ? true : false
                          }
                          onEdit={() => {
                            handleApproveFee(
                              feeGroupsItemIndex * 3 + 2,
                              "REJECTED",
                              0,
                              index,
                              ""
                            );
                          }}
                          requestApprove={feeData?.data?.canApprove}
                          editEquity={feeData?.data?.canEditEquity}
                          onCaseId={feeData?.data?.caseId ? true : false}
                          onChange={(e: ExceptionOption, indexs: number) =>
                            handleNewExceptionRequest(
                              index,
                              feeGroupsItemIndex * 3 + 2,
                              indexs,
                              e
                            )
                          }
                          noteDDA={
                            feeMapItem.feeType === "Customer Fees" &&
                            accountMaintenanceDescription
                          }
                          onApprove={["DONE", "REJECTED"].includes(
                            feeData.data?.status
                          )}
                          approvalResults={feeGroupsItem[2].approvalResults}
                          disabled
                          onPressAprove={(e, i) => {
                            handleApproveFee(
                              feeGroupsItemIndex * 3 + 2,
                              "APPROVE",
                              i,
                              index,
                              ""
                            );
                          }}
                          onRejectPress={(e, i) => {
                            handleApproveFee(
                              feeGroupsItemIndex * 3 + 2,
                              "REJECTED",
                              i,
                              index,
                              ""
                            );
                          }}
                          onSelectedEquity={setSelectedEquity}
                          selectedEquity={errorOnEquity}
                        />
                      ) : null}

                      {feeGroupsItem[2].open &&
                      !feeData.data?.canApprove &&
                      !feeData.data?.canEditEquity &&
                      !feeData.data?.canEditSecops ? (
                        <Card
                          type="success"
                          options={feeGroupsItem[2].fields}
                          index={index}
                          exception
                          onCancel={() =>
                            handleOpenException(
                              false,
                              index,
                              feeGroupsItemIndex * 3 + 2
                            )
                          }
                          defaultValue={feeGroupsItem[0]?.fields}
                          onCaseId={feeData.data.caseId ? true : false}
                          clientValue={feeGroupsItem[1].fields}
                          onChange={(e: ExceptionOption, indexs: number) =>
                            handleNewExceptionRequest(
                              index,
                              feeGroupsItemIndex * 3 + 2,
                              indexs,
                              e
                            )
                          }
                          isModal
                          noteDDA={accountMaintenanceDescription}
                          onApprove={feeData.data?.status === "DONE"}
                          approvalResults={feeGroupsItem[2]?.approvalResults}
                          onPressAprove={(e, i) => {}}
                          onRejectPress={(e, i) => {}}
                        />
                      ) : null}

                      {!feeGroupsItem[2].open && !feeData.data?.caseId ? (
                        <CardRequest
                          index={index}
                          onClick={(index: number) =>
                            handleOpenException(
                              true,
                              index,
                              feeGroupsItemIndex * 3 + 2
                            )
                          }
                        />
                      ) : null}
                    </div>
                  </>
                );
              }
            )}
          </div>
        );
      })}
      <div style={{ marginTop: 40 }}>
        <div style={{ display: "flex", marginBottom: 15 }}>
          <TitleTextArea>Reason for Exception</TitleTextArea>
          <div
            style={{ display: "flex", alignItems: "center", marginLeft: 17 }}
          >
            <Image src={WarningIcon} width={20} height={20} alt="Warning" />
            <TextWarning>Required</TextWarning>
          </div>
        </div>
        <ContainerSutitleTextArea>
          <SubtitleTextArea>
            Please provide any additional relevant information to support the
            exception approval.
          </SubtitleTextArea>
          <SubtitleTextArea>
            {(reason?.length ?? feeData.data?.reason?.length) || "0"}/500
          </SubtitleTextArea>
        </ContainerSutitleTextArea>
        <TextArea
          maxLength={500}
          onChangeText={(textReason) => {
            setReason(textReason)
            feeData.data.reason = textReason
          }}
          disabled={
            feeData.data?.canApprove ||
            feeData.data?.canEditEquity ||
            feeData.data?.canEditSecops ||
            feeData.data?.caseId?.length > 0
          }
          value={reason ?? feeData.data?.reason}
        />

        {isSecOpsUser && (
          <ContainerConfirm>
            <TitleTextArea>Security Operations Update</TitleTextArea>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Checkbox
                checked={checked}
                onChange={() => setCheckbox(!checked)}
              />
              <CheckboxText>
                I confirm that the investments fees approved have been updated.
              </CheckboxText>
            </div>
          </ContainerConfirm>
        )}
        {completedFee && secopsApprove.length > 0 && (
          <ContainerConfirm>
            <TitleTextArea>Security Operations Update</TitleTextArea>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Checkbox checked={true} onChange={() => {}} disabled={true} />
              <CheckboxText>
                I confirm that the investments fees approved have been updated.
              </CheckboxText>
            </div>
            <Divider />
            <div style={{ display: "flex" }}>
              <Image
                src={CheckCircleIcon}
                width={21}
                height={21}
                alt="info"
                style={{ marginRight: 8 }}
              />
              <TextNote>
                Updated by&nbsp;<strong>{secopsApprove[0]?.userName}</strong>
                &nbsp;on&nbsp;
                <strong>{formatData(secopsApprove[0]?.updatedAt)}</strong>.
              </TextNote>
            </div>
          </ContainerConfirm>
        )}
      </div>
      {!completedFee && (
        <ContainerButtons>
          {/* <DeleteRequestModal disabled /> */}
          <SaveRequestModal
            open={false}
            onClose={() => setOpen(false)}
            disabled={approvetype()}
            onPress={() => handleSaveRequest()}
          />
        </ContainerButtons>
      )}

      <ExceptionRequestModal
        open={openModalRject}
        disabled={
          (rejectNote?.length <= 5 ? true : false) ||
          feeData?.data?.status == "REJECTED"
        }
        disabledText={
          ["DONE", "REJECTED"].includes(feeData.data?.status) ||
          (!feeData.data?.canApprove && !feeData.data?.canEditEquity)
        }
        onChange={(e) => setRejectNote(e)}
        onClose={() => {
          setOpenModalReject(false);
          checkBtnApproveReject();
        }}
        rejectAll={rejectAll}
        onSave={(value) => {
          handleApproveFee(
            rejectGroup.feeGroup,
            rejectAll ? "REJECT_ALL" : "MODAL_SAVE",
            rejectGroup.fieldPosition,
            rejectGroup.feePosition,
            value
          );
          return setOpenModalReject(false);
        }}
        value={rejectNote}
      />
      <GenericErrorMsgModal
        open={errorGlobal}
        onClose={() => setErrorGlobal(false)}
      />

      <CheckAllExceptionsModal
        open={checkAllExceptionsModal}
        action={btnApproveReject}
        onClose={() => {
          setCheckAllExceptionsModal(false);
          checkBtnApproveReject();
        }}
        onContinue={(checkedModal) => continueAllExceptionsModal(checkedModal)}
      />
    </>
  );
}
