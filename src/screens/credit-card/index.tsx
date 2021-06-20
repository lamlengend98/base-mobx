import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { Alert, FlatList, View } from 'react-native';
import { observer } from 'mobx-react';
import { AppBars, Button } from '@/components';
import { useAppStore } from '@/hooks';
import { CreditCardInfo, TransactionParam } from '@/models/types';
import { ROUTES } from '@/stack';
import { Platform } from '@/theme';
import { alertMessage } from '@/utils/alert.helper';
import { AddCardItem } from './add-card';
import { CardItem } from './card-item';
import { useStyleWallet } from './styles';

export const CreditCardScreen = observer(({ navigation, route }) => {
  const styles = useStyleWallet();
  const { formatMessage } = useIntl();
  const { payment } = useAppStore();

  const isFromPayment = route.params;
  console.log('====================================');
  console.log('route', route);
  console.log('====================================');

  const [card, setCard]: any = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);

  const buttonShow = useMemo(() => {
    if (card) return true;
    return false;
  }, [card]);

  useEffect(() => {
    payment.getCard();
  }, [payment]);

  const openModal = useCallback(() => {
    navigation.navigate(ROUTES.ADD_CREDIT_CARD);
  }, [navigation]);

  const onSelectCard = useCallback(
    (selectedCard) => {
      if (selectedCard?.id === card?.id) {
        setCard(null);
      } else setCard(selectedCard);
    },
    [card],
  );

  const onDelete = useCallback(
    (item: CreditCardInfo) => {
      Alert.alert(formatMessage({ id: 'app.delete_card_confirm' }), '', [
        {
          text: formatMessage({ id: 'permissions.cancel' }),
          style: 'cancel',
          onPress: () => {},
        },
        {
          text: 'OK',
          onPress: async () => {
            setIsDisabled(true);
            const data = {
              id: item?.id,
            };
            const response: any = await payment.deleteCard(data);
            if (response) {
              alertMessage(formatMessage({ id: 'app.success' }), () => {
                const noLoading = false;
                payment.getCard(noLoading);
              });
            } else {
              alertMessage(formatMessage({ id: 'app.fail' }), () => {});
            }
            setTimeout(() => {
              setIsDisabled(false);
            }, 500);
          },
        },
      ]);
    },
    [formatMessage, payment],
  );

  const renderItem = useCallback(
    ({ item, index }: { item: CreditCardInfo; index: any }) => (
      <CardItem
        key={index}
        onSelectCard={onSelectCard}
        selectedCard={card?.id}
        item={item}
        onDelete={onDelete}
        isFromPayment={isFromPayment}
      />
    ),
    [card?.id, isFromPayment, onDelete, onSelectCard],
  );

  const onSubmit = useCallback(async () => {
    setIsDisabled(true);
    const data = {
      amount: +payment.amount,
      currency: 'SGD',
      payment_method: card?.id,
    };
    const response: any = await payment.addTopUp(data);
    if (response) {
      alertMessage(formatMessage({ id: 'app.success' }), () => {
        const body: TransactionParam = {
          page: 1,
          page_size: 10,
          type: 'TOPUP',
        };
        payment.getWallet();
        payment.getAllTransaction(body);
        navigation.goBack();
      });
    } else {
      alertMessage(formatMessage({ id: 'app.fail' }), () => {});
    }
    setTimeout(() => {
      setIsDisabled(false);
    }, 500);
  }, [card?.id, formatMessage, navigation, payment]);

  const keyExtractor = useCallback((_, index: number) => index.toString(), []);

  const ItemSeparatorComponent = useCallback(
    () => <View style={styles.separator} />,
    [styles.separator],
  );

  const ListFooterComponent = useCallback(
    () => <AddCardItem isFromPayment={isFromPayment} onPress={openModal} />,
    [isFromPayment, openModal],
  );

  return (
    <>
      <AppBars title={formatMessage({ id: 'app.credit_card' })} />
      <FlatList
        data={payment.creditCard}
        contentContainerStyle={{ paddingBottom: Platform.SizeScale(50) }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={{
          marginHorizontal: Platform.SizeScale(
            isFromPayment || !isFromPayment?.hasCard ? 15 : 10,
          ),
          marginTop: Platform.SizeScale(15),
        }}
        {...{
          renderItem,
          keyExtractor,
          ItemSeparatorComponent,
          ListFooterComponent,
        }}
      />
      <View style={{ height: 0 }}>
        <Button
          style={{
            marginHorizontal: Platform.SizeScale(20),
            transform: [
              {
                translateY: buttonShow
                  ? -Platform.SizeScale(90)
                  : Platform.SizeScale(70),
              },
            ],
          }}
          disabled={isDisabled}
          onPress={onSubmit}
          buttonStyle={'DARK_BLUE'}
          labelColor={'white'}
          label={formatMessage({ id: 'app.confirm' })}
          fontType={'BOLD_SF'}
        />
      </View>
    </>
  );
});
