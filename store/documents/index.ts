import { create } from "zustand";

interface DocumentUploaded {
  createdAt?: string | number | Date;
  documentName: string;
  documentSize?: string;
  documentStatus?: string;
  documentURL?: string;
  documentURLPreview?: string;
}

export interface DocumentLinkData {
  code: number;
  data: {
    url: string;
    urlPreview: string;
  };
}

export interface FeeDocuments {
  documentList: DocumentUploaded[];
  setDocumentList: (documentList: DocumentUploaded[]) => void;
}

export const useDocumentStore = create<FeeDocuments>((set) => ({
  documentList: [],
  setDocumentList: (document: DocumentUploaded[]) => {
    const documentsWithoutSpaces = document.map((doc) => {
      const documentName = doc.documentName.replace(/\s/g, "_");
      return { ...doc, documentName };
    })
    set({ documentList: documentsWithoutSpaces });
  },
}));
