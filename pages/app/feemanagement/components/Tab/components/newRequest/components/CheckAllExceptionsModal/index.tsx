import React, { useState } from "react";
import Image from "next/image";
import Modal from "@mui/material/Modal";
import Button from "@/@core/components/Button";
import Animation from "@/@core/components/Animation";
import TouchableOpacity from "@/@core/components/TouchableOpacity";
import closeIcon from "@/assets/svg/close.svg";
import successIcon from "@/assets/svg/check-circle-color.svg";
import errorIcon from "@/assets/svg/error-circle-color.svg";
import animationSuccess from "@/assets/animation/green-check-mark.json";
import { Container, Title, Text, CheckboxText, TextArea } from "./styles";
import Checkbox from "@/@core/components/CheckBox";

interface CheckAllExceptionsProps {
  open: boolean;
  action: string;
  onClose?: () => void;
  onContinue: (checked: boolean) => void;
}

export default function CheckAllExceptionsModal({
  open,
  action,
  onClose,
  onContinue,
}: CheckAllExceptionsProps) {
  const [checked, setCheckbox] = useState(false);

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationSuccess,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleCheckedMessage = (checked: boolean) => {
    setCheckbox(checked);
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
          <div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                src={action === "APPROVE" ? successIcon : errorIcon}
                width={70}
                height={70}
                alt="success"
              />
              <div style={{ display: "flex", margin: "15px 0px 20px 0px" }}>
                <Title>
                  All fee exceptions were selected as{" "}
                  {action === "APPROVE" ? "approved" : "rejected"}.
                </Title>
              </div>
              <TextArea>
                <Text>
                  Please review all requests before submitting your approval.
                </Text>
                <Text>You can still reject any fee before submitting.</Text>
              </TextArea>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <Checkbox
                  checked={checked}
                  onChange={(e) => handleCheckedMessage(!checked)}
                  stopClickPropagation={true}
                />
                <CheckboxText>Don&apos;t show this message again.</CheckboxText>
              </div>
              <Button
                style={{ width: "168px" }}
                onClick={() => onContinue(checked)}
              >
                Continue
              </Button>
            </div>
          </div>
        </Container>
      </Modal>
    </div>
  );
}
