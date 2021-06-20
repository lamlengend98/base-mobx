import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import Color from 'color';
import { Platform, useTheme } from '@/theme';

export const useStylesItemNotification = () => {
  const { colors } = useTheme();

  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: colors.white,
          borderRadius: Platform.SizeScale(),
          overflow: 'hidden',
          flexDirection: 'row',
          padding: Platform.SizeScale(),
          marginHorizontal: Platform.SizeScale(15),
          marginVertical: Platform.SizeScale(3),
        },
        content: {
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          paddingHorizontal: Platform.SizeScale(10),
        },
        title: {
          color: colors.blue,
        },
        description: {
          fontSize: Platform.SizeScale(12),
          paddingVertical: Platform.SizeScale(1),
        },
        callTime: {
          fontSize: Platform.SizeScale(11),
          paddingVertical: Platform.SizeScale(1),
        },
        buttonContainer: {
          paddingVertical: Platform.SizeScale(10),
          paddingHorizontal: Platform.SizeScale(12),
          backgroundColor: colors.blue,
          flexDirection: 'row',
          justifyContent: 'center',
          borderRadius: Platform.SizeScale(36),
          alignItems: 'center',
          width: Platform.SizeScale(120),
        },
        buttonText: {
          color: colors.white,
          fontSize: Platform.SizeScale(11),
          marginRight: Platform.SizeScale(5),
        },
        buttonTextContainer: {
          alignItems: 'center',
          justifyContent: 'center',
          width: '85%',
        },
        buttonTextContainer2: {
          width: '85%',
        },
        buttonIconContainer: {
          width: '15%',
        },
        iconStyle: {
          width: Platform.SizeScale(14),
          height: Platform.SizeScale(11),
        },
        vAvatar: {
          borderRadius: Platform.SizeScale(45) / 2,
          backgroundColor: colors.white,
          shadowColor: Color(colors.black, 'hex').alpha(0.5).toString(),
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.5,
          shadowRadius: 0.5,
          elevation: 1,
          overflow: 'hidden',
          width: Platform.SizeScale(45),
          height: Platform.SizeScale(45),
        },
        avatar: {
          width: '100%',
          height: '100%',
        },
      }),
    [colors],
  );
};
