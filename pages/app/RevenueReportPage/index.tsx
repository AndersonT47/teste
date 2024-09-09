import React from "react";
import { useRouter } from "next/router";
import { MainContainer } from "./styles";



export default function RevenueReportPage() {
  const router = useRouter()

  if (router.query.url && typeof (router.query.url) == "string") {
    return (
      <MainContainer>
        {document.location.href = router.query.url}
      </MainContainer>
    );
  }
  else {
    return (<></>);
  }

}

