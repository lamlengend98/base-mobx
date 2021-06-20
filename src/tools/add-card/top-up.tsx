import React from 'react';
import { useIntl } from 'react-intl';
import { ScrollView, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import moment from 'moment';
import { Icon65doctor } from '@/assets';
import { ICONS } from '@/assets/icons/constants';
import { Button, Text, Touchable } from '@/components';
import { TransactionResponse, TransactionTopUp } from '@/models/types';
import { useTheme } from '@/theme';
import { useStyleAddCard } from './styles';

interface TopUpProps {
  handleCloseDialog: () => void;
  amountText: string;
  onChangeText: (text: string) => void;
  onAddPress: () => void;
  handleShowAll: () => void;
  listTransaction: TransactionResponse;
}

const TopUp = ({
  handleCloseDialog,
  amountText,
  onChangeText,
  onAddPress,
  handleShowAll,
  listTransaction,
}: TopUpProps) => {
  const { colors } = useTheme();
  const styles = useStyleAddCard();
  const { formatMessage, formatNumber } = useIntl();
  const renderTime = (time: string) => {
    return moment(time).format('DD/MM/YYYY HH:mm:ss') || '';
  };
  return (
    <View>
      <View style={styles.header}>
        <View style={styles.back} />
        <Touchable onPress={handleCloseDialog}>
          <Icon65doctor name={ICONS.CLOSE} color={colors.white} />
        </Touchable>
      </View>
      <View style={styles.card}>
        <Text style={styles.title}>
          {formatMessage({ id: 'app.top_up_amount' })}
        </Text>
        <View style={{ flexDirection: 'row', width: '100%' }}>
          <View style={{ width: '10%' }}>
            <Text numberOfLines={1} style={styles.amount}>
              $
            </Text>
          </View>
          <View style={{ width: '90%' }}>
            <TextInput
              allowFontScaling={false}
              keyboardType="numeric"
              value={amountText}
              onChangeText={onChangeText}
              style={styles.amount}
            />
          </View>
        </View>
        <View style={styles.body}>
          <View style={styles.vBtn}>
            <Button
              buttonStyle="BLUE"
              style={styles.btnAdd}
              label={formatMessage({ id: 'app.add' })}
              onPress={onAddPress}
            />
          </View>
          <View style={styles.method}>
            <Text numberOfLines={1} style={styles.pay}>
              {formatMessage(
                { id: 'app.pay_by' },
                {
                  total: listTransaction?.total,
                },
              )}
            </Text>
            <Touchable onPress={handleShowAll}>
              <Text numberOfLines={1} style={styles.viewAll}>
                {formatMessage({ id: 'app.view_all' })}
              </Text>
            </Touchable>
          </View>
          {listTransaction?.data?.length > 0 && (
            <ScrollView>
              {listTransaction?.data?.map(
                (item: TransactionTopUp, index: number) => {
                  if (index < 5) {
                    return (
                      <View style={styles.payList}>
                        <View style={styles.payItem}>
                          <Icon65doctor name={Icon65doctor.icons.CLOCK} />
                          <View style={styles.payDetail}>
                            <Text>{renderTime(item?.createdAt)}</Text>
                          </View>
                          <View>
                            <Text style={styles.payAmount}>
                              ${formatNumber(+item?.amount)}
                            </Text>
                          </View>
                        </View>
                      </View>
                    );
                  }
                },
              )}
            </ScrollView>
          )}
        </View>
      </View>
    </View>
  );
};

export default TopUp;
