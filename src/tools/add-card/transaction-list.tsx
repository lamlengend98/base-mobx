import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { View } from 'react-native';
import moment from 'moment';
import { Icon65doctor } from '@/assets';
import { ICONS } from '@/assets/icons/constants';
import { ListFullOption, Text, Touchable } from '@/components';
import { TransactionTopUp } from '@/models/types';
import { useStyleWallet } from '@/screens/wallet/styles';
import { useTheme } from '@/theme';
import { useStyleAddCard } from './styles';

interface ListProps {
  topUpHistory: Array<TransactionTopUp>;
  onRefreshEvent: () => void;
  onLoadMore: () => void;
  isLoadMore: boolean;
  handleCloseDialog: () => void;
  handleShowLess: () => void;
}

const TransactionList = ({
  topUpHistory,
  onRefreshEvent,
  onLoadMore,
  isLoadMore,
  handleCloseDialog,
  handleShowLess,
}: ListProps) => {
  const styles = useStyleWallet();
  const { colors } = useTheme();
  const styleHeader = useStyleAddCard();
  const { formatMessage, formatNumber } = useIntl();

  const keyExtractor = useCallback((item: any) => item?.id?.toString(), []);

  const renderTime = (time: string) => {
    return moment(time).format('DD/MM/YYYY HH:mm:ss') || '';
  };

  const ListEmptyComponent = useCallback(() => {
    return (
      <View style={styles.emptyStyle}>
        <Text style={styles.emptyText}>
          {formatMessage(
            { id: 'app.list_empty' },
            { name: formatMessage({ id: 'app.call' }).toLowerCase() },
          )}
        </Text>
      </View>
    );
  }, [formatMessage, styles.emptyStyle, styles.emptyText]);

  const ItemSeparatorComponent = useCallback(() => {
    return <View style={styles.separator} />;
  }, [styles.separator]);

  const renderSubItem = useCallback(
    (item: TransactionTopUp) => {
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
    },
    [
      formatNumber,
      styles.payAmount,
      styles.payDetail,
      styles.payItem,
      styles.payList,
    ],
  );

  return (
    <>
      <View style={styleHeader.header}>
        <Touchable onPress={handleShowLess} style={styleHeader.back}>
          <Icon65doctor name={ICONS.ARROW_LEFT} color={colors.white} />
          <View>
            <Text style={styleHeader.backText}>View less</Text>
          </View>
        </Touchable>
        <Touchable onPress={handleCloseDialog}>
          <Icon65doctor name={ICONS.CLOSE} color={colors.white} />
        </Touchable>
      </View>
      <View style={styles.card}>
        <ListFullOption
          data={topUpHistory}
          showsHorizontalScrollIndicator
          showsVerticalScrollIndicator={false}
          loadMore={isLoadMore}
          onLoadMore={onLoadMore}
          contentStyle={styles.list}
          scrollEnabled
          onRefreshEvent={onRefreshEvent}
          {...{
            keyExtractor,
            ItemSeparatorComponent,
            ListEmptyComponent,
            renderSubItem,
          }}
        />
      </View>
    </>
  );
};

export default TransactionList;
