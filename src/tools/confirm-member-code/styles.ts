import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import Color from 'color';
import { Platform, useTheme } from '@/theme';

export const useStyleMemberCode = () => {
  const { colors } = useTheme();

  return useMemo(
    () =>
      StyleSheet.create({
        root: {
          position: 'absolute',
          width: Platform.deviceWidth,
          height: Platform.deviceHeight,
        },
        container: {
          paddingVertical: 20,
          justifyContent: 'center',
        },
        body: {
          alignItems: 'center',
          backgroundColor: colors.white,
          shadowColor: Color(colors.black, 'hex').alpha(0.3).toString(),
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.3,
          elevation: 5,
          padding: Platform.SizeScale(35),
          borderRadius: Platform.SizeScale(25),
        },
        userCircle: {
          color: colors.lightGreen,
          fontSize: Platform.SizeScale(80),
          marginVertical: Platform.SizeScale(),
        },
        memberCode: {
          textAlign: 'center',
        },
        title: {
          fontSize: Platform.SizeScale(18),
          fontWeight: '500',
          textAlign: 'center',
        },
        inputNumber: {
          marginVertical: Platform.SizeScale(),
        },
        scrim: {
          ...StyleSheet.absoluteFillObject,
          flexGrow: 1,
          backgroundColor: Color(colors.black, 'hex').alpha(0.15).toString(),
          padding: 16,
          justifyContent: 'center',
          zIndex: 1,
        },
        buttons: {
          flexDirection: 'row',
          justifyContent: 'flex-end',
        },
        btnTitle: {
          textAlign: 'center',
        },
        supportText: {
          fontSize: Platform.SizeScale(14),
          marginVertical: Platform.SizeScale(8),
        },
        subSupportText: {
          fontSize: Platform.SizeScale(10),
        },
        touchScrim: {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
        },
        btn: {
          minWidth: Platform.SizeScale(55),
          marginLeft: Platform.SizeScale(10),
          alignItems: 'center',
        },
        btnTextOK: {
          fontSize: Platform.SizeScale(14),
          color: colors.darkGray,
        },
        btnTextCancel: {
          fontSize: Platform.SizeScale(14),
          color: colors.darkGray,
        },
      }),
    [colors],
  );
};
