import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Platform, useTheme } from '@/theme';

export const useStyleDoctorProfile = () => {
  const insets = useSafeAreaInsets();
  const { colors, typography } = useTheme();

  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          justifyContent: 'flex-start',
          alignItems: 'center',
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
        },
        button: {
          flex: 1,
          margin: Platform.SizeScale(8),
        },
        details: {
          marginVertical: Platform.SizeScale(5),
          textAlign: 'justify',
          maxWidth: Platform.deviceWidth,
        },
        section: {
          ...typography.boldSfPro,
          alignSelf: 'flex-start',
          textAlign: 'left',
          marginVertical: Platform.SizeScale(10),
        },
        keyValue: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: Platform.SizeScale(10),
        },
        iconContainer: {
          flex: 1,
          alignItems: 'center',
        },
        icon: {
          fontSize: Platform.SizeScale(16),
          color: colors.darkGray,
        },
        description: {
          flex: 3,
        },
        phone: {
          flex: 3,
          marginVertical: Platform.SizeScale(5),
          color: colors.blue,
          textDecorationLine: 'underline',
        },
        openingContainer: {
          flexDirection: 'row',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          marginVertical: Platform.SizeScale(3),
          marginBottom: Platform.SizeScale(50),
        },
        openingDetails: {
          flex: 3,
          marginVertical: Platform.SizeScale(5),
          flexDirection: 'column',
          alignItems: 'center',
        },
        opening: {
          color: colors.green,
        },
        openingOver: {
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        },
        day: {
          flex: 1.2,
        },
        time: {
          flex: 2,
        },
        timeList: {
          flexWrap: 'wrap',
          justifyContent: 'flex-start',
          flexDirection: 'row',
        },
        bookAppointmentButton: {
          margin: Platform.SizeScale(15),
          paddingHorizontal: Platform.SizeScale(40),
          marginHorizontal: Platform.SizeScale(30),
        },
      }),
    [insets, colors, typography],
  );
};
