import styled, { css } from "styled-components";

interface ICifRequestParams {
  bold?: boolean;
  clicked?: boolean;
}

export const ContainerWrapper = styled.div`
  display: flex;
`;
export const Text = styled.a<ICifRequestParams>`
  font-family: "Figtree";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  display: flex;
  align-items: center;
  letter-spacing: 0.12px;
  color: #636574;
  flex: none;
  order: 1;
  flex-grow: 0;
  ${(props) =>
    props.bold &&
    css`
      font-weight: 600;
      margin-left: 5px;
    `}
`;
