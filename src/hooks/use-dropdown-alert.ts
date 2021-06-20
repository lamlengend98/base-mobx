import { useContext } from 'react';
import { DropdownAlertContext } from '@/tools/dropdown-alert/context';

export const useDropdownAlert = () => {
  const payload = useContext(DropdownAlertContext);
  if (!payload) {
    throw new Error(
      'useDropdownAlert must be use within DropdownAlertProvider.',
    );
  }
  return payload;
};
