import styled, { css } from "styled-components";

interface IEquityOptionParams {
  end?: boolean;
  isDisabled?: boolean;
  rejected?: boolean;
  height?: number;
  onAlertError?: boolean;
  showException?: boolean;
}
export const Container = styled.div`
  position: absolute;
  width: 840px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #ffffff;
  box-shadow: 0px 8px 12px rgba(37, 37, 39, 0.08);
  border-radius: 8px;
`;
export const Title = styled.a`
  font-family: "Figtree";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 27px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 0.12px;
  color: #1e2347;
`;
export const Div = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 24px 24px 0px 24px;
`;
export const Text = styled.a`
  font-family: "Figtree";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: 0.12px;
  color: #484a55;
  flex: none;
  order: 1;
  flex-grow: 1;
`;
export const Divider = styled.div<IEquityOptionParams>`
  width: 100%;
  border-bottom: 1px solid #dbdbdb;
  ${(props) =>
    props.end &&
    css`
      border-bottom: 2px solid #dbdbdb;
    `}
`;
export const TextPadding = styled.div`
  padding: 8px;
  min-height: 64px;
  min-width: 369px;
`;
export const TextContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
export const RadioContainer = styled.div`
  margin-bottom: 18px;
`;
export const ItemContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const SelectLabelButton = styled.button<IEquityOptionParams>`
  background: ${(props) =>
    props.rejected ? css`#FBEAEA !important` : css`#ffffff`};
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
  color: ${(props) =>
    props.rejected ? css`#CA303D !important` : css`#8A8C98`};
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
        border: 1px solid #8a8c98;
      }
    `}
  ${(props) =>
    props.onAlertError === true &&
    css`
      border: 1px solid #ca3d3d;
      :hover {
        border: 1px solid #ca3d3d;
      }
    `}
  ${(props) =>
    props.showException === true &&
    css`
      padding-right: 110px;
    `}
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

export const SelectContainer = styled.div`
  position: relative;
  margin: 0px 0px 0px 0px;
  width: 100%;
`;

export const ImageContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 45px;
  top: 8px;
`;

export const TextError = styled.p`
  font-size: 13px;
  color: #ca3d3d;
  margin: 8px 0 0 0;
`;
