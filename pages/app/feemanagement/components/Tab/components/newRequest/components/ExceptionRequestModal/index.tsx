import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Image from "next/image";
import TextArea from "@/@core/components/TextArea";
import Button from "@/@core/components/Button";
import TouchableOpacity from "@/@core/components/TouchableOpacity";
import closeIcon from "@/assets/svg/close.svg";
import { Container, Title, Text, Subtitle } from "./styles";

interface RejectModalException {
  open: boolean;
  onChange: (reason: string) => void;
  onSave: (value: string) => void;
  onClose: () => void;
  disabled: boolean;
  value: string;
  disabledText?: boolean;
  rejectAll?: boolean;
}

export default function ExceptionRequestModal({
  open,
  onChange,
  onSave,
  onClose,
  disabled,
  value,
  disabledText,
  rejectAll,
}: RejectModalException) {
  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Container>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Title>
              Rejection of Exception Request {rejectAll ? "(all fees)" : ""}
            </Title>
            <TouchableOpacity onClick={onClose}>
              <Image src={closeIcon} width={20} height={20} alt="close" />
            </TouchableOpacity>
          </div>
          <div style={{ margin: "20px 0px 16px 0px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                margin: "0px 0px 2px 0px",
              }}
            >
              <Subtitle>
                {rejectAll
                  ? "Please provide information to support your decision. This note will be added to all fees of this request."
                  : "Are you sure you want to delete this request?"}
              </Subtitle>
              <Subtitle>{value?.length}/500</Subtitle>
            </div>
            <TextArea
              disabled={disabledText}
              maxLength={500}
              onChangeText={(text) => onChange(text)}
              value={value}
            />
          </div>
          {!disabledText && (
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <TouchableOpacity onClick={onClose} style={{ width: "68px" }}>
                <Text>Cancel</Text>
              </TouchableOpacity>
              <Button
                style={{ width: "68px" }}
                onClick={() => onSave(value)}
                disabled={disabled}
              >
                Save
              </Button>
            </div>
          )}
        </Container>
      </Modal>
    </div>
  );
}
