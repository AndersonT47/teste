import { CurrentFees, FeeManagementData } from "@/@core/store/feeManagementStore";

interface FeeOption {
  value: string;
  text: string;
  visible: boolean;
  _id: string;
}

interface FeeField {
  code: number;
  isStandard: boolean;
  isCurrentClient: boolean;
  isException: boolean;
  name: string;
  defaultValue: string;
  labelValue: string;
  hasChanged: boolean;
  exceptionOptions: FeeOption[];
  createdAt: string;
  updatedAt: string;
  id: string;
}

interface FeeGroup {
  name: string;
  code: number;
  fields: FeeField[];
  cif: string;
  accountNumber: string;
  visible: boolean;
  createdAt: string;
  updatedAt: string;
  id: string;
}

interface Fee {
  feeType: string;
  feeGroups: FeeGroup[];
  cif: string;
  accountNumber: string;
  visible: boolean;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface FeeData {
  code: number;
  data: {
    caseId: string;
    caseNumber: string;
    cif: string;
    customerName: string;
    customerAddress: string;
    customerAccountOfficer: string;
    fees: Fee[];
    createdAt: string;
    updatedAt: string;
    id: string;
    feesActives: FeeActive[];
    documentUrl: string;
    status: string;
    userOwner: string;
    usersApprovers: any[];
    equityTeam: any[];
    secopsTeam: any[];
    __v: number;
    documents: any[];
    canApprove: boolean;
    currentFees: CurrentFees[];
  };
}

interface FeeActive {
  caseNumber: string;
  id: string;
}
