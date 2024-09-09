import React, { useState } from "react";
import Image from "next/image";
import { MainContainer, Text } from "./styles";
import ImpersonateIcon from "../../../assets/svg/impersonate-icon.svg";
import Button from "@/@core/components/Button";
import TextField from "@/@core/components/TextField";
import { ImpersonateProvider } from "@/services/impersonateProvider";
import {
  FeeManagementData,
  useFeeManagementStore,
} from "@/@core/store/feeManagementStore";

export default function Impersonate() {
  const [selfUserId, setSelfUserId] = useState("");
  const [newUserId, setNewUserId] = useState("");
  const { newImpersonate } = ImpersonateProvider();
  const { setFeeData } = useFeeManagementStore((state) => state);

  const handleClick = () => {
    newImpersonate({
      userName: selfUserId,
      userNameImpersonate: newUserId,
    });
    setFeeData({} as FeeManagementData);
    console.log(setFeeData);
  };

  return (
    <MainContainer>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
        className="content-container"
      >
        <Image
          src={ImpersonateIcon}
          width={150}
          height={100}
          alt="impersonate"
        />
        <div
          style={{
            display: "flex",
            justifyContent: "left",
            flexDirection: "column",
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "row", alignItems: "end" }}
          >
            <div>
              <Text>Your User ID</Text>
              <TextField
                placeholder="Enter your User ID"
                width="300px"
                height="40px"
                fontSize="14px"
                onChange={(text) => setSelfUserId(text)}
              />
            </div>
            <div style={{ marginLeft: 15 }}>
              <Text>User ID you want to impersonate</Text>
              <TextField
                placeholder="Enter User ID"
                width="300px"
                height="40px"
                fontSize="14px"
                onChange={(text) => setNewUserId(text)}
              />
            </div>
            <div>
              <Button
                style={{ width: 150, marginLeft: 15 }}
                onClick={handleClick}
                disabled={[selfUserId, newUserId].includes("")}
              >
                Impersonate
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainContainer>
  );
}
