import React from "react";
import Image from "next/image";
import Modal from "@mui/material/Modal";
import Button from "@/@core/components/Button";
import TouchableOpacity from "@/@core/components/TouchableOpacity";
import closeIcon from "@/assets/svg/close.svg";
import warningIcon from "@/assets/svg/warning-color.svg";
import { Container, Title } from "./styles";

interface RejectModalException {
  open: boolean;
  onClose: () => void;
}

export default function GenericErrorMsgModal({
  open,
  onClose,
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
            <TouchableOpacity onClick={onClose}>
              <Image src={closeIcon} width={20} height={20} alt="close" />
            </TouchableOpacity>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image src={warningIcon} width={40} height={40} alt="warning" />
              <div
                style={{
                  display: "flex",
                  margin: "8px 0px 40px 0px",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Title>Something went wrong.</Title>
                <Title>Please try again.</Title>
              </div>
            </div>
            {/* <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: 350,
              }}
            >
              <Button outline onClick={handleClose} style={{ width: "168px" }}>
                Try Later
              </Button>
              <Button style={{ width: "168px" }}>Try Again</Button>
            </div> */}
          </div>
        </Container>
      </Modal>
    </div>
  );
}
