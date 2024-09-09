import styled, { css } from "styled-components";

interface IButtonWrapper {
  disabled?: boolean;
  color?: string;
  activeColor?: string;
  hoverColor?: string;
  softDisabled?: boolean;
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
  width: 184px;
  height: 48px;
  background: ${(props) => props.color};
  border-radius: 4px;
  border-width: 0px;
  color: #ffffff;
  cursor: pointer;
  flex-basis: 47.5%;
  &:active {
    background: ${(props) => props.activeColor};
  }
  &:hover {
    background: ${(props) => props.hoverColor};
  }
  &:focus {
    border-inline-end-width: 1px;
    outline: 0;
  }
  ${(props) =>
    (props.disabled === true || props.softDisabled === true) &&
    css`
      opacity: 0.4;
    `}
`;
