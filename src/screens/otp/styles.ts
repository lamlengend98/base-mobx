import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Platform, useTheme } from '@/theme';

export const useStyleOtp = () => {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          backgroundColor: colors.white,
          padding: Platform.SizeScale(30),
          height: Platform.deviceHeight,
        },
        logo: {
          flex: 1,
          width: Platform.SizeScale(122),
          height: Platform.SizeScale(100),
        },
        buttonGroup: {
          flex: 1,
          width: '90%',
        },
        button: {
          marginVertical: Platform.SizeScale(20),
        },
        inputContainer: {
          alignItems: 'center',
          justifyContent: 'flex-start',
        },
        input: {
          borderColor: 'transparent',
          flex: 1,
        },
        resendContainer: {
          flexDirection: 'row',
          justifyContent: 'center',
        },
        resend: {
          color: colors.blue,
          textDecorationLine: 'underline',
          marginLeft: 5,
        },
        otpContainer: { width: '80%', height: Platform.SizeScale(50) },
        codeInputHighlightStyle: {
          width: Platform.SizeScale(30),
          height: Platform.SizeScale(45),
          borderWidth: 0,
          borderBottomWidth: 1.5,
        },
        codeInputFieldStyle: {
          color: colors.black,
          fontSize: Platform.SizeScale(20),
          borderColor: colors.black,
          width: Platform.SizeScale(30),
          height: Platform.SizeScale(45),
          borderWidth: 0,
          borderBottomWidth: 1.5,
          fontFamily: 'Roboto-Regular',
        },
      }),
    [colors, insets],
  );
};
