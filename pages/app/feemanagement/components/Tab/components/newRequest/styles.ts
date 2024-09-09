import styled, { css } from "styled-components";

interface INewResquestParams {}

export const TitleTab = styled.a`
  font-family: "Figtree";
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 30px;
  display: flex;
  align-items: center;
  letter-spacing: 0.12px;
  color: #484a55;
  flex: none;
  order: 0;
  flex-grow: 1;
`;
export const SubtitleTab = styled.a`
  font-family: "Figtree";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 21px;
  display: flex;
  align-items: center;
  letter-spacing: 0.12px;
  color: #484a55;
  flex: none;
  order: 0;
  flex-grow: 0;
`;
export const Text = styled.a`
  font-family: "Figtree";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  display: flex;
  align-items: center;
  letter-spacing: 0.12px;
  color: #484a55;
  flex: none;
  order: 1;
  flex-grow: 0;
  margin-left: 8px;
`;
export const TitleTextArea = styled.a`
  font-family: "Figtree";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 27px;
  display: flex;
  align-items: center;
  letter-spacing: 0.12px;
  color: #484a55;
  flex: none;
  order: 0;
  flex-grow: 0;
`;
export const SubtitleTextArea = styled.a`
  font-family: "Figtree";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  display: flex;
  align-items: center;
  letter-spacing: 0.12px;
  color: #636574;
  flex: none;
  order: 0;
`;
export const TextWarning = styled.a`
  font-family: "Figtree";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  display: flex;
  align-items: center;
  letter-spacing: 0.12px;
  color: #c75300;
  flex: none;
  order: 1;
  flex-grow: 0;
  margin-left: 4px;
`;
export const CheckboxText = styled.a`
  font-family: "Figtree";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.12px;
  color: #636574;
  flex: none;
  order: 1;
  flex-grow: 1;
`;
export const Divider = styled.div`
  width: 100%;
  border-top: 1px dashed #dbdbdb;
`;
export const TextNote = styled.a`
  font-family: "Figtree";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  display: flex;
  align-items: center;
  letter-spacing: 0.12px;
  color: #484a55;
`;
export const ContainerSubtitle = styled.div`
  height: 30px;
  display: flex;
  margin-bottom: 16px;
  align-items: flex-end;
`;
export const ContainerSutitleTextArea = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 5px;
  justify-content: space-between;
`;
export const ContainerConfirm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 24px;
  gap: 16px;
  width: 100%;
  border: 1px solid #dbdbdb;
  border-radius: 8px;
  order: 5;
  margin-top: 40px;
`;
export const ContainerButtons = styled.div`
  display: flex;
  margin: 40px 0px 0px 0px;
  justify-content: flex-end;
`;

export const ContainerApproveRejectArea = styled.div`
  float: right;
  display: flex;
  align-items: center;
`;

export const ApproveRejectArea = styled.div`
  display: flex;
  margin-left: 10px;
`;

export const TextBtn = styled.div`
  font-family: "Figtree";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  display: flex;
  align-items: center;
  letter-spacing: 0.12px;
  color: #484a55;
  flex: none;
  order: 1;
  flex-grow: 0;
  margin-left: 0px;
`;
