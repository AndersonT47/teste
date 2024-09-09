import React from "react";
import { BadgeWrapper, BadgeText } from './styles'

interface IBadge {
  label: string;
  color: string;
}

const Badge = ({ label, color }: IBadge) => {
  return (
    <BadgeWrapper color={color}>
      <BadgeText>{label}</BadgeText>
    </BadgeWrapper>
  )
};

export default Badge;
