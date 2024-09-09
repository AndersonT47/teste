import Tabs from "@/pages/app/dashboard/components/Tab";
import { MainContainer } from "./styled";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Dashboard() {
  const router = useRouter()
  useEffect(() => {
    router.replace('/app/dashboard')
  }, [])

  return (
    <MainContainer>
      <div
        style={{ paddingTop: 158, width: "100%", height: "100%" }}
        className="content-container"
      >
        <Tabs />
      </div>
    </MainContainer>
  );
}
