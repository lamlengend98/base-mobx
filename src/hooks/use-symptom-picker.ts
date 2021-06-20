import { useContext } from 'react';
import { SymptomPickerContext } from '@/tools/symptom-picker/context';

export const useSymptomPicker = () => {
  const payload = useContext(SymptomPickerContext);
  if (!payload) {
    throw new Error(
      'useSymptomPicker must be use within SymptomPickerProvider.',
    );
  }
  return payload;
};
