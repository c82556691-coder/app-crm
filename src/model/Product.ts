export type Product = {
  id: string;
  name: string;
  maxPrice: number;
  isBeer: boolean;
  beerType?: string | null;
  isPurchased: boolean;
  purchasePrice?: number | null;
  purchaseDate?: number | null;
};
