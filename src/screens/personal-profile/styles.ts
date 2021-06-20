import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Platform, useTheme } from '@/theme';

export const useStylePersonalProfile = () => {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

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
          width: '80%',
          flexDirection: 'column',
          paddingHorizontal: Platform.SizeScale(15),
          paddingTop: Platform.SizeScale(25),
        },
        contentScroll: {
          paddingBottom: Platform.SizeScale(60),
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
          alignSelf: 'center',
        },
        avatar: {
          width: Platform.SizeScale(176),
          height: Platform.SizeScale(176),
          borderRadius: Platform.SizeScale(88),
          backgroundColor: colors.lightGreen,
        },
        title: {
          fontSize: Platform.SizeScale(18),
        },
        titleContainer: {
          alignItems: 'center',
          marginVertical: Platform.SizeScale(15),
        },
        inputContainer: {
          alignItems: 'center',
        },
        input: {
          marginVertical: Platform.SizeScale(8),
        },
        button: {
          width: '100%',
          marginVertical: Platform.SizeScale(8),
        },
        notification: {
          width: '100%',
          alignItems: 'center',
          marginTop: Platform.SizeScale(40),
          paddingVertical: Platform.SizeScale(20),
          height: 'auto',
          backgroundColor: colors.lightGray,
          borderRadius: Platform.SizeScale(10),
        },
        notificationGroup: {
          flexDirection: 'row',
          marginTop: Platform.SizeScale(10),
        },
        buttonGenderLeft: {
          flex: 1,
          marginRight: Platform.SizeScale(5),
          marginBottom: Platform.SizeScale(5),
        },
        buttonGenderRight: {
          flex: 1,
          marginLeft: Platform.SizeScale(5),
          marginBottom: Platform.SizeScale(5),
        },
        centredText: {
          textAlign: 'center',
          marginTop: Platform.SizeScale(10),
          marginBottom: Platform.SizeScale(5),
          fontSize: Platform.SizeScale(14),
        },
        dateContainer: {
          flexDirection: 'row',
          justifyContent: 'space-between',
        },
      }),
    [colors],
  );
};
