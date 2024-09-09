import React from "react";
import { ContainerWrapper } from "./styles";

interface IPDFViewer {
  url: string;
}

const PDFViewer = ({ url }: IPDFViewer) => {
  return (
    <ContainerWrapper>
      <iframe
        id="ytplayer"
        width="100%"
        height="500"
        src={url}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      />
    </ContainerWrapper>
  );
};

export default PDFViewer;
