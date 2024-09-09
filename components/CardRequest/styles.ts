import styled from "styled-components";

interface ICardRequestParams { }

export const CardWrapper = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 24px;
    gap: 16px;
    max-width: 576px;
    min-width: 285px;
    border: 1px dashed #B8B8B8;
    border-radius: 8px;
    flex: none;
    order: 2;
    align-self: stretch;
    flex-grow: 1;
`;
export const Text = styled.a`
    font-family: 'Figtree';
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