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
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: Platform.SizeScale(15),
          paddingLeft: Platform.SizeScale(20),
          paddingRight: Platform.SizeScale(1),
          paddingVertical: Platform.SizeScale(1),
          backgroundColor: colors.white,
          marginBottom: Platform.SizeScale(9),
          borderRadius: Platform.SizeScale(10),
        },
        detailsContainer: {
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
        },
        avatar: {
          width: Platform.SizeScale(120),
          height: Platform.SizeScale(150),
          borderRadius: Platform.SizeScale(10),
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: colors.gray,
        },
        name: {
          color: colors.blue,
        },
        description: {
          fontSize: Platform.SizeScale(12),
        },
        review: {
          fontSize: Platform.SizeScale(12),
          marginLeft: Platform.SizeScale(5),
        },
        starContainer: {
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: Platform.SizeScale(6),
        },
        statusCheck: {
          width: Platform.SizeScale(12),
          height: Platform.SizeScale(12),
          backgroundColor: colors.vividRed,
          borderRadius: Platform.SizeScale(6),
        },
        statusText: {
          alignSelf: 'center',
        },
      }),
    [colors],
  );
};
