import { useContext } from 'react';
import { ConfirmationContext } from '@/tools/confirmation/context';

export const useConfirmation = () => {
  const payload = useContext(ConfirmationContext);
  if (!payload) {
    throw new Error('useConfirmation must be use within ConfirmationProvider.');
  }
  return payload;
};
