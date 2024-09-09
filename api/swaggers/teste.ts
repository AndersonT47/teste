export const createFee = {
  caseId: {},
  caseNumber: {},
  cif: {},
  customerName: {},
  customerAddress: {},
  customerAccountOfficer: {},
  fees: {
    //type: [FeeSchema],
  },
  usersApprovers: {
    userName: {},
    userNameFull: {},
    email: {},
    signature: {},
    result: {
      enum: ["REJECTED", "PARTIAL", "APPROVED"],
    },
  },
  equityTeam: {
    userName: {},
    userNameFull: {},
    email: {},
    signature: {},
    result: {
      enum: ["REJECTED", "PARTIAL", "APPROVED"],
    },
  },
  secopsTeam: {
    userName: {},
    userNameFull: {},
    email: {},
    signature: {},
    result: {
      enum: ["REJECTED", "PARTIAL", "APPROVED"],
    },
  },
  reason: {
    maxLength: 255,
  },
  documents: {},
  status: {
    enum: [
      "INITIAL",

      "PENDING_APPROVAL",

      "PENDING_EQUITY",

      "PENDING_SECOPS",

      "REJECTED",

      "DONE",
    ],
  },
  userOwner: {},
  userOwnerName: {},
  userOwnerEmail: {},
};
