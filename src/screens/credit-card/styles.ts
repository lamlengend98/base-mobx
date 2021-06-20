import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { Platform, useTheme } from '@/theme';

export const useStyleWallet = () => {
  const { colors } = useTheme();
  return useMemo(
    () =>
      StyleSheet.create({
        numberCard: {
          textAlign: 'justify',
          fontSize: Platform.SizeScale(18),
          justifyContent: 'space-between',
          color: colors.white,
          fontWeight: 'bold',
        },
        spaceBetween: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '90%',
          marginTop: Platform.SizeScale(5),
        },
        imageBg: {
          justifyContent: 'center',
          alignItems: 'center',
          height: Platform.SizeScale(110),
        },
        imageStyle: {
          borderWidth: 2,
        },
        bgAdd: {
          backgroundColor: colors.whiteGreen,
          borderRadius: Platform.SizeScale(10),
          paddingVertical: Platform.SizeScale(40),
          justifyContent: 'center',
          alignItems: 'center',
        },
        imageBgAddCard: {
          height: Platform.SizeScale(110),
        },
        imageBgStyle: { borderRadius: Platform.SizeScale(10) },
        container: {
          marginHorizontal: Platform.SizeScale(15),
          zIndex: 1000,
        },
        walletItemContainer: {
          borderRadius: Platform.SizeScale(10),
          height: Platform.SizeScale(110),
          justifyContent: 'center',
        },
        addCardContainer: {
          marginHorizontal: Platform.SizeScale(5),
          marginTop: Platform.SizeScale(10),
        },
        card: {
          color: colors.white,
          alignSelf: 'center',
          fontSize: Platform.SizeScale(20),
          marginLeft: Platform.SizeScale(9),
        },
        expDate: {
          color: colors.white,
          fontSize: Platform.SizeScale(11),
          fontWeight: '600',
          marginTop: Platform.SizeScale(5),
        },
        addCardBg: { flexDirection: 'row' },
        separator: {
          backgroundColor: colors.lightGray,
          height: Platform.SizeScale(1),
        },
        icon: {
          // fontSize: Platform.SizeScale(18),
          color: colors.darkGray,
        },
        closeContainer: {
          width: Platform.SizeScale(18),
          height: Platform.SizeScale(18),
          borderRadius: Platform.SizeScale(9),
          backgroundColor: colors.white,
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          top: Platform.SizeScale(0),
          right: -Platform.SizeScale(0),
          zIndex: 10000,
          alignSelf: 'flex-end',
        },
      }),
    [colors.darkGray, colors.lightGray, colors.white, colors.whiteGreen],
  );
};
