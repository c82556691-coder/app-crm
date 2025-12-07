import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { Product } from '../model/Product';
import * as repo from '../repository/ProductRepository';

type State = {
  toBuy: Product[];
  bought: Product[];
  databaseProducts: Product[];
  loading: boolean;
};

const initialState: State = {
  toBuy: [],
  bought: [],
  databaseProducts: [],
  loading: true
};

type Action =
  | { type: 'set'; payload: Partial<State> }
  | { type: 'loading'; payload: boolean };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'set':
      return { ...state, ...action.payload };
    case 'loading':
      return { ...state, loading: action.payload };
  }
}

const ProductContext = createContext<any>(null);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer as any, initialState as State);

  async function refreshAll() {
    dispatch({ type: 'loading', payload: true });
    await repo.ensureDB();
    await repo.seedInitialBeers();
    const [toBuy, bought, databaseProducts] = await Promise.all([
      repo.getAllProductsToBuy(),
      repo.getBoughtProducts(),
      repo.getDatabaseProducts()
    ]);
    dispatch({ type: 'set', payload: { toBuy, bought, databaseProducts } });
    dispatch({ type: 'loading', payload: false });
  }

  useEffect(() => {
    refreshAll();
  }, []);

  const addProduct = async (name: string, maxPrice: number) => {
    await repo.addProduct(name, maxPrice);
    await refreshAll();
  };

  const updateProduct = async (p: Product) => {
    await repo.updateProduct(p);
    await refreshAll();
  };

  const deleteProduct = async (id: string) => {
    await repo.deleteProduct(id);
    await refreshAll();
  };

  const markAsBought = async (id: string, price: number) => {
    await repo.markAsBought(id, price);
    await refreshAll();
  };

  return (
    <ProductContext.Provider value={{ ...state, addProduct, updateProduct, deleteProduct, markAsBought, refreshAll }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
