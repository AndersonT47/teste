import React from "react";
import { SectionWrapper, ScrollableContent, Content } from "./styles";

interface IScrollableSection {
  children?: React.ReactChild;
}

const ScrollableSection = ({ children }: IScrollableSection) => {
  return (
    <SectionWrapper>
      <ScrollableContent>
        <Content>{children}</Content>
      </ScrollableContent>
    </SectionWrapper>
  );
};

export default ScrollableSection;
