import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Platform, useTheme } from '@/theme';

export const useStylePayment = () => {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          justifyContent: 'flex-start',
          alignItems: 'center',
          paddingBottom: insets.bottom,
          backgroundColor: colors.lightGray,
        },
        list: {
          width: '100%',
          marginTop: Platform.SizeScale(20),
        },
        keyValue: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          backgroundColor: colors.white,
          padding: Platform.SizeScale(15),
          marginTop: Platform.SizeScale(1),
        },
        icon: {
          width: Platform.SizeScale(60),
          fontSize: Platform.SizeScale(16),
          color: colors.red,
          textAlign: 'center',
        },
        title: {
          fontSize: Platform.SizeScale(24),
          marginVertical: Platform.SizeScale(25),
        },
        text: {
          flex: 1,
          fontSize: Platform.SizeScale(24),
        },
        blueText: {
          color: colors.blue,
        },
        redText: {
          color: colors.red,
        },
      }),
    [insets, colors],
  );
};
