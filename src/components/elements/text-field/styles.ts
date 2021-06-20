import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { Platform, useTheme } from '@/theme';

export const useStylesTextField = () => {
  const { colors } = useTheme();

  return useMemo(
    () =>
      StyleSheet.create({
        content: {
          borderRadius: Platform.SizeScale(24),
          borderColor: colors.gray,
          borderWidth: 1,
          height: Platform.SizeScale(48),
          alignItems: 'center',
          flexDirection: 'row',
          paddingHorizontal: Platform.SizeScale(6),
          backgroundColor: colors.white,
        },
        input: {
          flexGrow: 1,
          padding: Platform.SizeScale(6),
        },
        vLabel: {
          position: 'absolute',
          backgroundColor: colors.white,
          paddingHorizontal: Platform.SizeScale(6),
          left: '8%',
        },
        label: {
          color: colors.inputLabel,
        },
        prefix: {
          color: colors.inputPrefix,
          marginLeft: Platform.SizeScale(6),
        },
        borderFocus: {
          color: colors.borderFocus,
        },
        iconHidden: {
          fontSize: Platform.SizeScale(18),
          color: colors.black,
          marginRight: Platform.SizeScale(3),
        },
      }),
    [colors],
  );
};
