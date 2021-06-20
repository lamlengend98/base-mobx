import { createContext } from 'react';
import { SymptomPickerContextValue } from './types';

const NOOP = () => {};

export const SymptomPickerContext = createContext<SymptomPickerContextValue>({
  show: NOOP,
  close: NOOP,
});
