import React, { useState, useEffect } from "react";
import Image from "next/image";
import { PaperWrapper, TitlePaper, Text } from "./styles";
import { Tooltip } from "@mui/material";

interface IPaper {
  alt: string;
  icon: string;
  title: string;
  label: string;
  style?: React.CSSProperties;
  margin?: string | number;
  maxWidth?: boolean;
  width?: string | number;
}

const Paper = ({ title, label, icon, alt, margin, style, width }: IPaper) => {
  return (
    <PaperWrapper width={width} margin={margin} style={{ ...style }}>
      <div style={{ display: "flex", flexDirection: "column", width: '85%' }}>
        <TitlePaper>{title}</TitlePaper>
        {label.length > 13 ? (
          <Tooltip arrow title={label} placement="top">
            <Text>{label}</Text>
          </Tooltip>
        ) : (
          <Text>{label}</Text>
        )}
      </div>
      <Image src={icon} width={44} height={44} alt={alt} />
    </PaperWrapper>
  );
};

export default Paper;
