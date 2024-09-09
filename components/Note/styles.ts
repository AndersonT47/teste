import styled, { css } from "styled-components";

interface INoteParams {
  width?: string | number;
  height?: string | number;
  note?: boolean;
}

export const NoteWrapper = styled.div<INoteParams>`
  width: ${props => props.width || "100%"};
  height: ${props => props.height || "48px"};
  background: #FFFFFF;
  box-shadow: 0px 1px 2px rgba(37, 37, 39, 0.06);
  border-radius: 4px;
  padding: 0px 10px;
  cursor: pointer;
`;

export const PolygonTop = styled.div`
  width: 0; 
  height: 0; 
  position: absolute;
  margin: -8px 0px 0px 20px;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid #FFFFFF;
  cursor: pointer;
`;

export const PolygonLeft = styled.div`
  width: 0; 
  height: 0;
  position: absolute;
  margin: 11px 0px 0px -6px;
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent; 
  border-right: 8px solid #FFFFFF;
  cursor: pointer;
`;
export const ItemContainer = styled.div<INoteParams>`
  padding: 8px;
  display: flex;
  align-items: center;
  height: ${props => props.height || "48px"};
  width: ${props => props.width || "100%"};
  justify-content: space-between;
  cursor: pointer;
`;

export const Text = styled.a<INoteParams>`
  font-family: 'Figtree';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 21px;
  display: flex;
  align-items: center;
  letter-spacing: 0.12px;
  color: #CA303D;
  margin-left: 5px;
  ${(props) =>
    props.note &&
    css`
  font-family: 'Figtree';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 21px;
  display: flex;
  align-items: center;
  letter-spacing: 0.12px;
  color: #484A55;
  `}
`;
export const Button = styled.button`
  font-family: 'Figtree';
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  letter-spacing: 0.12px;
  background:none;
  border:none;
  margin:0;
  padding:0;
  cursor: pointer;
  :focus{
    box-shadow: 0 0 0 2px #4289F5;
    border-inline-end-width: 1px;
    outline: 0;
    }
`;