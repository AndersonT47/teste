import React from "react";
import Image from "next/image";
import { Wrapper, Text } from "./styles";

interface INotification {
  label: string;
  type: "primary" | "error" | "success" | "warning";
  icon: string;
  style?: React.CSSProperties;
}

const Notification = ({ label, type, icon, style }: INotification) => {
  return (
    <Wrapper color={type} style={{ ...style }}>
      <Image src={icon} width={24} height={24} alt="icon" />
      <Text>{label}</Text>
    </Wrapper>
  );
};

export default Notification;
