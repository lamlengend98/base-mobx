import { createContext } from 'react';
import { ImageViewValue } from './types';

const NOOP = () => {};

export const ImageViewContext = createContext<ImageViewValue>({
  dismiss: NOOP,
  show: NOOP,
});
