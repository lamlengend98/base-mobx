import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Platform, useTheme } from '@/theme';

export const useStyleAppointmentDetails = () => {
  const insets = useSafeAreaInsets();
  const { colors, typography } = useTheme();

  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          justifyContent: 'flex-start',
          alignItems: 'center',
          paddingBottom: insets.bottom,
          backgroundColor: colors.white,
        },
        contentContainer: {
          width: '100%',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          paddingHorizontal: Platform.SizeScale(15),
        },
        avatarContainer: {
          width: Platform.SizeScale(176),
          height: Platform.SizeScale(176),
          borderRadius: Platform.SizeScale(88),
          shadowColor: colors.black,
          shadowOffset: { width: 0, height: 15 },
          shadowOpacity: 0.1,
          shadowRadius: 15,
          elevation: 2,
          marginBottom: Platform.SizeScale(10),
        },
        avatar: {
          width: Platform.SizeScale(176),
          height: Platform.SizeScale(176),
          borderRadius: Platform.SizeScale(88),
        },
        name: {
          ...typography.boldSfPro,
          fontSize: Platform.SizeScale(24),
        },
        category: {
          fontSize: Platform.SizeScale(18),
        },
        rating: {
          fontSize: Platform.SizeScale(15),
          marginVertical: Platform.SizeScale(10),
        },
        buttonGroup: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: Platform.SizeScale(20),
        },
        button: {
          flex: 1,
          margin: Platform.SizeScale(8),
        },
        keyValue: {
          flexDirection: 'row',
          justifyContent: 'flex-start',
          marginTop: Platform.SizeScale(10),
          flex: 1,
          paddingVertical: Platform.SizeScale(5),
        },
        icon: {
          marginHorizontal: Platform.SizeScale(20),
          marginVertical: Platform.SizeScale(3),
          fontSize: Platform.SizeScale(16),
          color: colors.darkGray,
        },
        date: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          marginTop: Platform.SizeScale(10),
          flex: 1,
          paddingVertical: Platform.SizeScale(5),
        },
        iconDate: {
          marginHorizontal: Platform.SizeScale(20),
          fontSize: Platform.SizeScale(16),
          color: colors.darkGray,
        },
        description: {
          flex: 1,
        },
        comment: {
          fontSize: Platform.SizeScale(14),
          marginTop: Platform.SizeScale(15),
          marginBottom: Platform.SizeScale(5),
          alignSelf: 'flex-start',
        },
        phone: {
          flex: 3,
          marginVertical: Platform.SizeScale(5),
          color: colors.blue,
          textDecorationLine: 'underline',
        },
        input: {
          padding: Platform.SizeScale(),
          height: Platform.SizeScale(100),
          backgroundColor: colors.lightGray,
          alignItems: 'flex-start',
          borderColor: colors.inputBorder,
          borderWidth: 0,
          flex: 1,
        },
        popupContainer: {
          justifyContent: 'flex-start',
          alignItems: 'center',
          backgroundColor: colors.white,
          borderRadius: Platform.SizeScale(25),
          marginHorizontal: Platform.SizeScale(30),
          paddingVertical: Platform.SizeScale(15),
        },
        iconCheck: {
          fontSize: Platform.SizeScale(92),
          color: colors.lightGreen,
          marginVertical: Platform.SizeScale(20),
        },
        msg: {
          fontSize: Platform.SizeScale(16),
          textAlign: 'center',
          marginBottom: Platform.SizeScale(10),
          paddingHorizontal: Platform.SizeScale(20),
        },
      }),
    [insets, colors, typography],
  );
};
