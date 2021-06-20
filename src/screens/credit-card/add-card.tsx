import React from 'react';
import { useIntl } from 'react-intl';
import { View } from 'react-native';
import { Text, Touchable } from '@/components';
import { COLORS, Platform } from '@/theme';
import { useStyleWallet } from './styles';

export const AddCardItem = ({ onPress, isFromPayment }) => {
  const styles = useStyleWallet();
  const { formatMessage } = useIntl();
  console.log('====================================');
  console.log('isFromPayment.isFromPayment', isFromPayment);
  console.log('====================================');

  return (
    <Touchable
      {...{ onPress }}
      style={[
        styles.addCardContainer,
        {
          marginHorizontal: Platform.SizeScale(
            isFromPayment && isFromPayment?.hasCard ? 5 : 0,
          ),
        },
      ]}>
      <View style={styles.bgAdd}>
        <Text style={{ color: COLORS.GREEN_TEXT }}>{`+ ${formatMessage({
          id: 'app.add_card',
        })}`}</Text>
      </View>
    </Touchable>
  );
};
