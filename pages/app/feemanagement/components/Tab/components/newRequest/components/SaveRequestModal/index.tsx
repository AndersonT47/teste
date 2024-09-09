import React, { useEffect } from "react";
import Image from "next/image";
import Modal from "@mui/material/Modal";
import Button from "@/@core/components/Button";
import Animation from "@/@core/components/Animation";
import TouchableOpacity from "@/@core/components/TouchableOpacity";
import closeIcon from "@/assets/svg/close.svg";
import animationSuccess from "@/assets/animation/green-check-mark.json";
import { Container, Title } from "./styles";
import { useNavigate } from "react-router-dom";

interface ISaveRequestParams {
  disabled: boolean;
  onPress: () => void;
  open: boolean;
  onClose: () => void;
}

export default function SaveRequestModal({
  disabled,
  onPress,
  open,
  onClose,
}: ISaveRequestParams) {
  const navigate = useNavigate();

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
      <Button onClick={onPress} style={{ width: "100px" }} disabled={disabled}>
        Submit
      </Button>
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
              <Animation options={defaultOptions} width={56} height={56} />
              <div style={{ display: "flex", margin: "8px 0px 40px 0px" }}>
                <Title>Your changes have been saved!</Title>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: 350,
              }}
            >
              <Button
                outline
                onClick={() => navigate("/app/dashboard")}
                style={{ width: "168px" }}
              >
                Go to Dashboard
              </Button>
              <Button style={{ width: "168px" }} onClick={onClose}>
                Close
              </Button>
            </div>
          </div>
        </Container>
      </Modal>
    </div>
  );
}
