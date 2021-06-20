import { ReactNode } from 'react';
import { Sympton } from '@/screens/pre-consultation/type';

export type SymptomPickerProviderProps = {
  children: ReactNode;
};

export type SymptomPickerContextValue = {
  show: (dataArr?: Array<Sympton>, allData?: Array<Sympton>) => void;
  close: () => void;
};
