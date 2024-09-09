import styled, { css } from "styled-components";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

interface ITabsParams {
  border?: boolean;
}

export const STabs = styled(Tabs)`
  width: 100%;
`;
export const STabList = styled(TabList)`
  list-style-type: none;
  padding: 4px;
  display: flex;
  margin: 0;
`;

export const STab = styled(Tab)`
  font-family: "Figtree";
  user-select: none;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 16px;
  gap: 4px;
  height: 45px;
  background: #f7f7f8;
  border-radius: 8px 8px 0px 0px;
  flex: none;
  order: 0;
  flex-grow: 0;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  color: #636574;
  cursor: pointer;
  &.is-selected {
    background: #fff;
    border-bottom: 1px solid white;
    color: #1e2347;
  }
  &:focus {
    box-shadow: 0 0 0 2px #4289f5;
    border-inline-end-width: 1px;
    outline: 0;
    z-index: 1;
  }
`;
export const STabPanel = styled(TabPanel)<ITabsParams>`
  display: none;
  padding: 24px;
  margin-top: -4px;
  background: #fff;
  margin-left: 4px;
  border-radius: 0px 8px 8px 8px;
  ${(props) =>
    props.border &&
    css`
      border-radius: 8px 8px 8px 8px;
    `}
  &.is-selected {
    display: block;
  }
`;

export const Button = styled.button`
  font-family: "Figtree";
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  letter-spacing: 0.12px;
  background: none;
  border: none;
  margin: 0;
  padding: 0;
  cursor: pointer;
  :focus {
    box-shadow: 0 0 0 2px #4289f5;
    border-inline-end-width: 1px;
    outline: 0;
  }
`;
