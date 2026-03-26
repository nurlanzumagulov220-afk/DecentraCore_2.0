import Dexie, { Table } from 'dexie';

// Описываем структуру нашего Атома данных
export interface Atom {
  tamga_id: string;      // Наш UUID v7
  type: string;          // Тип данных (task, asset, user и т.д.)
  payload: any;          // Сами данные
  synced: number;        // Статус синхронизации: 0 - нет, 1 - да
  updated_at: number;    // Метка времени последнего изменения
}

// Инициализируем базу данных QumyrsqaDB
export class QumyrsqaDatabase extends Dexie {
  atoms!: Table<Atom>; 

  constructor() {
    super('QumyrsqaDB');
    
    // Определяем схему таблиц и индексы
    // Символ ++ перед tamga_id не ставим, так как мы генерируем его сами (UUID v7)
    this.version(1).stores({
      atoms: 'tamga_id, type, synced, [type+synced], updated_at'
    });
  }
}

// Создаем экземпляр БД
export const db = new QumyrsqaDatabase();

/**
 * Хелпер для получения всех несинхронизированных атомов.
 * Пригодится завтра для реализации фоновой очереди.
 */
export const getUnsyncedAtoms = () => {
  return db.atoms.where('synced').equals(0).toArray();
};