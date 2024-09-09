import styled, { css } from "styled-components";

interface INavbarButtonParams {
  active?: boolean;
}

export const MenuItem = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const LiItem = styled.button<INavbarButtonParams>`
  gap: 8px;
  border: 0px;
  height: 60px;
  flex-grow: 0;
  padding: 16px;
  color: #c0c2cc;

  background: #1e2347;
  align-self: stretch;
  align-items: center;
  justify-content: center;
  border-bottom: 4px solid transparent;
  cursor: pointer;
  &:hover {
    display: flex;
    background: #1e2347;
    border-bottom: 4px solid #abaebf;
  }
  :focus {
    display: flex;
    color: #ffffff;
    background: #1e2347;
    border-bottom: 4px solid #abaebf;
  }
  ${(props) =>
    props.active &&
    css`
      display: flex;
      background: #1e2347;
      border-bottom: 4px solid #abaebf;
    `}
`;
export const ImgDiv = styled.button`
  border: 0px;
  height: 55px;
  background: #1e2347;
  cursor: pointer;
`;
export const LiText = styled.span`
  font-size: 14px;
  font-weight: 400;
  line-height: 21px;
  letter-spacing: 0.12px;
  font-style: normal;
  font-family: "Figtree";
`;

export const SelectMenuItem = styled.div`
  display: flex;
  height: 60px;
  margin-left: 20px;
  align-items: center;
`;
export const IconItemMenu = styled.div`
  display: flex;
  align-items: center;
`;
export const DropDownContent = styled.div`
  display: none;
  position: absolute;
  background-color: #fff;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  border-radius: 5px;
  padding: 4px;
`;
export const DropDownImgContent = styled.div`
  display: none;
  position: absolute;
  top: calc(100% + 4px);
  right: 0;
  background-color: #fff;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  border-radius: 0px;
  padding: 4px;
  border-radius: 5px;
  transform: translateY(0);
  &:hover {
    display: block;
  }
`;

export const DropDownLi = styled.li`
  display: inline-block;
  &:hover {
    background: #1e2347;
  }
  :focus {
    color: #ffffff;
    background: #1e2347;
  }
  &:hover ${DropDownContent} {
    display: block;
  }
  &[aria-expanded="true"] ${DropDownContent} {
    display: block;
  }
`;

export const DropDownImg = styled.li`
  display: inline-block;
  position: relative;
  &:hover {
    background: #1e2347;
  }
  :focus {
    color: #ffffff;
    background: #1e2347;
  }
  &:hover ${DropDownImgContent} {
    display: block;
  }
  &[aria-expanded="true"] ${DropDownImgContent} {
    display: block;
  }
`;

export const SubMenuItem = styled.button`
  border: 0;
  font-size: 14px;
  font-weight: 400;
  line-height: 21px;
  letter-spacing: 0.12px;
  font-style: normal;
  font-family: "Figtree";
  color: gray;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
  background: transparent;
  width: 100%;
  cursor: pointer;
  &:hover {
    background-color: #f7f7f8;
    border-radius: 4px;
    color: #1e2347;
  }
  &:focus {
    box-shadow: 0 0 0 2px #4289f5;
    border-inline-end-width: 1px;
    outline: 0;
    z-index: 1;
  }
`;
