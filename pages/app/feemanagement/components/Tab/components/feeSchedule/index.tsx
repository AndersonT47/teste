import React from "react";
import PDFViewer from "@/@core/components/PDFViewer";
import { ContainerWrapper } from "./styles";
import { useFeeManagementStore } from "@/@core/store/feeManagementStore";

export default function FeeSchedule() {
  const { feeData } = useFeeManagementStore((state) => state);

  const pdf = feeData?.data?.documentUrl;
  return (
    <ContainerWrapper>
      {pdf ? <PDFViewer url={pdf as any} /> : null}
    </ContainerWrapper>
  );
}
