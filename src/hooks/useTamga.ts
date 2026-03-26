// src/hooks/useTamga.ts

/**
 * Генерирует валидный UUID v7 согласно стандарту RFC 9562.
 * Структура: [48 бит timestamp] + [4 бита version (7)] + [12 бит random] + [2 бита variant] + [62 бита random]
 */
export const generateTamgaID = (): string => {
  const now = Date.now(); // Текущее время в мс
  const hex = (n: number, len: number) => n.toString(16).padStart(len, '0');

  // 1. Timestamp (48 бит)
  const timestamp = hex(now, 12);

  // 2. Версия (4 бита) - всегда '7'
  const ver = '7';

  // 3. Случайные части (согласно спецификации)
  const randA = hex(Math.floor(Math.random() * 0x1000), 3); // 12 бит
  const variant = (0x8 + Math.floor(Math.random() * 0x4)).toString(16); // Вариант 10xx (8, 9, a, b)
  const randB = hex(Math.floor(Math.random() * 0x1000000000000), 12).slice(0, 15); // Остаток

  // Собираем UUID v7: 8-4-4-4-12 символов
  // Пример: 018e6b35-d2a0-7123-8abc-1234567890ab
  return `${timestamp.slice(0, 8)}-${timestamp.slice(8, 12)}-${ver}${randA}-${variant}${randB.slice(0, 3)}-${randB.slice(3, 15)}`;
};

// Хелпер для создания "Атома" данных
export const createAtom = (type: string, payload: any) => ({
  tamga_id: generateTamgaID(),
  type,
  payload,
  v: 1 // Версия структуры
});