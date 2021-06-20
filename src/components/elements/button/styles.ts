import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import Color from 'color';
import { Platform, useTheme } from '@/theme';

export const useStyleButton = () => {
  const { colors } = useTheme();

  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          alignItems: 'center',
          padding: Platform.SizeScale(12),
          justifyContent: 'center',
          height: Platform.SizeScale(48),
          borderRadius: Platform.SizeScale(24),
          flexDirection: 'row',
          overflow: 'hidden',
        },
        icon: {
          width: Platform.SizeScale(14),
          height: Platform.SizeScale(14),
          marginRight: Platform.SizeScale(5),
        },
        text: {
          textAlign: 'center',
        },
        darkBlueButton: {
          backgroundColor: colors.darkBlue,
        },
        blueButton: {
          backgroundColor: colors.blue,
        },
        lightGreenButton: {
          backgroundColor: colors.lightGreen,
        },
        grayButton: {
          backgroundColor: colors.gray,
        },
        redButton: {
          backgroundColor: colors.red,
        },
        whiteButton: {
          backgroundColor: colors.white,
          borderWidth: 1,
          borderColor: colors.gray,
        },
        shadowView: {
          shadowColor: Color(colors.black, 'hex').alpha(0.5).toString(),
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.5,
          shadowRadius: 0.5,
          elevation: 0.5,
        },
      }),
    [colors],
  );
};
