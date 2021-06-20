import { useContext } from 'react';
import { AlertDialogContext } from '@/tools/alert-dialog/context';

export const useAlertDialog = () => {
  const payload = useContext(AlertDialogContext);
  if (!payload) {
    throw new Error('useAlertDialog must be use within AlertDialogProvider.');
  }
  return payload;
};
