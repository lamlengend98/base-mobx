import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { Platform, useTheme } from '@/theme';

export const useStylesItemCategory = () => {
  const { colors } = useTheme();

  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
          // paddingHorizontal: Platform.SizeScale(5),
          borderRadius: Platform.SizeScale(10),
          marginLeft: Platform.SizeScale(9),
        },
        avatar: {
          width: Platform.SizeScale(70),
          height: Platform.SizeScale(70),
        },
        avatarContainer: {
          backgroundColor: colors.white,
          borderRadius: Platform.SizeScale(10),
          padding: Platform.SizeScale(10),
          marginBottom: Platform.SizeScale(9),
        },
        name: {
          maxWidth: Platform.SizeScale(100),
        },
      }),
    [colors],
  );
};
