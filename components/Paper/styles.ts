import styled, { css } from "styled-components";

interface IPaperParamns {
  margin?: string | number;
  width?: string | number;
}

export const PaperWrapper = styled.div<IPaperParamns>`
  display: flex;
  width: ${(props) => props.width || "100%"};
  margin: ${(props) => props.margin || "0"};
  height: 69px;
  background: #ffffff;
  box-shadow: 0px 1px 2px rgba(37, 37, 39, 0.06);
  border-radius: 4px;
  padding: 12px 16px;
  align-items: center;
  justify-content: space-between;
  min-width: 170px;
`;
export const TitlePaper = styled.a`
  font-family: "Figtree";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  display: flex;
  align-items: center;
  letter-spacing: 0.12px;
  color: #636574;
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
`;
const TruncatedSpn = styled.span`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const Text = styled(TruncatedSpn)<IPaperParamns>`
  font-family: "Figtree";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  align-items: center;
  letter-spacing: 0.12px;
  color: #484a55;
  align-self: stretch;
  font-weight: 600;
  flex: 1 1 auto;
  @media (max-width: 110px) {
    font-size: 14px; /* Tamanho do texto para telas menores que 768px */
  }

  @media (max-width: 200px) {
    font-size: 12px; /* Tamanho do texto para telas menores que 480px */
  }
`;
