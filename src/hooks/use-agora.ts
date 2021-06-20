import { useContext } from 'react';
import { AgoraContext } from '@/tools/agora/context';

export const useAgora = () => {
  const payload = useContext(AgoraContext);
  if (!payload) {
    throw new Error('AgoraContext must be use within AgoraProvider.');
  }
  return payload;
};
