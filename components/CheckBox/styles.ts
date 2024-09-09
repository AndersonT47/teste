import styled, { keyframes } from "styled-components";

interface ICheckboxParams {
  checked?: boolean;
  disabled?: boolean;
}

export const Input = styled.input`
  height: 0;
  width: 0;
  opacity: 0;
  z-index: -1;
`;
export const CheckboxWrapper = styled.label<ICheckboxParams>`
  position: relative;
  display: inline-block;
  cursor: ${props => (props.disabled ? "not-allowed" : "pointer")};
  margin: 4px 20px 0px 0px;
`;

const rotate = keyframes`
 from {
    opacity: 0;
    transform: rotate(0deg);
  }
  to {
    opacity: 1;
    transform: rotate(45deg);
  }
`;

export const IconIndicator = styled.div`
  width: 1.2em;
  height: 1.2em;
  background: #FFFFFF;
  position: absolute;
  top: 0em;
  border: 1px solid #8A8C98;
  border-radius: 0.2em;
  
  ${Input}:checked + & {
    background-color: #1E2347;
    border: transparent;
  }

  &::after {
    content: "";
    position: absolute;
    display: none;
  }

  ${Input}:checked + &::after {
    display: block;
    top: 0.1em;
    left: 0.4em;
    width: 35%;
    height: 70%;
    border: solid white;
    border-width: 0 0.15em 0.15em 0;
    animation-name: ${rotate};
    animation-duration: 0.3s;
    animation-fill-mode: forwards;
  }

  ${Input}:disabled + & {
    pointer-events: none;
    background: #9496A0;
  }

`;
