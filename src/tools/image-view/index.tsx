import React, { useCallback, useMemo } from 'react';
import { ActivityIndicator, View } from 'react-native';
import ImageVIew from 'react-native-image-zoom-viewer';
import Modal from 'react-native-modal';
import { Observer, useLocalStore } from 'mobx-react-lite';
import { COLORS } from '@/theme';
import { ImageViewContext } from './context';
import { useStyleImageView } from './styles';
import { ImageViewProps, ImageViewValue } from './types';

export const ImageViewProvider = ({ children }: ImageViewProps) => {
  const store = useLocalStore<{ isVisible: boolean; urls: string[] }>(() => ({
    isVisible: false,
    urls: [],
  }));
  const styles = useStyleImageView();

  const handleShow = useCallback(
    (urls: string[]) => {
      store.urls = urls;
      store.isVisible = true;
    },
    [store],
  );

  const handleDismiss = useCallback(() => {
    store.isVisible = false;
    store.urls = [];
  }, [store]);

  const value = useMemo<ImageViewValue>(
    () => ({
      show: handleShow,
      dismiss: handleDismiss,
    }),
    [handleDismiss, handleShow],
  );

  const loadingRender = useCallback(() => {
    return <ActivityIndicator size="small" color={COLORS.BLUE} />;
  }, []);

  return (
    <ImageViewContext.Provider {...{ value }}>
      {children}
      <Observer>
        {() => {
          return (
            <Modal
              isVisible={store.isVisible}
              animationIn="fadeInUp"
              backdropOpacity={0.4}
              useNativeDriver
              animationOut="fadeOutDown"
              style={styles.container}>
              <View style={styles.content}>
                <ImageVIew
                  enableSwipeDown
                  enableImageZoom
                  useNativeDriver
                  onCancel={handleDismiss}
                  imageUrls={store.urls.map((url) => ({ url }))}
                  {...{ loadingRender }}
                />
              </View>
            </Modal>
          );
        }}
      </Observer>
    </ImageViewContext.Provider>
  );
};
