import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { Platform, useTheme } from '@/theme';

export const useStylesInput = () => {
  const { colors } = useTheme();
  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: Platform.SizeScale(8),
          marginBottom: Platform.SizeScale(6),
        },
        input: {
          flex: 1,
          marginLeft: Platform.SizeScale(50),
          alignItems: 'center',
        },
        inputStyle: {
          flex: 1,
        },
        icon: {
          color: colors.white,
          fontSize: Platform.SizeScale(16),
        },
        vLink: {
          width: Platform.SizeScale(40),
          height: Platform.SizeScale(40),
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: Platform.SizeScale(40),
          backgroundColor: colors.blue,
          overflow: 'hidden',
        },
        btnSend: {
          width: Platform.SizeScale(40),
          height: Platform.SizeScale(40),
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: Platform.SizeScale(40),
          backgroundColor: colors.blue,
          overflow: 'hidden',
          marginHorizontal: Platform.SizeScale(6),
        },
        actionButtonIcon: {
          fontSize: Platform.SizeScale(20),
          height: Platform.SizeScale(22),
          color: 'white',
        },
        recordButton: {
          flex: 3 / 10,
          alignItems: 'flex-end',
          justifyContent: 'center',
        },
        textRecord: {
          flex: 5 / 10,
          justifyContent: 'center',
        },
        close: {
          flex: 2 / 10,
        },
        inputVideoContainer: {
          flex: 1,
        },
        videoContainer: {
          marginLeft: Platform.SizeScale(50),
          backgroundColor: 'blue',
          width: Platform.SizeScale(30),
          height: Platform.SizeScale(30),
        },
        video: {
          width: Platform.SizeScale(40),
          height: Platform.SizeScale(40),
        },
        cancel: {
          position: 'absolute',
          right: -Platform.SizeScale(15),
          top: -Platform.SizeScale(10),
          width: Platform.SizeScale(20),
          height: Platform.SizeScale(20),
          borderRadius: Platform.SizeScale(10),
          alignItems: 'center',
          justifyContent: 'center',
        },
        imageInput: {
          width: Platform.SizeScale(40),
          height: Platform.SizeScale(40),
          marginLeft: Platform.SizeScale(50),
          backgroundColor: colors.darkGray2,
          borderRadius: Platform.SizeScale(5),
        },
      }),
    [colors],
  );
};
