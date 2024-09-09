import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  width: 600px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #ffffff;
  box-shadow: 0px 8px 12px rgba(37, 37, 39, 0.08);
  border-radius: 8px;
  padding: 24px;
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
  text-align: center;
  letter-spacing: 0.12px;
  color: #1e2347;
`;

export const Text = styled.a`
  font-family: "Figtree";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  /* identical to box height, or 150% */

  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 0.12px;

  /* text/light/$text-secondary */

  color: #636574;

  /* Inside auto layout */

  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
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

export const TextArea = styled.div`
  margin-bottom: 35px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;
