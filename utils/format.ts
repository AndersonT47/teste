export const formatData = (data: string | undefined) => {
  if (data) {
    return new Date(data)
      .toLocaleString("en-US", {
        month: "numeric",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      })
      .replace(",", "");
  }
  return "";
};
