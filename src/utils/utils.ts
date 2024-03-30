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

export const getCurrentTimestamp = (): number => new Date().getTime() / 1000;

export const dateFormat = (dateStr: string): string => {
  const date = new Date(dateStr);
  const now = new Date();
  const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) {
    return 'Сегодня, ' + date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  } else if (diffInDays === 1) {
    return 'Вчера, ' + date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  } else if (diffInDays === 2) {
    return '2 дня назад, ' + date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  } else {
    return date.toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' });
  }
};
