export function someApproved(arr: any[]) {
  return arr?.some((approver) => approver.result === "APPROVED");
}
export function somePartial(arr: any[]) {
  return arr?.some((approver) => approver.result === "PARTIAL");
}
export function someRejected(arr: any[]) {
  return arr?.some((approver) => approver.result === "REJECTED");
}
