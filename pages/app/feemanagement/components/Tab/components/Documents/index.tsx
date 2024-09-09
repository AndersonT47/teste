import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Tooltip } from "@mui/material";
import DragDropUpload from "@/@core/components/DragDropUpload";
import VisibleOffIcon from "@/assets/svg/visibility-off.svg";
import DeleteIcon from "@/assets/svg/delete.svg";
import DownloadIcon from "@/assets/svg/download.svg";
import errorCloseIcon from "@/assets/svg/error-circle-color.svg";
import WarningIcon from "@/assets/svg/warning-color.svg";
import {
  TextTitle,
  Text,
  Divider,
  Button,
  TableContainer,
  ButtonContainer,
} from "./styles";
import Notification from "@/@core/components/Notification";
import { useDocumentStore } from "@/@core/store/documents";
import { useAuthStore } from "@/@core/store";
import { useFeeManagementStore } from "@/@core/store/feeManagementStore";
import { formatData } from "@/@core/utils/format";
import { FeeManagenmetProvider } from "@/services/feeManagementProvider";

export default function Documents() {
  const [uploadError, setUploadError] = useState<boolean>(false);
  const [notSupported, setNotSupported] = useState<boolean>(false);
  const [tooLarge, setTooLarge] = useState<boolean>(false);
  const [upload, setUpload] = useState<boolean>(false);

  const { documentList, setDocumentList } = useDocumentStore((state) => state);
  const { feeData } = useFeeManagementStore((state) => state);
  const { userData } = useAuthStore((state) => state);
  const { getFeeDocumentLink } = FeeManagenmetProvider();

  useEffect(() => {
    const feeDocuments = feeData?.data?.documents;
    if (feeDocuments?.length > 0) {
      const newDocumentList: any = [];
      feeDocuments.forEach((documentName) => {
        getFeeDocumentLink(documentName).then((response) => {
          newDocumentList.push({
            documentName: documentName,
            documentURL: response.data.data.url,
            documentURLPreview: response.data.data.urlPreview,
          });
          setDocumentList(newDocumentList);
        });
      });
    }
  }, [feeData]);

  const handleSetError = (
    reason: "Large" | "UploadError" | "NotSupported" | "Upload"
  ) => {
    if (reason === "Large") setTooLarge(true);
    if (reason === "UploadError") setUploadError(true);
    if (reason === "NotSupported") setNotSupported(true);
    if (reason === "Upload") setUpload(true);
  };

  const handleDelete = (documentName: string) => {
    const updatedDocumentList = documentList.filter(
      (item) => item.documentName !== documentName
    );
    setDocumentList(updatedDocumentList);
  };

  const handleDownload = (documentName: string) => {
    const updatedDocumentList = documentList.filter(
      (item) => item.documentName === documentName
    );
    const link: HTMLAnchorElement = document.createElement("a");
    link.setAttribute("href", updatedDocumentList[0].documentURL ?? "");
    link.setAttribute("download", documentName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleViewDocument = (documentName: string) => {
    const updatedDocumentList = documentList.filter(
      (item) => item.documentName === documentName
    );
    const link: HTMLAnchorElement = document.createElement("a");
    link.setAttribute("href", updatedDocumentList[0].documentURLPreview ?? "");
    link.setAttribute("target", "_blank");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <div>
        {feeData.data?.caseId && uploadError && (
          <Notification
            type="error"
            icon={errorCloseIcon}
            label="An error occurred when uploading your file. Please try again."
            style={{ marginBottom: 15 }}
          />
        )}
        {notSupported && (
          <Notification
            type="error"
            icon={errorCloseIcon}
            label="This document type is not supported."
            style={{ marginBottom: 15 }}
          />
        )}
        {tooLarge && (
          <Notification
            type="error"
            icon={errorCloseIcon}
            label="The document is larger than supported. Please upload a file up to 10 MB."
            style={{ marginBottom: 15 }}
          />
        )}
      </div>
      {!feeData.data?.caseId && <DragDropUpload onError={handleSetError} />}
      {upload && (
        <Notification
          type="warning"
          icon={WarningIcon}
          label="The uploaded files will be saved only when submitting the request from the 'New Request' tab."
          style={{
            marginBottom: 17,
            marginTop: 17,
            border: "1px solid #fae9b5",
          }}
        />
      )}
      {documentList.length > 0 && (
        <>
          <TableContainer>
            <TextTitle style={{ width: "55%" }}>File</TextTitle>
            <TextTitle>Uploaded By</TextTitle>
            <TextTitle>Upload Date</TextTitle>
            <TextTitle>Actions</TextTitle>
          </TableContainer>
          <Divider />
          {documentList.map((item) => (
            <React.Fragment key={item.documentName}>
              <TableContainer>
                <Text style={{ width: "52%" }}>{item.documentName}</Text>
                <Text>{feeData.data?.userOwner ?? userData.userName}</Text>
                <Text>
                  {item.createdAt ? formatData(`${item.createdAt}`) : "-"}
                </Text>
                <ButtonContainer>
                  <Tooltip arrow placement="top" title="Preview">
                    <Button
                      onClick={(e) => handleViewDocument(item.documentName)}
                    >
                      <Image
                        src={VisibleOffIcon}
                        width={20}
                        height={20}
                        alt={"Visible Off"}
                      />
                    </Button>
                  </Tooltip>
                  <Tooltip arrow placement="top" title="Download">
                    <Button onClick={() => handleDownload(item.documentName)}>
                      <Image
                        src={DownloadIcon}
                        width={20}
                        height={20}
                        alt={"Download"}
                      />
                    </Button>
                  </Tooltip>
                  {!feeData.data?.caseId && (
                    <Tooltip arrow placement="top" title="Delete">
                      <Button onClick={() => handleDelete(item.documentName)}>
                        <Image
                          src={DeleteIcon}
                          width={20}
                          height={20}
                          alt={"Delete"}
                        />
                      </Button>
                    </Tooltip>
                  )}
                </ButtonContainer>
              </TableContainer>
              <Divider item />
            </React.Fragment>
          ))}
        </>
      )}
    </div>
  );
}
