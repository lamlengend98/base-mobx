import { useContext } from 'react';
import { ImagePickerContext } from '@/tools/image-picker/context';

export function useImagePicker() {
  const payload = useContext(ImagePickerContext);
  if (!payload) {
    throw new Error('useImageView must be use within ImagePickerProvider.');
  }
  return payload;
}
