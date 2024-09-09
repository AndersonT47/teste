import styled, { css } from "styled-components";

interface ISearchAutoParams {
  active?: boolean;
  isVisible?: boolean;
}

export const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  align-self: center;
`;
export const SearchInput = styled.input`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 12px;
  gap: 8px;
  width: 348px;
  height: 40px;
  background: #f7f7f8;
  border-radius: 4px;
  border: 0px;
  flex: none;
  align-self: stretch;
  font-family: "Figtree";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  display: flex;
  align-items: center;
  letter-spacing: 0.12px;
  color: #1e2347;
  padding-left: 44px;
  :focus {
    box-shadow: 0 0 0 2px #4289f5;
    border-inline-end-width: 1px;
    outline: 0;
  }
`;
export const SearchIconView = styled.div`
  display: flex;
  position: absolute;
  margin: 0px 0px 0px 12px;
`;
export const Button = styled.div`
  display: flex;
  position: absolute;
  margin: 0px 0px 0px 312px;
  cursor: pointer;
  :focus {
    box-shadow: 0 0 0 2px rgba(5, 145, 255, 0.1);
    border-inline-end-width: 1px;
    outline: 0;
  }
`;

export const DropdownStyle = styled.div<ISearchAutoParams>`
  position: absolute;
  top: 52px;
  left: 30;
  max-height: 400vmax;
  width: 348px;
  padding: 0.4rem;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.07);
  box-shadow: 0px 1px 2px rgba(37, 37, 39, 0.06);
  border-radius: 4px;
  padding: 8px;
  transition: max-height 0.2s ease;
  overflow: hidden;
  z-index: 1;
  ${(p) =>
    p.isVisible !== true &&
    css`
      max-height: 40px;
      visibility: hidden;
    `}
`;

export const DropdownItem = styled.div<ISearchAutoParams>`
  font-family: "Figtree";
  display: flex;
  align-items: center;
  width: 100%;
  background-color: #ffffff;
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
      background-color: #F7F7F8;
      font-weight: 400;
    `}
  &:hover, :focus, :focus:hover {
    background-color: #f7f7f8;
    color: #636574;
    outline: none;
  }
`;

export const DropdownItemNoHover = styled.div`
  font-family: "Figtree";
  display: flex;
  align-items: center;
  width: 100%;
  background-color: #ffffff;
  margin: 0.15rem 0;
  padding: 0.3rem 0.5rem;
  font-size: 0.9rem;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  color: #636574;
  border-radius: 0.3rem;
`
