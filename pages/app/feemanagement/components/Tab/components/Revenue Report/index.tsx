import PDFViewer from "@/@core/components/PDFViewer";
import { ContainerWrapper } from "./styles";
interface IRevenueReport {
  url: string;
}

const RevenueReport = ({ url }: IRevenueReport) => {
  return (
    <ContainerWrapper>
      <PDFViewer url={url} />
    </ContainerWrapper>
  );
};

export default RevenueReport;
