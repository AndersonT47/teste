import React from "react";
import { ProgressBarWrapper, Progress } from "./styles";

interface IProgressBar {
  progress?: string | number;
  style?: React.CSSProperties;
}
const ProgressBar = ({ progress, style }: IProgressBar) => {
  return (
    <ProgressBarWrapper style={{ ...style }}>
      <Progress style={{ width: `${progress}%` }} />
    </ProgressBarWrapper>
  );
};

export default ProgressBar;
