import api from "@/@core/api";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import uploadDocument from "@/assets/svg/upload-document.svg";
import { apiPathAddress } from "@/@core/api/apiAddress";
import { useDocumentStore } from "@/@core/store/documents";
import ProgressBar from "../ProgressBar";
import { DropzoneWrapper, UploadButton, Text } from "./styles";

interface DocumentUpload {
  onError: (
    reason: "Large" | "UploadError" | "NotSupported" | "Upload"
  ) => void;
}
interface DocumentUploaded {
  documentName: string;
  documentSize: string;
  documentStatus: string;
  documentURL: string;
  documentURLPreview: string;
  createdAt?: string | number | Date;
}

const DragDropUpload: React.FC<DocumentUpload> = (props) => {
  const [files, setFiles] = useState<File[]>([]);
  const [progress, setProgress] = useState(0);
  const { setDocumentList, documentList } = useDocumentStore((state) => state);
  const { onError } = props;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const newFiles = Array.from(e.dataTransfer.files);
    setFiles([...files, ...newFiles]);
    const uploadedDocuments: DocumentUploaded[] = newFiles.map(
      (document: any) => ({
        documentName: document.name,
        documentSize: document.size,
        documentStatus: document.status,
        documentURL: URL.createObjectURL(document),
        documentURLPreview: URL.createObjectURL(document),
      })
    );
    if (e.dataTransfer.files) {
      handleFileValidation(e.dataTransfer.files[0]);
    }
    setDocumentList([...documentList, ...uploadedDocuments]);
    onError("Upload");
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files!);
    setFiles([...files, ...newFiles]);
    const uploadedDocuments: DocumentUploaded[] = newFiles.map(
      (document: any) => ({
        documentName: document.name,
        documentSize: document.size,
        documentStatus: document.status,
        documentURL: URL.createObjectURL(document),
        documentURLPreview: URL.createObjectURL(document),
      })
    );
    if (e.target.files) {
      handleFileValidation(e.target.files[0]);
    }
    setDocumentList([...documentList, ...uploadedDocuments]);
    if (fileInputRef && fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onError("Upload");
  };

  const handleUpload = async (file: File) => {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("application", "feeMangementTemp");
    try {
      const response = await api.post(
        apiPathAddress.uploadDocuments,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // console.log(response.data); // Processar a resposta do servidor

      const uploadedDocuments: DocumentUploaded[] = response.data.map(
        (document: any) => ({
          documentName: document.name,
          documentSize: document.size,
          documentStatus: document.status,
          documentURL: document.url,
          documentURLPreview: document.url,
        })
      );
      setDocumentList([...documentList, ...uploadedDocuments]);
    } catch (error) {
      console.error(error);
      onError("UploadError");
    }
  };

  const isFileSupported = (file: File) => {
    const supportedExtensions = [
      ".pdf",
      ".eml",
      ".doc",
      ".xls",
      ".xlsx",
      ".scv",
      ".png",
      ".jpg",
    ];
    const fileExtension = file.name.split(".").pop();
    return supportedExtensions.includes(`.${fileExtension}`);
  };

  const isFileSizeValid = (file: File) => {
    const maxSizeInBytes = 10 * 1024 * 1024; // 10 MB
    return file.size <= maxSizeInBytes;
  };

  const handleFileValidation = (file: File) => {
    if (file) {
      if (!isFileSupported(file)) {
        onError("NotSupported");
        return;
      }
      if (!isFileSizeValid(file)) {
        onError("Large");
        return;
      }
      handleUpload(file);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + 10;
        return newProgress <= 100 ? newProgress : 0;
      });
    }, 1000 * 10);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <DropzoneWrapper onDrop={handleDrop} onDragOver={handleDragOver}>
        <UploadButton htmlFor="file-input">
          <Image src={uploadDocument} width={48} height={48} alt="info" />
          <Text>Drag and drop your files here</Text>
          <Text>
            Accepted file types: .pdf, .eml, .doc, .docx, .xls, .xlsx, .csv, .png, or
            .jpg (max 10 MB)
          </Text>
          <input
            id="file-input"
            type="file"
            accept=".pdf, .eml, .doc, .docx, .xls, .xlsx, .csv, .png, .jpg"
            onChange={handleFileInputChange}
            multiple
            ref={fileInputRef}
            style={{ display: "none" }}
          />
          {/* <ProgressBar progress={progress} style={{ width: 156 }} /> */}
        </UploadButton>
      </DropzoneWrapper>
    </div>
  );
};

export default DragDropUpload;
