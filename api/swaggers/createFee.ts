export const createFee = {
  cif: "string",
  customerName: "string",
  customerAddress: "string",
  customerAccountOfficer: "string",
  applicationName: 0,
  userOwner: "string",
  currentActivity: "string",
  reason: "string",
  documents: ["string"],
  fees: [
    {
      id: "string",
      feeType: "Customer Fee",
      feeGroups: [
        {
          id: "string",
          name: "string",
          code: 0,
          accountNumber: "string",
          entityType: "string",
          visible: "Unknown Type: boolean,",
          fields: [
            {
              id: "string",
              name: "Account Maintenance / Hold Mail / Safekeeping-Custody",
              code: 0,
              isStandard: true,
              isCurrentClient: true,
              isException: true,
              hasChanged: true,
              defaultValue: "string",
              excepitionOptions: [
                {
                  value: 0,
                  text: "Unknown Type: [object Object]",
                },
              ],
              createdAt: "2023-05-20T16:25:31.435Z",
              updatedAt: "2023-05-20T16:25:31.435Z",
            },
          ],
        },
      ],
    },
  ],
};
