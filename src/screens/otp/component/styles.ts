import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { Platform, useTheme } from '@/theme';

export const useStyleOtpInput = () => {
  const { colors } = useTheme();

  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          alignItems: 'center',
          justifyContent: 'center',
        },
        inputsContainer: {
          width: '60%',
          flexDirection: 'row',
          justifyContent: 'space-between',
        },
        inputContainer: {
          borderColor: colors.gray,
          borderBottomWidth: 2,
          padding: Platform.OS === 'ios' ? Platform.SizeScale(10) : 0,
          width: Platform.SizeScale(35),
          marginHorizontal: Platform.SizeScale(5),
        },
        inputContainerFocused: {
          borderColor: colors.blue,
        },
        inputText: {
          fontSize: Platform.SizeScale(24),
          textAlign: 'center',
        },
        hiddenCodeInput: {
          position: 'absolute',
          width: 0,
          opacity: 0,
          height: 200,
        },
      }),
    [colors],
  );
};
