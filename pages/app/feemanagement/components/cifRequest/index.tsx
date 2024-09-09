import React, { useState } from "react";
import Image from "next/image";
import CifButton from "@/@core/components/CifButton";
import WarningIcon from "@/assets/svg/warning.svg";
import { Text, ContainerWrapper } from "./styles";
import { useFeeManagementStore } from "@/@core/store/feeManagementStore";
import { useNavigate } from "react-router-dom";
import { useWithout } from "@/@core/store/withoutStore";
import WantToExitModal from "../Tab/components/newRequest/components/WantToExitModal";

interface ICifRequest {}

const CifRequest = ({}: ICifRequest) => {
  const [modal, setModal] = useState(false);
  const [active, setActive] = useState({
    feeId: "",
    state: false,
  });
  const { feeData } = useFeeManagementStore((state) => state);
  const { withoutGlobal, setWithoutGlobal } = useWithout((state) => state);

  const navigate = useNavigate();

  const feeActive = feeData?.data?.feesActives;
  const route = `/app/feemanagement/${feeData.data.cif}`;

  const handleOnActiveFeeSelect = (
    feeId: string,
    index: number,
    active: boolean
  ) => {
    if (withoutGlobal) {
      setModal(true);
      setActive({ feeId: feeId, state: active });
    } else if (!active) {
      navigate(route + "/" + feeId);
    } else {
      navigate(route);
    }
  };

  const handleApproveModal = () => {
    setModal(false);
    setWithoutGlobal(false);
    if (!active.state) {
      navigate(route + "/" + active?.feeId);
    } else {
      navigate(route);
    }
  };

  return (
    <>
      <ContainerWrapper>
        <div
          style={{
            display: "flex",
            flexShrink: 0,
            alignItems: "center",
            width: 260,
            marginLeft: 35,
          }}
        >
          <Image
            src={WarningIcon}
            width={20}
            height={20}
            alt="Warning"
            style={{ marginRight: "0.5rem" }}
          />

          <Text>This CIF has</Text>
          <Text bold>{feeActive?.length} active requests:</Text>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {feeActive.map((item, index) => (
            <div style={{ margin: "0.5rem 0.3rem" }} key={item.id}>
              <CifButton
                clicked={item.clicked}
                onClick={() =>
                  handleOnActiveFeeSelect(item.id, index, item.clicked ?? false)
                }
              >
                {item.caseNumber}
              </CifButton>
            </div>
          ))}
        </div>
      </ContainerWrapper>
      <WantToExitModal
        open={modal}
        onClose={() => setModal(false)}
        onNavigate={() => handleApproveModal()}
      />
    </>
  );
};

export default CifRequest;
