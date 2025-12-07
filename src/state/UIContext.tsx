import React, { createContext, useContext, useState, useCallback } from 'react';
import Snackbar from '../components/Snackbar';

type UIContextType = {
  showMessage: (text: string, duration?: number) => void;
};

const UIContext = createContext<UIContextType>({ showMessage: () => {} });

export const UIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [msg, setMsg] = useState<string | null>(null);
  const [duration, setDuration] = useState<number>(3000);

  const showMessage = useCallback((text: string, d = 3000) => {
    setMsg(text);
    setDuration(d);
  }, []);

  return (
    <UIContext.Provider value={{ showMessage }}>
      {children}
      <Snackbar message={msg} duration={duration} onHide={() => setMsg(null)} />
    </UIContext.Provider>
  );
};

export const useUI = () => useContext(UIContext);
