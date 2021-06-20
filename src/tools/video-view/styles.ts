import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Platform } from '@/theme';

export const useStyleVideoView = () => {
  const insets = useSafeAreaInsets();

  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          margin: 0,
          justifyContent: 'flex-end',
          marginTop: insets.top,
          marginBottom: insets.bottom,
        },
        content: {
          width: Platform.deviceWidth,
          height: Platform.deviceHeight,
        },
        close: {
          position: 'absolute',
          top: 0,
          right: 0,
        },
      }),
    [],
  );
};
