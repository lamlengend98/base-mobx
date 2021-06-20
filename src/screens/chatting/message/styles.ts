import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import Color from 'color';
import { Platform, useTheme } from '@/theme';

export const useStylesMessages = () => {
  const { colors } = useTheme();
  const maxWidth = Platform.deviceWidth * 0.6;
  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexDirection: 'row',
          marginHorizontal: Platform.SizeScale(16),
          alignItems: 'center',
        },
        LEFT: {
          justifyContent: 'flex-end',
        },
        RIGHT: {
          justifyContent: 'flex-end',
          flexDirection: 'row-reverse',
        },
        body: {
          flexDirection: 'row',
          marginBottom: Platform.SizeScale(6),
        },
        msgLEFT: {
          maxWidth,
          backgroundColor: colors.blue,
          paddingVertical: Platform.SizeScale(6),
          paddingHorizontal: Platform.SizeScale(),
          borderRadius: Platform.SizeScale(12),
          color: colors.white,
          overflow: 'hidden',
        },
        msgRIGHT: {
          maxWidth,
          backgroundColor: colors.bgMsgLeft,
          paddingVertical: Platform.SizeScale(6),
          paddingHorizontal: Platform.SizeScale(),
          borderRadius: Platform.SizeScale(12),
          color: colors.darkGray,
          overflow: 'hidden',
        },
        name: {
          color: colors.gray,
          fontSize: Platform.SizeScale(12),
          marginVertical: Platform.SizeScale(3),
        },
        time: {
          marginTop: Platform.SizeScale(22),
          color: colors.gray,
          marginHorizontal: Platform.SizeScale(6),
        },
        img: {
          borderRadius: Platform.SizeScale(16),
          backgroundColor: Color(colors.gray, 'hex').alpha(0.3).toString(),
          aspectRatio: 1,
          width: Platform.SizeScale(200),
        },
        slider: {
          width: Platform.SizeScale(200),
          height: Platform.SizeScale(40),
        },
        avatar: {
          width: Platform.SizeScale(45),
          height: Platform.SizeScale(45),
          borderRadius: Platform.SizeScale(45) / 2,
          marginRight: Platform.SizeScale(6),
          borderWidth: 1,
          borderColor: colors.white,
        },
        indicator: {
          padding: Platform.SizeScale(6),
        },
        fullscreen: {
          position: 'absolute',
          top: Platform.SizeScale(5),
          right: Platform.SizeScale(5),
          backgroundColor: 'rgba(0,0,0, 0.3)',
          alignItems: 'center',
          borderRadius: Platform.SizeScale(5),
        },
        endSessionContainer: {
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginVertical: Platform.SizeScale(10),
        },
        endSession: {
          borderRadius: Platform.SizeScale(10),
          backgroundColor: colors.gray,
          flex: 6 / 10,
        },
        endText: {
          color: colors.white,
          marginHorizontal: Platform.SizeScale(6),
          textAlign: 'center',
        },
        line: {
          height: 1,
          backgroundColor: colors.gray,
          flex: 2 / 10,
        },
      }),
    [colors, maxWidth],
  );
  return {
    colors,
    styles,
  };
};
