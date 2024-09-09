import styled from "styled-components";

interface IScrollableSectionParams {}

export const SectionWrapper = styled.section`
  height: 400px;
`;
export const ScrollableContent = styled.div`
  height: 100%;
  overflow: auto;
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #b8b8b8;
    border-radius: 3px;
  }
  &::-webkit-scrollbar-track {
    background-color: #f7f7f8;
  }
`;

export const Content = styled.div``;
