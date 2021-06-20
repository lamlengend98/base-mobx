import React, { useCallback, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react';
import { AppBars } from '@/components';
import { useAddCard, useAppStore } from '@/hooks';
import { TransactionParam } from '@/models/types';
import { ROUTES } from '@/stack';
import { useStyleWallet } from './styles';
import { WalletItemProps } from './types';
import { WalletItem } from './wallet-item';

export const WalletScreen = observer(({}) => {
  const styles = useStyleWallet();
  const { payment } = useAppStore();
  const { formatMessage } = useIntl();
  const [pageSize] = useState(10);
  const [isRefresh, setIsRefresh] = useState(true);
  const addCard = useAddCard();
  const navigation = useNavigation();
  const { creditCard } = payment;

  useEffect(() => {
    payment.getWallet();
  }, [payment]);

  const navigateToCards = useCallback(() => {
    navigation.navigate(ROUTES.CREDIT_CARD, { creditCard });
  }, [creditCard, navigation]);

  useEffect(() => {
    if (isRefresh) {
      const body: TransactionParam = {
        page: 1,
        page_size: pageSize,
        type: 'TOPUP',
      };
      payment.getAllTransaction(body);
      setIsRefresh(false);
    }
  }, [isRefresh, pageSize, payment]);

  const onPress = useCallback(() => {
    addCard.open(navigateToCards);
  }, [addCard, navigateToCards]);

  const infoWallet: WalletItemProps = {
    title: 'Available balance',
    amount: payment?.wallet?.balance || '0',
    onPress: onPress,
  };

  return (
    <>
      <AppBars title={formatMessage({ id: 'app.avixo.wallet' })} />
      <View style={styles.container}>
        <WalletItem onPress={onPress} {...infoWallet} />
      </View>
    </>
  );
});
