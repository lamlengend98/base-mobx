import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { Platform, useTheme } from '@/theme';

export const useStylesItemNotification = () => {
  const { colors } = useTheme();

  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: Platform.SizeScale(10),
          marginHorizontal: Platform.SizeScale(10),
          marginVertical: Platform.SizeScale(4),
          borderRadius: Platform.SizeScale(10),
          backgroundColor: colors.white,
        },
        detailsContainer: {
          flexDirection: 'row',
          paddingVertical: Platform.SizeScale(5),
        },
        content: {
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-start',
          paddingHorizontal: Platform.SizeScale(10),
        },
        title: {
          color: colors.blue,
        },
        address: {
          fontSize: Platform.SizeScale(10),
          color: colors.black,
        },
        info: {
          fontSize: Platform.SizeScale(10),
          color: colors.darkGray,
          paddingTop: Platform.SizeScale(4),
          paddingBottom: Platform.SizeScale(15),
        },
        categories: {
          fontSize: Platform.SizeScale(12),
          paddingTop: Platform.SizeScale(15),
          color: colors.black,
        },
        avatar: {
          width: Platform.SizeScale(89),
          height: Platform.SizeScale(89),
        },
        rating: {
          fontSize: Platform.SizeScale(16),
        },
        ratingNum: {
          fontSize: Platform.SizeScale(12),
          marginLeft: Platform.SizeScale(7),
        },
        ratingContainer: {
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: Platform.SizeScale(7),
        },
        status: {
          width: Platform.SizeScale(13),
          height: Platform.SizeScale(13),
          borderRadius: Platform.SizeScale(13),
          marginRight: Platform.SizeScale(5),
        },
      }),
    [colors],
  );
};
