export default function filterApproverResult(Arr: any[]) {
  const allowedResults = ["REJECTED", "PARTIAL", "APPROVED"];
  return Arr?.filter((approver: { result: string }) =>
    allowedResults.includes(approver?.result)
  );
}
