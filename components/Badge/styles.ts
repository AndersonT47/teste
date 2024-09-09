import styled from 'styled-components';

interface IBadgeParams {
  color: string;
}

export const BadgeWrapper = styled.div<IBadgeParams>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px 2px;
  width: 24px;
  height: 24px;
  background: ${props => props.color};
  border-radius: 13px;
  flex: none;
  order: 1;
  flex-grow: 0;
`;

export const BadgeText = styled.a`
  font-family: 'Figtree';
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 18px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 0.12px;
  color: #FFFFFF;
  flex: none;
  order: 0;
  flex-grow: 0;
`;