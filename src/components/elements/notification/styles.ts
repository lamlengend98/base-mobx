import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { Platform, useTheme } from '@/theme';

export const useStylesItemNotification = () => {
  const { colors } = useTheme();

  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: colors.white,
          borderRadius: Platform.SizeScale(),
          overflow: 'hidden',
          flexDirection: 'row',
          padding: Platform.SizeScale(),
          marginHorizontal: Platform.SizeScale(15),
          marginBottom: Platform.SizeScale(5),
        },
        detailsContainer: {
          flexDirection: 'row',
          paddingVertical: Platform.SizeScale(5),
        },
        content: {
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          paddingHorizontal: Platform.SizeScale(5),
        },
        title: {
          color: colors.black,
        },
        timeAppointment: {
          color: colors.sliverChalice,
          fontSize: Platform.SizeScale(12),
          marginTop: Platform.SizeScale(5),
        },
        time: {
          paddingVertical: Platform.SizeScale(3),
        },
        button: {
          width: Platform.SizeScale(100),
          alignItems: 'center',
        },
        iconContainer: {
          backgroundColor: colors.white,
          width: Platform.SizeScale(48),
          height: Platform.SizeScale(48),
          borderRadius: Platform.SizeScale(24),
          borderColor: colors.gray,
          borderWidth: Platform.SizeScale(1),
          marginRight: Platform.SizeScale(10),
          alignItems: 'center',
          justifyContent: 'center',
        },
        icon: {
          fontSize: Platform.SizeScale(18),
          color: colors.lightBlue,
        },
      }),
    [colors],
  );
};
