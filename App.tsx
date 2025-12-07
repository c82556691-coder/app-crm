import React, { useEffect } from 'react';
import { ProductProvider, useProducts } from './src/state/ProductContext';
import AppNavigation from './src/navigation';
import { UIProvider, useUI } from './src/state/UIContext';

function AppInner() {
  const { setOnMessage } = useProducts();
  const { showMessage } = useUI();

  useEffect(() => {
    setOnMessage(showMessage);
  }, []);

  return <AppNavigation />;
}

export default function App() {
  return (
    <UIProvider>
      <ProductProvider>
        <AppInner />
      </ProductProvider>
    </UIProvider>
  );
}
