import { ReactNode } from 'react';
import { ImageOrVideo } from 'react-native-image-crop-picker';

export type ImagePickerValue = {
  showGallery: () => Promise<ImageOrVideo>;
  showCamera: () => Promise<ImageOrVideo>;
};

export type ImagePickerProps = {
  children: ReactNode;
};
