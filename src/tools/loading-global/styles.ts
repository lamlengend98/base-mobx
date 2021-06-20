import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import Color from 'color';
import { COLORS, Platform, useTheme } from '@/theme';

export const useStyleLoadingGlobal = () => {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      width: Platform.deviceWidth,
      height: Platform.deviceHeight,
      backgroundColor: Color(colors.gray).alpha(0.3).toString(),
    },
  });
  return useMemo<[COLORS, typeof styles]>(() => [colors.loading, styles], [
    colors,
    styles,
  ]);
};
