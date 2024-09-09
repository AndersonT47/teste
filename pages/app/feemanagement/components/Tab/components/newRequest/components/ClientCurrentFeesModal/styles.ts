import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  width: 650px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #ffffff;
  box-shadow: 0px 8px 12px rgba(37, 37, 39, 0.08);
  border-radius: 8px;
  padding: 24px;
  overflow: auto;
  max-height: 700px;
  :focus {
    box-shadow: 0 0 0 2px rgba(5, 145, 255, 0.1);
    border-inline-end-width: 1px;
    outline: 0;
  }
`;
export const Title = styled.a`
  font-family: "Figtree";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 27px;
  display: flex;
  align-items: center;
  letter-spacing: 0.12px;
  color: #1e2347;
  flex: none;
  order: 0;
  flex-grow: 1;
`;
export const Text = styled.span`
  font-family: "Figtree";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: 0.12px;
  color: #484a55;
`;
export const TextThin = styled.span`
  font-family: "Figtree";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: 0.12px;
  color: #636574;
`;
export const TableContainer = styled.div`
  display: table;
  width: 100%;
`;

export const TableRow = styled.div`
  display: table-row;
`;

export const TableCell = styled.div`
  display: table-cell;
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #dbdbdb;
`;
