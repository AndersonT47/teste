import React from "react";
import {
  Text,
  PaperWrapper,
} from "./styles";

interface IPaperDark {
  title: string,
  status: string,
  level?: string,
  width?: number | string,
  margin?: number | string,
  style?: React.CSSProperties;
}

const PaperDark = ({
  title,
  status,
  level,
  width,
  margin,
  style,
}: IPaperDark) => {
  return (
    <PaperWrapper width={width} margin={margin} style={{ ...style }}>
      <div>
        <Text>{title}</Text>
        <Text bold>{status}</Text>
      </div>
      {level ?
        <div>
          <Text>Level</Text>
          <Text bold>{level}</Text>
        </div>
        : null}
    </PaperWrapper>
  )
};

export default PaperDark;
