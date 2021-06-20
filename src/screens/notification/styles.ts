import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Platform, useTheme } from '@/theme';

export const useNotificationStyle = () => {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          // justifyContent: 'center',
          // alignItems: 'center',
          // paddingBottom: insets.bottom,
          // backgroundColor: colors.white,
        },
        profileContainer: {
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: Platform.SizeScale(30),
          backgroundColor: colors.blue,
        },
        avatarContainer: {
          width: Platform.SizeScale(55),
          height: Platform.SizeScale(55),
          marginLeft: Platform.SizeScale(20),
        },
        avatar: {
          width: Platform.SizeScale(55),
          height: Platform.SizeScale(55),
          borderRadius: Platform.SizeScale(28),
        },
        statusContainer: {
          width: Platform.SizeScale(16),
          height: Platform.SizeScale(16),
          borderRadius: Platform.SizeScale(8),
          backgroundColor: colors.white,
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          top: 0,
          right: 0,
        },
        statusText: {
          fontSize: Platform.SizeScale(9),
          color: colors.lightGreen,
        },
        titleContainer: {
          flexDirection: 'column',
        },
        greeting: {
          fontSize: Platform.SizeScale(24),
          color: colors.white,
        },
        name: {
          fontSize: Platform.SizeScale(24),
          color: colors.white,
        },
        patientList: {
          width: '100%',
          marginTop: Platform.SizeScale(10),
        },
        separator: {
          backgroundColor: colors.lightGray,
          height: Platform.SizeScale(1),
        },
      }),
    [insets, colors],
  );
};
