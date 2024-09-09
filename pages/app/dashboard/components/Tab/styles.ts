import styled, { css } from "styled-components";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

interface ITabsParams {
  border?: boolean;
  advancedSearch?: boolean;
}

export const STabs = styled(Tabs)`
  width: 100%;
`;
export const STabList = styled(TabList)`
  /* list-style-type: none; */
  padding: 0px;
  display: flex;
  justify-content: flex-start;
  margin: 0px;
  margin-bottom: 4px;
`;

export const STab = styled(Tab)`
  font-family: "Figtree";
  user-select: none;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 16px;
  gap: 5px;
  height: 45px;
  background: #f7f7f8;
  border-radius: 8px 8px 0px 0px;
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
  &:focus-within {
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
export const DivAnimation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 92px;
`;
export const DivTable = styled.div`
  display: flex;
  margin: 18px 14px 18px 0px;
  justify-content: space-between;
`;
export const ContainerText = styled.div`
  display: flex;
  width: 100%;
  height: 200px;
  justify-content: center;
  align-items: center;
`;
export const Text = styled.span`
  font-family: "Figtree";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.12px;
  color: #636574;
`;
