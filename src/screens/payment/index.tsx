import React, { useCallback, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { FlatList, View } from 'react-native';
import { observer } from 'mobx-react';
import { Icon65doctor } from '@/assets';
import { ICONS } from '@/assets/icons/constants';
import { AppBars, Text, Touchable } from '@/components';
import { ROUTES } from '@/stack';
import { useStylePayment } from './styles';
import { Payment, PaymentProps } from './types';

export const PaymentScreen = observer(({ navigation, route }) => {
  const styles = useStylePayment();
  const { formatMessage } = useIntl();
  const hasCard = route.params;
  console.log('====================================');
  console.log('route', hasCard);
  console.log('====================================');

  const menus = useMemo(
    () => [
      {
        id: 1,
        label: formatMessage({ id: 'app.credit_card' }),
        rightIcon: !hasCard && ICONS.WARNING,
        screen: ROUTES.CREDIT_CARD,
      },
      {
        id: 2,
        label: formatMessage({ id: 'avixo_wallets' }),
        screen: ROUTES.WALLET,
      },
    ],
    [formatMessage, hasCard],
  );

  const keyExtractor = useCallback((item: any) => item?.id?.toString(), []);

  const onPaymentPress = useCallback(
    (item?: Payment) => {
      navigation.navigate(
        item?.screen,
        item?.id === 1 ? { hasCard } : { item },
      );
    },
    [hasCard, navigation],
  );

  function renderPaymentItem({ item }: PaymentProps) {
    console.log('====================================');
    console.log('item.PaymentProps', item);
    console.log('====================================');
    function onPress() {
      return onPaymentPress?.(item);
    }

    return (
      <Touchable style={styles.keyValue} onPress={onPress}>
        <Text fontType={'MEDIUM_SF'} style={styles.text}>
          {item?.label}
        </Text>

        {item?.rightIcon && (
          <Icon65doctor name={item?.rightIcon} style={styles.icon} />
        )}
      </Touchable>
    );
  }

  return (
    <>
      <View style={styles.container}>
        <AppBars
          isShadowBottom={false}
          title={formatMessage({ id: 'payment' })}
        />

        <FlatList
          style={styles.list}
          keyExtractor={keyExtractor}
          data={menus}
          renderItem={renderPaymentItem}
        />
      </View>
    </>
  );
});
