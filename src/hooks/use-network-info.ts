import { useContext } from 'react';
import { NetworkContext } from '@/tools/network/network-context';

export const useNetworkInfo = () => {
  const payload = useContext(NetworkContext);
  if (!payload) {
    throw new Error('useNetworkInfo must be use within NetworkInfoProvider.');
  }
  return payload;
};
