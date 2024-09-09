import styled from "styled-components";

export const Container = styled.div`
    position: absolute;
    width: 450px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #FFFFFF;
    box-shadow: 0px 8px 12px rgba(37, 37, 39, 0.08);
    border-radius: 8px;
    padding: 24px;
    :focus{
    box-shadow: 0 0 0 2px rgba(5, 145, 255, 0.1);
    border-inline-end-width: 1px;
    outline: 0;
    /* border: 2px solid #1C77CF; */
    }
`;
export const Title = styled.a`
    font-family: 'Figtree';
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 27px;
    display: flex;
    align-items: center;
    letter-spacing: 0.12px;
    color: #CA303D;
    flex: none;
    order: 0;
    flex-grow: 1;
`;
export const Subtitle = styled.a`
    font-family: 'Figtree';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 21px;
    display: flex;
    align-items: center;
    letter-spacing: 0.12px;
    color: #636574;
`;
export const Text = styled.a`
    font-family: 'Figtree';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    display: flex;
    align-items: center;
    text-align: center;
    letter-spacing: 0.12px;
    color: #1E2347;
    flex: none;
    order: 0;
    flex-grow: 0;
`;
