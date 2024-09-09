import styled from "styled-components";

interface INotificationParams {
  color: "primary" | "error" | "success" | "warning";
}

const colors = {
  primary: "#007bff",
  error: "#FBEAEA",
  success: "#28a745",
  warning: "#FEF8E8",
};

export const Wrapper = styled.div<INotificationParams>`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px;
  gap: 8px;
  height: 48px;
  background: ${(props) => colors[props.color] || colors.primary};
  border-radius: 4px;
  flex: none;
  align-self: stretch;
  flex-grow: 0;
`;

export const Text = styled.a`
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
  flex-grow: 0;
`;
