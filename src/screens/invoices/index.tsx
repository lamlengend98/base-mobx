import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react';
import { Icon65doctor } from '@/assets';
import { ICONS } from '@/assets/icons/constants';
import { AppBars, ListFullOption, Text, TextField } from '@/components';
import { useAppStore } from '@/hooks';
import { PaginationParam } from '@/models/types';
import { ROUTES } from '@/stack';
import { useTheme } from '@/theme';
import { Invoices } from './invoice';
import { useStyleInvoices } from './styles';

export const InvoicesScreen = observer(() => {
  const styles = useStyleInvoices();
  const navigation = useNavigation();
  const { formatMessage } = useIntl();
  const [pageSize, setPageSize] = useState(10);
  const [isRefresh, setIsRefresh] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [loadMore, setLoadMore] = useState(false);

  const { invoice, appState } = useAppStore();
  const { invoiceLst } = invoice;

  const { colors } = useTheme();

  useEffect(() => {
    if (isRefresh) {
      const param: PaginationParam = {
        page: 1,
        page_size: pageSize,
      };
      if (loadMore) {
        param.loadMore = true;
        setLoadMore(false);
      }
      invoice.getInvoices(param);
      setIsRefresh(false);
    }
  }, [invoice, isRefresh, loadMore, pageSize]);

  const goToInvoiceDetail = useCallback(
    (item) => {
      navigation.navigate(ROUTES.INVOICES_DETAIL, { invoice: item });
    },
    [navigation],
  );

  const onChangeText = useCallback((value: string) => {
    setSearchText(value);
  }, []);

  const renderItem = useCallback(
    (item) => {
      return <Invoices {...{ item }} onPress={goToInvoiceDetail} />;
    },
    [goToInvoiceDetail],
  );

  const keyExtractor = useCallback((_, index: number) => index.toString(), []);

  const renderLeftAccessory = useCallback(
    () => (
      <View style={{ width: '30%', alignItems: 'center' }}>
        <Icon65doctor name={ICONS.SEARCH} style={styles.searchIcon} />
      </View>
    ),
    [styles],
  );

  const isLoadMore = useMemo(() => {
    if (invoiceLst?.count && invoiceLst?.total)
      return invoiceLst?.count < invoiceLst?.total;
  }, [invoiceLst?.count, invoiceLst?.total]);

  const onLoadMore = useCallback(() => {
    setIsRefresh(true);
    setLoadMore(true);
    setPageSize(pageSize + 10);
  }, [pageSize]);

  const onRefreshEvent = useCallback(() => {
    setIsRefresh(true);
    setPageSize(10);
  }, []);

  const ListEmptyComponent = useCallback(() => {
    return (
      <View style={styles.emptyStyle}>
        <Text style={styles.emptyText}>
          {formatMessage(
            { id: 'app.list_empty' },
            { name: formatMessage({ id: 'app.invoice' }).toLowerCase() },
          )}
        </Text>
      </View>
    );
  }, [formatMessage, styles.emptyStyle, styles.emptyText]);

  const invoiceData = useMemo(() => {
    const list: any = [];
    invoiceLst?.data?.map((item) => {
      if (
        item?.doctor?.firstName
          ?.trim()
          .toLowerCase()
          .includes(searchText.trim().toLowerCase()) ||
        item?.doctor?.lastName
          ?.trim()
          .toLowerCase()
          .includes(searchText.trim().toLowerCase())
      ) {
        list.push({
          ...item,
        });
      }
    });
    return list;
  }, [invoiceLst?.data, searchText]);

  return (
    <>
      <AppBars
        textAlign="left"
        title={formatMessage({ id: 'app.invoices.title' })}
        isShadowBottom={false}
      />
      <View style={styles.bodyContainer}>
        <TextField
          fontType="REGULAR_SF"
          style={styles.input}
          inputStyle={styles.inputSearch}
          placeholder={formatMessage({ id: 'app.invoices.search' })}
          {...{ renderLeftAccessory }}
          textAlign={'left'}
          onChangeText={onChangeText}
          placeholderTextColor={colors.darkGray}
        />
        {!appState.isShowLoading && (
          <ListFullOption
            data={invoiceData}
            showsHorizontalScrollIndicator
            showsVerticalScrollIndicator={false}
            loadMore={isLoadMore}
            onLoadMore={onLoadMore}
            contentStyle={styles.list}
            onRefreshEvent={onRefreshEvent}
            {...{ keyExtractor, ListEmptyComponent }}
            renderSubItem={renderItem}
          />
        )}
      </View>
    </>
  );
});
