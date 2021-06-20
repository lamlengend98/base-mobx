import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Platform, useTheme } from '@/theme';

export const useStyleActiveMemberCode = () => {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          justifyContent: 'flex-start',
          alignItems: 'center',
          paddingBottom: insets.bottom,
          backgroundColor: colors.lightGray,
        },
        title: {
          fontSize: Platform.SizeScale(22),
          marginTop: Platform.SizeScale(90),
          marginHorizontal: Platform.SizeScale(30),
          textAlign: 'center',
        },
        description: {
          marginTop: Platform.SizeScale(30),
          marginBottom: Platform.SizeScale(50),
          textAlign: 'center',
        },
        inputContainer: {
          flexDirection: 'column',
          width: '70%',
        },
        button: {
          marginVertical: Platform.SizeScale(15),
        },
        input: {
          borderColor: 'transparent',
        },
        inputStyle: {
          textAlign: 'center',
        },
      }),
    [colors, insets],
  );
};
