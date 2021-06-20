import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { View } from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import { Icon65doctor, Visa } from '@/assets';
import { ICONS } from '@/assets/icons/constants';
import { Text, Touchable } from '@/components';
import VisaImage from '@/components/elements/visa-svg';
import { CreditCardInfo } from '@/models/types';
import { COLORS, Platform } from '@/theme';
import { useStyleWallet } from './styles';

interface CardProps {
  item: CreditCardInfo;
  onSelectCard?: any;
  selectedCard?: any;
  isFromPayment?: any;
  onDelete?: any;
  noBorder?: boolean;
}
export const CardItem = ({
  item,
  onSelectCard,
  selectedCard,
  isFromPayment,
  onDelete,
  noBorder,
}: CardProps) => {
  const styles = useStyleWallet();
  const { formatMessage } = useIntl();

  const renderCard = () => {
    const cardArray = item?.card?.last4?.split('');
    const asteriskArray = ['*', '*', '*', '*', '*', '*'];
    return (
      <View style={styles.spaceBetween}>
        {asteriskArray.map((characters, index) => {
          return (
            <Text key={index} style={styles.numberCard}>
              {characters}
            </Text>
          );
        })}
        {cardArray.map((characters, index) => {
          return (
            <Text key={index} style={styles.numberCard}>
              {characters}
            </Text>
          );
        })}
      </View>
    );
  };

  const onPress = useCallback(() => {
    if (!isFromPayment || isFromPayment?.creditCard) {
      onSelectCard && onSelectCard(item);
    }
  }, [isFromPayment, item, onSelectCard]);

  const onDeleteItem = useCallback(() => {
    onDelete && onDelete(item);
  }, [item, onDelete]);

  return (
    <View
      style={[
        isFromPayment &&
          !isFromPayment?.creditCard && {
            padding: Platform.SizeScale(5),
            paddingVertical: Platform.SizeScale(3),
            // paddingHorizontal: 0,
          },
      ]}>
      {isFromPayment && !isFromPayment?.creditCard && (
        <Touchable
          onPress={onDeleteItem}
          hitSlop={{
            top: 30,
            bottom: 30,
            right: 30,
            left: 30,
          }}
          style={styles.closeContainer}>
          <Icon65doctor name={ICONS.CLOSE} size={10} style={styles.icon} />
        </Touchable>
      )}
      <Touchable
        activeOpacity={isFromPayment || !isFromPayment?.creditCard ? 1 : 0.8}
        {...{ onPress }}
        style={[
          !noBorder && styles.imageStyle,
          styles.walletItemContainer,
          onSelectCard && {
            borderColor: selectedCard === item?.id ? COLORS.RED : 'transparent',
          },
        ]}>
        <VisaImage />
        <View style={styles.container}>
          <View style={styles.addCardBg}>
            <AutoHeightImage source={Visa} width={Platform.SizeScale(58)} />
            <Text style={styles.card}>
              {formatMessage({
                id: 'app.visa',
              })}
            </Text>
          </View>
          <View>{renderCard()}</View>
          <View>
            <Text style={styles.expDate}>{`${formatMessage({
              id: 'app.exp_date',
            })} ${item?.card?.exp_month}.${item?.card?.exp_year}`}</Text>
          </View>
        </View>
      </Touchable>
    </View>
  );
};
