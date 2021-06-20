import React from 'react';
import { useIntl } from 'react-intl';
import { Image, View } from 'react-native';
import { IAvixo, Icon65doctor } from '@/assets';
import { ICONS } from '@/assets/icons/constants';
import { Text, Touchable } from '@/components';
import { Platform, useTheme } from '@/theme';
import { useStyleWallet } from './styles';
import { WalletItemProps } from './types';

export const WalletItem = ({ title, onPress, amount }: WalletItemProps) => {
  const styles = useStyleWallet();
  const { formatNumber } = useIntl();
  const { colors } = useTheme();

  return (
    <Touchable style={styles.walletItemContainer} {...{ onPress }}>
      <View style={styles.body}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.amount}>${formatNumber(+amount)}</Text>
      </View>
      <View style={styles.bodyImg}>
        <Icon65doctor
          name={ICONS.PLUS_BOLD}
          color={colors.white}
          size={Platform.SizeScale(20)}
        />
        <Image source={IAvixo} style={styles.logo} resizeMode="contain" />
      </View>
    </Touchable>
  );
};
