import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Platform, useTheme } from '@/theme';

export const useStylePersonalDetails = () => {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          backgroundColor: colors.white,
          padding: Platform.SizeScale(50),
        },
        titleContainer: {
          flex: 0.4,
          justifyContent: 'center',
        },
        title: {
          fontSize: Platform.SizeScale(36),
        },
        content: {
          width: '100%',
          flex: 1,
        },
        button: {
          marginVertical: Platform.SizeScale(15),
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
        inputContainer: {
          alignItems: 'center',
          paddingHorizontal: Platform.SizeScale(10),
          borderRadius: Platform.SizeScale(24),
          flexDirection: 'row',
          borderWidth: 1,
          marginVertical: Platform.SizeScale(5),
          borderColor: colors.gray,
        },
        inputDateContainer: {
          flex: 1,
          alignItems: 'center',
          height: Platform.SizeScale(45),
          paddingHorizontal: Platform.SizeScale(10),
          justifyContent: 'center',
          borderRadius: Platform.SizeScale(24),
          flexDirection: 'row',
          borderWidth: 1,
          margin: Platform.SizeScale(5),
          paddingVertical: 1,
          borderColor: colors.gray,
        },
        centredText: {
          textAlign: 'center',
          marginTop: Platform.SizeScale(10),
          marginBottom: Platform.SizeScale(5),
          fontSize: Platform.SizeScale(14),
        },
        dateContainer: {
          flexDirection: 'row',
          justifyContent: 'center',
        },
      }),
    [colors, insets],
  );
};
