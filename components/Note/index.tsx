import React from "react";
import Image from "next/image";
import ChatIcon from "@/assets/svg/chat.svg";
import EditIcon from "@/assets/svg/edit.svg";
import {
  Text,
  NoteWrapper,
  PolygonTop,
  PolygonLeft,
  ItemContainer,
  Button,
} from "./styles";
import { Tooltip } from "@mui/material";

interface INote {
  arrow: string;
  width?: string | number;
  height?: string | number;
  label: string;
  onEdit?: () => void;
}

const NoteCard = ({ arrow, width, height, label, onEdit }: INote) => {
  return (
    <NoteWrapper width={width} height={height} onClick={onEdit}>
      {arrow === "top" && <PolygonTop />}
      {arrow === "left" && <PolygonLeft />}
      <ItemContainer width={width} height={height}>
        <div onClick={onEdit} style={{ display: "flex" }}>
          <Image src={ChatIcon} width={24} height={24} alt="Chat" />
          {arrow === "top" ? <Text>{label}</Text> : <Text note>{label}</Text>}
        </div>
        {arrow === "top" && (
          <Tooltip arrow title="Edit" placement="top">
            <Button onClick={onEdit}>
              <Image src={EditIcon} width={24} height={24} alt="Edit" />
            </Button>
          </Tooltip>
        )}
      </ItemContainer>
    </NoteWrapper>
  );
};

export default NoteCard;
