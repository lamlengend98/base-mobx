import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Platform, useTheme } from '@/theme';

export const useStyleWelcome = () => {
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
          padding: Platform.SizeScale(30),
        },
        logo: {
          flex: 1,
          width: Platform.SizeScale(122),
          height: Platform.SizeScale(126),
          alignSelf: 'center',
        },
        buttonGroup: {
          flex: 1.5,
        },
        button: {
          marginVertical: Platform.SizeScale(20),
        },
        text: {
          textAlign: 'center',
          marginVertical: Platform.SizeScale(8),
          color: colors.softCyan,
          fontSize: Platform.SizeScale(16),
        },
      }),
    [colors, insets],
  );
};
