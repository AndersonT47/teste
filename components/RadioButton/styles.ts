import styled, { css } from "styled-components";

interface IRadioButtonParams { }

export const RadioButtonWrapper = styled.label`
    display: flex;
    margin-bottom: 2px;
        input[type='radio'] {
            margin-right: 10px;
            width: 18px;
            height: 18px;
            border-radius: 50%;
            border: 2px solid #8A8C98;
            outline: none;
            appearance: none;
            background: #FFFFFF;
            transition: all 0.3s ease;
            cursor: pointer;
                &:checked {
                    background: #1E2347;
                    border-color: #1E2347;
                    box-shadow: inset 0 0 0 2.5px #FFFFFF;
            }
  }
`;

export const Text = styled.span`
    font-family: 'Figtree';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 21px;
    letter-spacing: 0.12px;
    color: #484A55;
    flex: none;
    order: 1;
    flex-grow: 1;
`;