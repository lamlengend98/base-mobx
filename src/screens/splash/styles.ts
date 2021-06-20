import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Platform, useTheme } from '@/theme';

export const useStyleSplash = () => {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          backgroundColor: colors.white,
        },
        logo: {
          width: Platform.SizeScale(122),
          height: Platform.SizeScale(126),
        },
        indicator: {
          padding: 10,
        },
        indicatorColor: {
          color: colors.loading,
        },
      }),
    [colors, insets],
  );
};
