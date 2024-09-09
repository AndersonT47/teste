import React from "react";
import Image from "next/image";
import Modal from "@mui/material/Modal";
import Button from "@/@core/components/Button";
import Animation from "@/@core/components/Animation";
import TouchableOpacity from "@/@core/components/TouchableOpacity";
import closeIcon from "@/assets/svg/close.svg";
import animationSuccess from "@/assets/animation/green-check-mark.json";
import { Container, Title } from "./styles";
import warningIcon from "@/assets/svg/warning-color.svg";

interface WantToExitModalProps {
  open: boolean;
  onClose?: () => void;
  onNavigate?: () => void;
}

export default function WantToExitModal({
  open,
  onClose,
  onNavigate,
}: WantToExitModalProps) {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationSuccess,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div>
      <Modal
        open={open}
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
              <div style={{ display: "flex", margin: "8px 0px 40px 0px" }}>
                <Title>Are you sure you want to exit without saving?</Title>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: 350,
              }}
            >
              <Button outline onClick={onClose} style={{ width: "168px" }}>
                Cancel
              </Button>
              <Button style={{ width: "168px" }} onClick={onNavigate}>
                Yes
              </Button>
            </div>
          </div>
        </Container>
      </Modal>
    </div>
  );
}
