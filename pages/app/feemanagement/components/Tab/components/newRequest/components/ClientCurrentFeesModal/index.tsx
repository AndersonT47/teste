import React from "react";
import Modal from "@mui/material/Modal";
import Image from "next/image";
import Button from "@/@core/components/Button";
import TouchableOpacity from "@/@core/components/TouchableOpacity";
import closeIcon from "@/assets/svg/close.svg";
import {
  Container,
  Title,
  Text,
  TextThin,
  TableCell,
  TableContainer,
  TableRow,
} from "./styles";
import { FeeManagenmetProvider } from "@/services/feeManagementProvider";
import ScrollableSection from "@/@core/components/ScrollableSection";

interface IClientCurrentFeesModal {
  cif: string;
}

interface ICustomerFee {
  feeDescription: string;
  feeCode: string;
}

const ClientCurrentFeesModal = ({ cif }: IClientCurrentFeesModal) => {
  const { getCurrentFeesByCIF } = FeeManagenmetProvider();
  const [customerFees, setCustomerFees] = React.useState<Array<ICustomerFee>>(
    []
  );
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    getCurrentFeesByCIF(cif).then((response) => {
      setCustomerFees(response.data.data);
      setOpen(true);
    });
  };
  const handleClose = () => setOpen(false);

  return (
    <div style={{ marginLeft: "15px" }}>
      <Button outline onClick={handleOpen} style={{ width: "177px" }}>
        Client Current Fees
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Container>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Title>Client Current Fees</Title>
            <TouchableOpacity onClick={handleClose}>
              <Image src={closeIcon} width={20} height={20} alt="close" />
            </TouchableOpacity>
          </div>
          <div
            style={{
              margin: "20px 0px 16px 0px",
            }}
          >
            <ScrollableSection>
              <TableContainer>
                <TableRow>
                  <TableCell>
                    <Text>Account</Text>
                  </TableCell>
                  <TableCell>
                    <Text>Fee</Text>
                  </TableCell>
                </TableRow>
                {customerFees.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <TextThin>{item.feeCode}</TextThin>
                    </TableCell>
                    <TableCell>
                      <TextThin>{item.feeDescription}</TextThin>
                    </TableCell>
                  </TableRow>
                ))}
              </TableContainer>
            </ScrollableSection>
          </div>

          <div>
            <TextThin>
              *N/A: Refer to Front-Office desktop reference manual for procedure
              to request changes. Contact the Trading Desk or Trade Support
              teams if you have additional questions.
            </TextThin>
          </div>
        </Container>
      </Modal>
    </div>
  );
};

export default ClientCurrentFeesModal;
