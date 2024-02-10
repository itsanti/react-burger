export const djb2Hash = (str) => {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    const charCode = str.charCodeAt(i);
    hash = (hash << 5) + hash + charCode;
  }
  return hash;
};

export const UUID4 = () => {
  return window.crypto.randomUUID();
};

export const swapElements = (array, from, to) => {
  const result = [...array];
  result[from] = result.splice(to, 1, result[from])[0];
  return result;
};
