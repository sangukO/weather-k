export const getShortAddress = (fullAddress: string) => {
  const parts = fullAddress.split(" ");
  return parts.length >= 2 ? parts.slice(-2).join(" ") : fullAddress;
};
