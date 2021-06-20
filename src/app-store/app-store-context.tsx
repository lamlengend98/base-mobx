import React, { createContext, ReactNode } from 'react';
import AppStore from './app-store';

export const appStoreContextValue = createContext<typeof AppStore | null>(null);

export const AppStoreProvider = ({ children }: { children: ReactNode }) => {
  return (
    <appStoreContextValue.Provider value={AppStore}>
      {children}
    </appStoreContextValue.Provider>
  );
};
