import { FooterWrapper, Text } from "./styles";

export default function Footer() {
  return (
    <FooterWrapper>
      <Text>© {Date().match("2023")}. Safra National Bank of New York.</Text>
    </FooterWrapper>
  );
}
