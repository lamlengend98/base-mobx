import { useContext } from 'react';
import { appStoreContextValue } from '@/app-store/app-store-context';

export const useAppStore = () => {
  const payload = useContext(appStoreContextValue);
  if (!payload) {
    throw new Error('useAppStore must be use within AppStoreProvider.');
  }
  return payload;
};
