import styled from "styled-components";

interface ICifRequestParams {
  clicked?: boolean;
}

export const ButtonWrapper = styled.button<ICifRequestParams>`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 6px 12px;
  gap: 8px;
  height: 33px;
  background:  ${props => props.clicked ? '#1E2347' : '#FFFFFF'};
  border: ${props => props.clicked ? "transparent" : '1px solid #DBDBDB'};
  border-radius: 4px;
  flex: none;
  order: 0;
  flex-grow: 0;
  font-family: 'Figtree';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 0.12px;
  color:  ${props => props.clicked ? '#FFFFFF' : '#484A55'};
  cursor: pointer;
  &:focus{
    box-shadow: 0 0 0 0px rgba(5, 145, 255, 0.1);
    border-inline-end-width: 1px;
    outline: 0;
    }
`;