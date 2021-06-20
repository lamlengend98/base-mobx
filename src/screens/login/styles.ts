import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Platform, useTheme } from '@/theme';

export const useStyleLogin = () => {
  const insets = useSafeAreaInsets();
  const { colors, typography } = useTheme();

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
        },
        buttonGroup: {
          flex: 1,
          width: '100%',
        },
        button: {
          marginVertical: Platform.SizeScale(8),
        },
        indicatorContainer: {
          flexDirection: 'row',
          alignItems: 'center',
        },
        textOr: {
          ...typography.regularRoboto,
          color: colors.blue,
          fontSize: Platform.SizeScale(14),
          margin: Platform.SizeScale(8),
        },
        indicator: {
          height: 1,
          flex: 1,
          backgroundColor: colors.lightGray,
        },
      }),
    [colors, typography, insets],
  );
};
