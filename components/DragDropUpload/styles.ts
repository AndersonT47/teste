import styled from "styled-components";

interface IDragDropParams {}

export const DropzoneWrapper = styled.div`
  display: flex;
  width: 100%;
`;
export const SelectedFiles = styled.div`
  margin-top: 16px;
`;
export const UploadButton = styled.label`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 24px;
  gap: 16px;
  width: 100%;
  height: 216px;
  background: #f7f7f8;
  border: 1px dashed #b8b8b8;
  border-radius: 8px;
  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
  cursor: pointer;
`;
export const Text = styled.a`
  font-family: "Figtree";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 0.12px;
  color: #636574;
  flex: none;
  order: 1;
  flex-grow: 0;
`;
