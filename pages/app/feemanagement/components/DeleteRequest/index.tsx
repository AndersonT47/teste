import React, { useState } from "react";
import Image from "next/image";
import Button from "@/@core/components/Button";
import animationData from "@/assets/animation/green-check-mark.json";
import ErrorCircleIcon from "@/assets/svg/error-circle-color.svg";
import {
  Text,
} from "./styles";

interface IDeleteRequest { }

const DeleteRequest = ({ }: IDeleteRequest) => {

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <Image src={ErrorCircleIcon} width={65} height={65} alt="Close" />
      <div style={{ display: "flex", margin: "4px 0px 24px 0px" }}>
        <Text>
          The request has been deleted.
        </Text>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button style={{ width: "158px" }}>
          Go to Dashboard
        </Button>
      </div>
    </div>
  )
};

export default DeleteRequest;
