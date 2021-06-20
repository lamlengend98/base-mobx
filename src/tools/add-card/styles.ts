import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import Color from 'color';
import { Platform, useTheme } from '@/theme';

export const useStyleAddCard = () => {
  const { colors } = useTheme();

  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          margin: 0,
          backgroundColor: Color(colors.black, 'hex').alpha(0.3).toString(),
        },
        header: {
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: colors.blue,
          marginHorizontal: Platform.SizeScale(15),
          paddingVertical: Platform.SizeScale(10),
          paddingHorizontal: Platform.SizeScale(18),
          borderTopStartRadius: Platform.SizeScale(10),
          borderTopEndRadius: Platform.SizeScale(10),
        },
        line: {
          width: Platform.SizeScale(122),
          backgroundColor: colors.wildSand,
          height: Platform.SizeScale(4),
          borderRadius: Platform.SizeScale(3),
          marginVertical: Platform.SizeScale(6),
        },
        card: {
          backgroundColor: colors.white,
          borderBottomEndRadius: Platform.SizeScale(10),
          borderBottomStartRadius: Platform.SizeScale(10),
          elevation: 1,
          paddingHorizontal: Platform.SizeScale(18),
          shadowColor: Color(colors.black, 'hex').alpha(0.3).toString(),
          shadowOffset: { width: 0, height: -1 },
          shadowOpacity: 0.5,
          shadowRadius: 0.5,
          marginHorizontal: Platform.SizeScale(15),
          paddingBottom: Platform.SizeScale(),
          paddingTop: Platform.SizeScale(10),
        },
        title: {
          color: colors.darkGray,
          fontWeight: '700',
        },
        amount: {
          fontSize: Platform.SizeScale(36),
          color: colors.blue,
          fontWeight: '700',
          height: Platform.OS === 'android' ? Platform.SizeScale(60) : 'auto',
        },
        body: {
          borderTopColor: colors.sliverChalice,
          borderTopWidth: 1,
          paddingVertical: Platform.SizeScale(),
        },
        method: {
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: Platform.SizeScale(8),
          paddingBottom: Platform.SizeScale(10),
          borderBottomWidth: 0.5,
          borderBottomColor: colors.gray,
        },
        pay: {
          color: colors.darkGray,
          fontWeight: '400',
        },
        viewAll: {
          color: colors.darkGray,
          fontWeight: '400',
        },
        vBtn: {
          alignItems: 'center',
        },
        btnAdd: {
          width: '50%',
        },
        payList: {
          marginTop: Platform.SizeScale(9),
        },
        payItem: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: Platform.SizeScale(6),
        },
        payDetail: {
          flex: 1,
          marginHorizontal: Platform.SizeScale(6),
        },
        payTitle: {
          fontWeight: '700',
          color: colors.darkGray,
        },
        payAmount: {
          fontWeight: '700',
          color: colors.darkGray,
        },
        back: {
          flexDirection: 'row',
          width: '23%',
          justifyContent: 'space-between',
          alignItems: 'center',
        },
        backText: {
          color: colors.white,
          fontSize: Platform.SizeScale(14),
        },
        bodyModal: {
          height: Platform.SizeScale(400),
        },
      }),
    [colors],
  );
};
