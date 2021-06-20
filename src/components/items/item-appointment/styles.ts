import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { Platform, useTheme } from '@/theme';

export const useStylesItemAppointment = () => {
  const { colors, typography } = useTheme();

  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: Platform.SizeScale(10),
          borderRadius: Platform.SizeScale(10),
          marginVertical: Platform.SizeScale(5),
          backgroundColor: colors.white,
          padding: Platform.SizeScale(10),
        },
        detailsContainer: {
          flexDirection: 'column',
          width: '55%',
        },
        avatar: {
          width: Platform.SizeScale(100),
          height: Platform.SizeScale(100),
        },
        name: {
          ...typography.boldSfPro,
          color: colors.blue,
        },
        description: {
          fontSize: Platform.SizeScale(12),
          marginTop: Platform.SizeScale(5),
        },
        endedTimeContainer: {
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: Platform.SizeScale(90),
          height: Platform.SizeScale(90),
          borderRadius: Platform.SizeScale(10),
          backgroundColor: colors.lightGray2,
        },
        upcomingTimeContainer: {
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: Platform.SizeScale(90),
          height: Platform.SizeScale(90),
          borderRadius: Platform.SizeScale(10),
          backgroundColor: colors.white,
          borderWidth: Platform.SizeScale(1),
          borderColor: colors.blue,
        },
        row: {
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        },
        icon: {
          fontSize: Platform.SizeScale(13),
          marginRight: Platform.SizeScale(3),
        },
        dayOfWeek: {
          ...typography.mediumRoboto,
          fontSize: Platform.SizeScale(13),
          marginVertical: Platform.SizeScale(5),
        },
        upcomingTime: {
          ...typography.mediumRoboto,
          fontSize: Platform.SizeScale(13),
          color: colors.blue,
        },
        endedTime: {
          ...typography.mediumRoboto,
          fontSize: Platform.SizeScale(13),
        },
      }),
    [colors, typography],
  );
};
