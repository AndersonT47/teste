import React, { Fragment } from "react";
import Text from "@/@core/components/Text";
import SearchAutocomplete from "@/@core/components/SearchAutocomplete";
import { Container, HeaderWrapper, SearchContainer } from "./styles";

interface IHeaderOptions {
  routeTitle: string;
}

const HeaderOptions = (params: IHeaderOptions) => {
  const SearchComponent =
    params.routeTitle === "Fee Management" ? (
      <SearchAutocomplete placeholder="Enter CIF or Short Name to start" />
    ) : null;
  return (
    <HeaderWrapper>
      <Container>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "600",
            color: "#484A55",
            marginLeft: 24,
          }}
        >
          {params.routeTitle}
        </Text>
        <SearchContainer>{SearchComponent}</SearchContainer>
      </Container>
    </HeaderWrapper>
  );
};

export default HeaderOptions;
