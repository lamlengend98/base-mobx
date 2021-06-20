import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { Platform } from '@/theme';

export const useStyleImageView = () => {
  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          margin: 0,
          justifyContent: 'flex-end',
        },
        content: {
          width: Platform.deviceWidth,
          height: Platform.deviceHeight,
        },
        title: {
          fontSize: Platform.SizeScale(16),
          textAlign: 'center',
          marginTop: Platform.SizeScale(38),
        },
        btn: {
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: Platform.SizeScale(23),
          marginHorizontal: Platform.SizeScale(30),
        },
        vContent: {
          flex: 1,
          marginLeft: Platform.SizeScale(18),
        },
        titleContent: {
          fontSize: Platform.SizeScale(14),
          marginBottom: Platform.SizeScale(6),
        },
        btnClose: {
          position: 'absolute',
          top: Platform.SizeScale(),
          right: Platform.SizeScale(),
        },
      }),
    [],
  );
};
