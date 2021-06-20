import { useContext } from 'react';
import { AddCardContext } from '@/tools/add-card/context';

export const useAddCard = () => {
  const payload = useContext(AddCardContext);
  if (!payload) {
    throw new Error('useAddCard must be use within AddCardProvider.');
  }
  return payload;
};
