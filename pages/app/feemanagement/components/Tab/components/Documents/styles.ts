import styled, { css } from "styled-components";

interface IDocumentsParams {
  item?: boolean;
}

export const TextTitle = styled.a`
  font-family: "Figtree";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: 0.12px;
  color: #484a55;
  width: 90px;
  justify-content: flex-start;
`;

export const Text = styled.a`
  font-family: "Figtree";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: 0.12px;
  color: #636574;
  flex: none;
  order: 0;
  flex-grow: 0;
  width: 150px;
  justify-content: flex-start;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: auto;
`;
export const Divider = styled.div<IDocumentsParams>`
  width: 100%;
  border-bottom: 1px solid #dbdbdb;
  ${(p) =>
    p.item &&
    css`
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  `}
`;
export const Button = styled.div`
  display: flex;
  cursor: pointer;
  :focus {
    box-shadow: 0 0 0 2px rgba(5, 145, 255, 0.1);
    border-inline-end-width: 1px;
    outline: 0;
  }
`;
export const TableContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 12px 8px 12px 8px;
  @media (max-width: 768px) {
    justify-content: flex-start;
  }
`;
export const ButtonContainer = styled.div`
  display: flex;
  & > * {
    margin-right: 8px;
  }
  @media (max-width: 768px) {
    justify-content: flex-start;
  }
`;