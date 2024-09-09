import { feeAprovalFlow } from "@/@core/api/swaggers/feee";
import { newFee } from "@/@core/api/swaggers/newfees";
import { create } from "zustand";

export interface FeeGroup {
  visible: boolean;
  name: string;
  code: number;
  fields: FeeField[];
  id: string;
  cif: string;
  accountNumber?: string;
  entityCode?: string;
  kycMailingStatus?: string;
  open?: boolean;
  approvalResults?: Array<Object>;
}

export interface FeeField {
  hasChanged: boolean;
  code: number;
  isStandarOption: boolean;
  isCurrentyClient: boolean;
  isException: boolean;
  name: string;
  defaultValue: string;
  exceptionOptions: ExceptionOption[];
  createdAt: string;
  updatedAt: string;
  id: string;
  labelValue: string;
  approved?: boolean;
  tooltip?: string;
  reject?: boolean;
  rejectComment?: string;
  valueChanged?: string;
  defaultLabelValue?: string;
}

export interface ExceptionOption {
  value: string;
  text: string;
  visible: boolean;
  _id: string;
  labelValue: string;
}

export interface CurrentFees {
  ddaNumber: number;
  bpsAcctNumber: string;
  feeDescription: string;
  entity: string;
  feeCode: string;
  feeAmmount: number;
}

interface FeeActive {
  id: string;
  caseNumber: string;
  clicked?: boolean;
}

export interface UsersApprovers {
  userName: string;
  userNameFull: string;
  signature: string;
  createdAt: string;
  updatedAt: string;
  result: string;
  id: string;
}

export interface FeeManagementData {
  code: number;
  data: {
    customerName: string;
    customerAddress: string;
    customerAccountOfficer: string;
    cif: string;
    fees: Fee[];
    feesActives: FeeActive[];
    documentUrl: string[];
    currentFees: CurrentFees[];
    caseId: string;
    caseNumber: string;
    createdAt: string;
    updatedAt: string;
    id: string;
    status: string;
    userOwner: string;
    userOwnerName: string;
    usersApprovers: UsersApprovers[];
    equityTeam: UsersApprovers[];
    secopsTeam: UsersApprovers[];
    __v: number;
    documents: any[];
    canApprove?: boolean;
    canEditEquity?: boolean;
    canEditSecops?: boolean;
    canSeeRevenueReport: boolean;
    reason?: string;
    signatureApprover?: string;
    levelApproverType?: string;
  };
}

export interface FeeManagementDataCreate {
  code: number;
  data: {
    cif: string;
    customerName: string;
    customerAddress: string;
    customerAccountOfficer: string;
    applicationName: string;
    userOwner: string;
    reason: string;
    fees: Fee[];
    feesActives: FeeActive[];
    documentUrl: string[];
    currentFees: CurrentFees[];
    currentActivity: string;
  };
}

interface Fee {
  feeType: string;
  feeGroups: FeeGroup[];
  id: string;
}

export interface FeeManagementDataUpdate {
  userUpdate: string;
  feeCase: {
    id: string;
    fees: Fee[];
  };
}

export interface FeeManagementRejectGroup {
  feePosition: number;
  feeGroup: number;
  fieldPosition: number;
}

interface FeeManagementStore {
  isAprovalFlowDone: boolean;
  isNewRequestFlow: boolean;
  setIsAprovalFlowDone: (isAprovalFlow: boolean) => void;
  setIsNewRequestFlow: (isNewRequestFlow: boolean) => void;
  newFeeRequestId: string;
  setNewFeeRequestId: (newFeeRequestId: string) => void;
  feeData: FeeManagementData;
  setFeeData: (feeData: FeeManagementData) => void;
  feeApprovedData: FeeManagementData;
  setFeeApprovedData: (feeApprovedData: FeeManagementData) => void;
  newFeeRequest: FeeManagementData;
  setNewFeeRequest: (newFeeRequest: FeeManagementData) => void;
  rejectGroup: FeeManagementRejectGroup;
  setRejectGroup: (newRejectGroup: FeeManagementRejectGroup) => void;
}

export const useFeeManagementStore = create<FeeManagementStore>((set) => ({
  isAprovalFlowDone: false,
  isNewRequestFlow: false,
  setIsAprovalFlowDone: (payload: boolean) => {
    set({ isAprovalFlowDone: payload });
  },
  setIsNewRequestFlow: (payload: boolean) => {
    set({ isNewRequestFlow: payload });
  },
  feeData: {} as FeeManagementData,
  setFeeData: (payload: FeeManagementData) => {
    set({ feeData: payload });
  },
  feeApprovedData: {} as FeeManagementData,
  setFeeApprovedData: (payload: FeeManagementData) => {
    set({ feeApprovedData: payload });
  },
  newFeeRequest: {} as FeeManagementData,
  setNewFeeRequest: (payload: FeeManagementData) => {
    set({ newFeeRequest: payload });
  },
  newFeeRequestId: "",
  setNewFeeRequestId: (payload: string) => {
    set({ newFeeRequestId: payload });
  },
  rejectGroup: {} as FeeManagementRejectGroup,
  setRejectGroup: (payLoad: FeeManagementRejectGroup) => {
    set({ rejectGroup: payLoad });
  },
}));
