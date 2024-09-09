import styled, { css } from "styled-components";

interface IPaperParamns {
    bold?: boolean;
    width?: number | string;
    margin?: number | string;
}
export const PaperWrapper = styled.div<IPaperParamns>`
    display: flex;
    min-width: ${props => props.width};
    margin: ${props => props.margin || "0"};
    height: 66px;
    background: #F7F7F8;
    border-radius: 4px;
    padding: 12px 16px;
    align-items: center;
    justify-content: space-between;
    flex: none;
    order: 1;
    flex-grow: 1;
`;

export const Text = styled.a<IPaperParamns>`
    font-family: 'Figtree';
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
    align-self: stretch;
    flex-grow: 0;
    ${(props) =>
        props.bold &&
        css`
    font-weight: 600;
    flex: none;
    order: 1;
    align-self: stretch;
    flex-grow: 0;
  `}
`;