import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { Platform, useTheme } from '@/theme';

export const useStylesItemDoctor = () => {
  const { colors } = useTheme();

  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: Platform.SizeScale(5),
          paddingTop: Platform.SizeScale(10),
          marginVertical: Platform.SizeScale(5),
        },
        detailsContainer: {
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: Platform.SizeScale(90),
        },
        avatarContainer: {
          width: Platform.SizeScale(90),
          paddingTop: Platform.SizeScale(10),
          borderRadius: Platform.SizeScale(10),
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.white,
        },
        avatar: {
          width: Platform.SizeScale(76),
          height: Platform.SizeScale(76),
          borderRadius: Platform.SizeScale(10),
        },
        name: {
          color: colors.blue,
          fontSize: Platform.SizeScale(10),
        },
        description: {
          fontSize: Platform.SizeScale(9),
        },
        rating: {
          color: colors.black,
          fontSize: Platform.SizeScale(10),
        },
        ratingContainer: {
          width: Platform.SizeScale(28),
          height: Platform.SizeScale(28),
          borderRadius: Platform.SizeScale(14),
          backgroundColor: colors.lightGreen,
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          top: 0,
          right: 0,
        },
      }),
    [colors],
  );
};
