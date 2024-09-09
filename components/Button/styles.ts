import styled, { css } from "styled-components";

interface IButtonWrapper {
  disabled?: boolean;
  outline?: boolean;
}

export const ButtonWrapper = styled.button<IButtonWrapper>`
  font-family: "Figtree";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 16px;
  width: 384px;
  height: 48px;
  background: #1e2347;
  border-radius: 4px;
  border-width: 0px;
  color: #ffffff;
  cursor: pointer;
  :hover {
    background: #1564b0;
  }
  :focus {
    box-shadow: 0 0 0 2px #4289f5;
    border-inline-end-width: 1px;
    outline: 0;
  }
  ${(props) =>
    props.disabled === true &&
    css`
      background: #dfdfe2;
      color: #7c7e8a;
      cursor: not-allowed;
      &:hover {
        background: #dfdfe2;
      }
    `}
  ${(props) =>
    props.outline &&
    css`
      color: #1e2347;
      background: #ffffff;
      border: 1px solid #1e2347;
      &:hover {
        background: #ffffff;
        border: 1px solid #1564b0;
        color: #1564b0;
      }
      &:focus {
        box-shadow: 0 0 0 2px #4289f5;
        border-inline-end-width: 1px;
        outline: 0;
      }
    `}
`;
