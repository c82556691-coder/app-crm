import { v4 as uuidv4 } from 'uuid';
import { runQuery, rowsToProducts, initDB } from '../db/database';
import { Product } from '../model/Product';

export async function ensureDB() {
  await initDB();
}

export async function getDatabaseProducts(): Promise<Product[]> {
  const res: any = await runQuery<any>(`SELECT * FROM products WHERE isBeer = 0 AND isPurchased = 0;`);
  return rowsToProducts(res.rows);
}

export async function getAllProductsToBuy(): Promise<Product[]> {
  const res: any = await runQuery<any>(`SELECT * FROM products WHERE isPurchased = 0 OR isBeer = 1;`);
  return rowsToProducts(res.rows);
}

export async function getBoughtProducts(): Promise<Product[]> {
  const res: any = await runQuery<any>(`SELECT * FROM products WHERE isPurchased = 1 ORDER BY purchaseDate DESC;`);
  return rowsToProducts(res.rows);
}

export async function addProduct(name: string, maxPrice: number, isBeer = false, beerType: string | null = null) {
  const id = uuidv4();
  await runQuery(`INSERT INTO products (id, name, maxPrice, isBeer, beerType, isPurchased) VALUES (?, ?, ?, ?, ?, 0);`, [id, name, maxPrice, isBeer ? 1 : 0, beerType]);
}

export async function updateProduct(p: Product) {
  await runQuery(`UPDATE products SET name = ?, maxPrice = ?, beerType = ? WHERE id = ?;`, [p.name, p.maxPrice, p.beerType, p.id]);
}

export async function deleteProduct(id: string) {
  await runQuery(`DELETE FROM products WHERE id = ? AND isPurchased = 0;`, [id]);
}

export async function markAsBought(productId: string, purchasePrice: number) {
  // find product
  const res: any = await runQuery<any>(`SELECT * FROM products WHERE id = ?;`, [productId]);
  const rows = res.rows;
  if (rows.length === 0) return;
  const r = rows.item(0);
  const isBeer = !!r.isBeer;
  const now = Date.now();
  if (isBeer) {
    // insert a new purchased record, keep the original beer
    const id = uuidv4();
    await runQuery(`INSERT INTO products (id, name, maxPrice, isBeer, beerType, isPurchased, purchasePrice, purchaseDate) VALUES (?, ?, ?, ?, ?, 1, ?, ?);`, [
      id,
      r.name,
      r.maxPrice,
      1,
      r.beerType,
      purchasePrice,
      now
    ]);
  } else {
    await runQuery(`UPDATE products SET isPurchased = 1, purchasePrice = ?, purchaseDate = ? WHERE id = ?;`, [purchasePrice, now, productId]);
  }
}

export async function seedInitialBeers() {
  // check if beers exist
  const res: any = await runQuery<any>(`SELECT COUNT(*) as c FROM products WHERE isBeer = 1;`);
  const c = res.rows.item(0).c;
  if (c === 0) {
    await addProduct('Cerveza - holanda', 190, true, 'holanda');
    await addProduct('Cerveza - brahma', 120, true, 'brahma');
    await addProduct('Cerveza - imperial', 230, true, 'imperial');
  }
}
