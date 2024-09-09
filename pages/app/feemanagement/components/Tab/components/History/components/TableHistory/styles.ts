import styled, { css } from "styled-components";

interface ITableHistoryParams {
  normal?: boolean;
  opacity?: boolean;
}

export const ContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 8px;
  flex: none;
  order: 4;
  box-sizing: border-box;
  border: 2px solid #F7F7F8;
  border-radius: 8px;
`;
export const Divider = styled.div<ITableHistoryParams>`
  margin: 0px 10px;
  border-bottom: 1px solid #DBDBDB;
  ${(p) =>
    p.opacity &&
    css`
      border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    `}
`;
export const Text = styled.a<ITableHistoryParams>`
  font-family: 'Figtree';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 21px;
  display: flex;
  align-items: center;
  letter-spacing: 0.12px;
  color: #484A55;
  flex: 1;
  ${(props) =>
    props.normal &&
    css`
    font-weight: 400;
    `}
`;
export const StepTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  align-items: center;
  padding: 12px 16px;
  gap: 12px;
  background: #F7F7F8;
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
`;
export const StepGridItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 12px 16px;
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
`;