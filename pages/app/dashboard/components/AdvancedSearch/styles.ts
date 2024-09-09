import styled from "styled-components";

interface AdvancedSearchProps {
  mr?: number;
  ml?: number;
}
export const ButtonText = styled.a`
  font-family: "Figtree";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 21px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 0.12px;
  color: #1e2347;
  flex: none;
  order: 0;
  flex-grow: 0;
`;

export const SText = styled.a`
  font-family: "Figtree";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  display: flex;
  align-items: center;
  letter-spacing: 0.12px;
  color: #636574;
  flex: none;
  margin-right: 8px;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
`;
export const Flex = styled.div<AdvancedSearchProps>`
  flex: 1;
  display: flex;
  margin-right: ${(props) => props.mr}px;
  margin-left: ${(props) => props.ml}px;
`;
export const Container = styled.div`
  display: flex;
  width: 100%;
`;
