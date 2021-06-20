import React, { useCallback, useMemo } from 'react';
import ImageCropPicker from 'react-native-image-crop-picker';
import { ImagePickerContext } from './context';
import { ImagePickerProps, ImagePickerValue } from './types';

export const ImagePickerProvider = ({ children }: ImagePickerProps) => {
  const handleShowGallery = useCallback(async () => {
    try {
      return await ImageCropPicker.openPicker({
        writeTempFile: true,
      });
    } catch (error) {
      throw error;
    }
  }, []);

  const handleShowCamera = useCallback(async () => {
    try {
      return await ImageCropPicker.openCamera({
        writeTempFile: true,
        // compressImageQuality: 0.5,
        // cropping: true,
      });
    } catch (error) {
      throw error;
    }
  }, []);

  const value = useMemo<ImagePickerValue>(
    () => ({
      showGallery: handleShowGallery,
      showCamera: handleShowCamera,
    }),
    [handleShowCamera, handleShowGallery],
  );

  return (
    <ImagePickerContext.Provider {...{ value }}>
      {children}
    </ImagePickerContext.Provider>
  );
};
