import * as SQLite from 'expo-sqlite';
import { Product } from '../model/Product';

const db = SQLite.openDatabase('appcomprador.db');

export function initDB(): Promise<void> {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS products (
          id TEXT PRIMARY KEY,
          name TEXT,
          maxPrice REAL,
          isBeer INTEGER,
          beerType TEXT,
          isPurchased INTEGER,
          purchasePrice REAL,
          purchaseDate INTEGER
        );`,
        [],
        () => resolve(),
        (_, err) => {
          reject(err);
          return false;
        }
      );
    });
  });
}

function rowsToProducts(rows: any): Product[] {
  const arr: Product[] = [];
  for (let i = 0; i < rows.length; i++) {
    const r = rows.item(i);
    arr.push({
      id: r.id,
      name: r.name,
      maxPrice: r.maxPrice,
      isBeer: !!r.isBeer,
      beerType: r.beerType,
      isPurchased: !!r.isPurchased,
      purchasePrice: r.purchasePrice,
      purchaseDate: r.purchaseDate
    });
  }
  return arr;
}

export function runQuery<T>(sql: string, params: any[] = []): Promise<T> {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        sql,
        params,
        (_, result) => resolve(result as unknown as T),
        (_, err) => {
          reject(err);
          return false;
        }
      );
    });
  });
}

export { db, rowsToProducts };
