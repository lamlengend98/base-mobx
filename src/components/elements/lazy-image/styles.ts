import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from '@/theme';

export const useStyleLazyImage = () => {
  const { colors } = useTheme();

  return useMemo(() => {
    const styles = StyleSheet.create({
      indicator: {
        position: 'absolute',
        zIndex: 1,
      },
    });

    return {
      progressColor: colors.blue,
      styles,
    };
  }, [colors]);
};
