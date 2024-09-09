import React from "react";
import Modal from "@mui/material/Modal";
import Image from "next/image";
import Button from "@/@core/components/Button";
import TouchableOpacity from "@/@core/components/TouchableOpacity";
import closeIcon from "@/assets/svg/close.svg";
import { Container, Title, Text } from "./styles";

interface IDeleteRequestModal {
  disabled?: boolean;
}
export default function DeleteRequestModal({ disabled }: IDeleteRequestModal) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button
        disabled={disabled}
        onClick={handleOpen}
        style={
          disabled
            ? { width: "147px", background: "#dfdfe2" }
            : { width: "147px", background: "#CA3D3D" }
        }
      >
        Delete Request
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Container>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <TouchableOpacity onClick={handleClose}>
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
              <Title>Delete Request</Title>

              <div style={{ display: "flex", margin: "16px 0px 40px 0px" }}>
                <Text>Are you sure you want to delete this request?</Text>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: 350,
              }}
            >
              <Button outline onClick={handleClose} style={{ width: "168px" }}>
                Cancel
              </Button>
              <Button style={{ width: "168px" }}>Delete</Button>
            </div>
          </div>
        </Container>
      </Modal>
    </div>
  );
}
