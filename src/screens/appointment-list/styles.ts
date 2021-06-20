import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { Platform, useTheme } from '@/theme';

export const useStyleAppointmentList = () => {
  const { colors } = useTheme();

  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: colors.lightGray,
        },
        section: {
          paddingLeft: Platform.SizeScale(15),
          paddingVertical: Platform.SizeScale(5),
          backgroundColor: colors.lightGray,
        },
        list: {
          width: '100%',
          marginTop: Platform.SizeScale(10),
        },
        patientList: {
          width: '100%',
        },
        emptyStyle: {
          alignSelf: 'center',
          marginTop: 10,
        },
        emptyText: {
          fontSize: Platform.SizeScale(16),
          fontWeight: '500',
        },
        contentScroll: {
          paddingBottom: Platform.SizeScale(30),
        },
      }),
    [colors],
  );
};
