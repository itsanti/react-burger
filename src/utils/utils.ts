export const djb2Hash = (str: string): number => {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    const charCode = str.charCodeAt(i);
    hash = (hash << 5) + hash + charCode;
  }
  return hash;
};

export const UUID4 = (): string => {
  return window.crypto.randomUUID();
};

export const swapElements = <T>(array: T[], from: number, to: number): T[] => {
  const result = [...array];
  result[from] = result.splice(to, 1, result[from])[0];
  return result;
};
