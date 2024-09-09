import styled, { css } from "styled-components";

interface ISelectParams {
  active?: boolean;
  isVisible?: boolean;
  isDisabled?: boolean;
  height?: number;
  showException?: boolean;
}

export const SelectContainer = styled.div`
  position: relative;
  margin: 0px 0px 0px 0px;
  width: 100%;
`;

export const SelectLabelButton = styled.button<ISelectParams>`
  background: #ffffff;
  height: ${(props) => props.height || 36}px;
  width: 100%;
  text-align: start;
  background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik02LjUgMTAuMDYwN0w3LjU2MDY2IDlMMTIuMDMwMyAxMy40Njk3TDE2LjUgOUwxNy41NjA3IDEwLjA2MDdMMTIuMDMwMyAxNS41OTFMNi41IDEwLjA2MDdaIiBmaWxsPSIjNjM2NTc0Ii8+Cjwvc3ZnPgo=);
  background-position: 98%;
  background-repeat: no-repeat;
  border: 1px solid #8a8c98;
  border-radius: 4px;
  padding: 0.5rem;
  padding-left: 12px;
  padding-right: 25px;
  color: #636574;
  gap: 8px;
  font-family: "Figtree";
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 21px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  :hover {
    border: 1px solid #1c77cf;
  }
  :focus {
    box-shadow: 0 0 0 2px rgba(5, 145, 255, 0.1);
    border-inline-end-width: 1px;
    outline: 0;
    border: 2px solid #1c77cf;
  }
  ${(props) =>
    props.isDisabled === true &&
    css`
      background: #f7f7f8;
      padding-right: 10px;
      cursor: not-allowed;
      :hover {
        border: 1px solid #636574;
      }
    `}
  ${(props) =>
    props.showException === true &&
    css`
      padding-right: 110px;
    `}
`;

export const DropdownStyle = styled.div<ISelectParams>`
  position: absolute;
  top: 20;
  left: 0;
  max-height: 20vmax;
  min-width: 100%;
  padding: 0.4rem;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.07);
  box-shadow: 0px 1px 2px rgba(37, 37, 39, 0.06);
  border-radius: 4px;
  transition: max-height 0.2s ease;
  z-index: 1;
  ${(p) =>
    p.isVisible !== true &&
    css`
      max-height: 40px;
      visibility: hidden;
      text-overflow: ellipsis;
    `}
`;

export const DropdownItem = styled.span<ISelectParams>`
  font-family: "Figtree";
  display: flex;
  align-items: center;
  width: 100%;
  margin: 0.15rem 0;
  padding: 0.3rem 0.5rem;
  font-size: 0.9rem;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  color: #636574;
  border-radius: 0.3rem;
  cursor: pointer;
  ${(p) =>
    p.active &&
    css`
      color: #636574;
      font-weight: 400;
    `}
  &:hover, :focus, :focus:hover {
    background-color: #f7f7f8;
    color: #636574;
    outline: none;
  }
`;

export const Exception = styled.div`
  font-family: "Figtree";
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 18px;
  position: absolute;
  top: 8px;
  right: 35px;
  display: flex;
  align-items: center;
  letter-spacing: 0.12px;
  color: #ffffff;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  padding: 1px 8px;
  width: 73px;
  height: 20px;
  background: #c75300;
  border-radius: 16px;
`;

export const Change = styled.div`
  font-family: "Figtree";
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 18px;
  position: absolute;
  top: 8px;
  right: 35px;
  display: flex;
  align-items: center;
  letter-spacing: 0.12px;
  color: #ffffff;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  padding: 1px 8px;
  width: 60px;
  height: 20px;
  background: #1c77cf;
  border-radius: 16px;
`;

export const ScrollFlow = styled.div`
  overflow-y: scroll;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #b8b8b8;
    border-radius: 3px;
  }
  &::-webkit-scrollbar-track {
    background-color: #f7f7f8;
    border-radius: 3px;
  }
`;
