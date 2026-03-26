import Dexie from 'dexie';
export const db = new Dexie('QumyrsqaDB');
db.version(1).stores({ atoms: 'tamga_id, type, score' });