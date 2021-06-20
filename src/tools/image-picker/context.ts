import { createContext } from 'react';
import { ImagePickerValue } from './types';

const NOOP = () => {};

export const ImagePickerContext = createContext<ImagePickerValue>({
  showGallery: NOOP,
  showCamera: NOOP,
});
