import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import Color from 'color';
import { Platform, useTheme } from '@/theme';

export const useStyleWallet = () => {
  const { colors } = useTheme();

  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          marginVertical: Platform.SizeScale(),
        },
        walletItemContainer: {
          flexDirection: 'row',
          borderRadius: Platform.SizeScale(),
          backgroundColor: colors.blue,
          marginHorizontal: Platform.SizeScale(),
          padding: Platform.SizeScale(),
          overflow: 'hidden',
        },
        body: {
          flex: 1,
          justifyContent: 'space-between',
        },
        bodyImg: {
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        },
        title: {
          fontSize: Platform.SizeScale(22),
          color: colors.white,
          fontWeight: '400',
        },
        amount: {
          fontWeight: '700',
          fontSize: Platform.SizeScale(22),
          color: colors.white,
        },
        logo: {
          width: Platform.deviceWidth / 4,
          height: Platform.SizeScale(17),
          tintColor: colors.white,
        },
        separator: {
          height: Platform.SizeScale(6),
        },
        containerModal: {
          margin: 0,
          backgroundColor: Color(colors.black, 'hex').alpha(0.3).toString(),
          justifyContent: 'flex-end',
        },
        header: {
          alignItems: 'center',
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
          borderBottomLeftRadius: Platform.SizeScale(10),
          borderBottomRightRadius: Platform.SizeScale(10),
          paddingHorizontal: Platform.SizeScale(18),
          shadowColor: Color(colors.black, 'hex').alpha(0.3).toString(),
          shadowOffset: { width: 0, height: -1 },
          shadowOpacity: 0.5,
          shadowRadius: 0.5,
          marginHorizontal: Platform.SizeScale(15),
          paddingBottom: Platform.SizeScale(20),
          maxHeight:
            (Platform.deviceHeight *
              (Platform.OS === 'android' ? 63.5 : 66.5)) /
            100,
        },
        titleModal: {
          color: colors.darkGray,
          fontWeight: '700',
        },
        amountModal: {
          fontSize: Platform.SizeScale(48),
          color: colors.blue,
          fontWeight: '700',
        },
        bodyModal: {
          borderTopColor: colors.sliverChalice,
          borderTopWidth: 0.5,
          borderBottomColor: colors.sliverChalice,
          borderBottomWidth: 0.5,
          paddingVertical: Platform.SizeScale(),
          marginBottom: Platform.SizeScale(14),
        },
        method: {
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: Platform.SizeScale(8),
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
          alignItems: 'center',
          padding: Platform.SizeScale(12),
          justifyContent: 'center',
          height: Platform.SizeScale(48),
          borderRadius: Platform.SizeScale(24),
          backgroundColor: colors.blue,
          width: '50%',
          flexDirection: 'row',
        },
        btnText: {
          color: colors.white,
          width: '100%',
          textAlign: 'center',
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
        inputContainer: {
          flexDirection: 'row',
          width: '100%',
          alignItems: 'center',
        },
        inputChild1: { width: '15%' },
        inputChild2: { width: '85%' },
        contentContainerStyle: {
          padding: 16,
        },
        headerModal: {
          alignItems: 'center',
          backgroundColor: 'yellow',
          paddingVertical: 20,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          display: 'none',
        },
        list: {
          width: '100%',
        },
        emptyStyle: {
          alignSelf: 'center',
          marginTop: 10,
        },
        emptyText: {
          fontSize: Platform.SizeScale(16),
          fontWeight: '500',
        },
      }),
    [colors],
  );
};
