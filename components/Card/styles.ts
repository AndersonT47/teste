import styled from "styled-components";

interface ICardParamns {
  type?: "primary" | "secondary" | "success" | "error" | undefined;
  color?: string;
  ml?: number | string;
  mr?: number | string;
  margin?: number | string;
}

const type = {
  primary: "#F7F7F8",
  secondary: "#FFFFFF",
  success: "#E6F2EE",
  error: "#FBEAEA",
};

const border = {
  primary: "transparent",
  secondary: "#DBDBDB",
};

export const CardWrapper = styled.div<Partial<ICardParamns>>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 24px;
  gap: 16px;
  min-width: 285px;
  max-width: 31.65%;
  margin: ${(props) => props.margin};

  background: ${(props) =>
    props.type === "primary"
      ? type.primary
      : props.type === "secondary"
      ? type.secondary
      : props.type === "success"
      ? type.success
      : props.type === "error"
      ? type.error
      : null};
  border-color: ${(props) =>
    props.type === "primary"
      ? border.primary
      : props.type === "secondary"
      ? border.secondary
      : props.type === "success"
      ? border.primary
      : props.type === "error"
      ? border.primary
      : null};
  border-width: 1px;
  border-style: solid;
  border-radius: 8px;
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 1;
`;
export const CardTitle = styled.a`
  font-family: "Figtree";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 27px;
  display: flex;
  align-items: center;
  letter-spacing: 0.12px;
  color: #636574;
  flex: none;
  order: 0;
  flex-grow: 0;
`;
export const CardText = styled.a`
  font-family: "Figtree";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  display: flex;
  align-items: center;
  letter-spacing: 0.12px;
  color: #636574;
`;
export const Div = styled.div`
  display: flex;
  align-items: center;
`;
export const InputDiv = styled.div`
  display: flex;
  margin-bottom: 6px;
`;
export const TextNote = styled.a`
  font-family: "Figtree";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  display: flex;
  align-items: center;
  letter-spacing: 0.12px;
  color: #484a55;
  flex: none;
  order: 1;
  flex-grow: 1;
`;
export const Divider = styled.div<ICardParamns>`
  width: 100%;
  height: 10px;
  border-top: 1px dashed;
  border-color: ${(props) => props.color};
`;
