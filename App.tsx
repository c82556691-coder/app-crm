import React from 'react';
import { ProductProvider } from './src/state/ProductContext';
import AppNavigation from './src/navigation';

export default function App() {
  return (
    <ProductProvider>
      <AppNavigation />
    </ProductProvider>
  );
}
