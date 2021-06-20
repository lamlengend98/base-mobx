import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { View } from 'react-native';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { Icon65doctor } from '@/assets';
import { ICONS } from '@/assets/icons/constants';
import { AppBars, ListFullOption, Text, TextField } from '@/components';
import { CallListItem } from '@/components/items/item-call-list-item';
import { useAppStore, useConfirmation } from '@/hooks';
import { CallListInfo, CallListParam, StatusDoctor } from '@/models/types';
import { NavigationService } from '@/services';
import { ROUTES } from '@/stack';
import { useTheme } from '@/theme';
import { alertMessage } from '@/utils/alert.helper';
import { useStyleCallList } from './styles';

export const CallListScreen = observer(({ navigation }) => {
  const styles = useStyleCallList();
  const { formatMessage } = useIntl();
  const { colors } = useTheme();
  const { contact, doctor, auth, appState, payment, clinic } = useAppStore();
  const [searchText, setSearchText] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [isRefresh, setIsRefresh] = useState(true);
  const [loadMore, setLoadMore] = useState(false);
  const confirmation = useConfirmation();

  console.log('data', toJS(auth.data));

  useEffect(() => {
    if (isRefresh) {
      const data: CallListParam = {
        page: 1,
        page_size: pageSize,
      };
      if (loadMore) {
        data.loadMore = true;
        setLoadMore(false);
      }
      contact?.getListCallBack(data);
      setIsRefresh(false);
    }
  }, [contact, isRefresh, loadMore, pageSize]);

  console.log('contact', toJS(contact.listCallBack));

  const onConfirm = useCallback(
    async (goto: ROUTES, callback?: () => Promise<void>) => {
      try {
        appState.isShowLoading = true;
        if (Number(payment.wallet?.balance!) <= 0) {
          confirmation.showInfo({
            supportText: formatMessage(
              { id: 'app.wallet.warning' },
              { cost: 5 },
            ),
            buttons: [
              {
                onPress: () => {
                  NavigationService.navigate(ROUTES.WALLET, {});
                },
                text: formatMessage({ id: 'app.top_up_amount' }),
              },
            ],
          });
        } else {
          await callback?.();
          NavigationService.navigate(goto, {});
        }
      } catch (error) {
        alertMessage(error.data.message);
      } finally {
        appState.isShowLoading = false;
      }
    },
    [appState, confirmation, formatMessage, payment.wallet?.balance],
  );

  const handleAction = useCallback(
    (
      item: CallListInfo,
      screen: ROUTES,
      doctor_id,
      callback?: (item: CallListInfo) => Promise<void>,
    ) => {
      console.log('====================================');
      console.log('doctor_id', doctor_id);
      console.log('====================================');
      if (!doctor_id) {
        alertMessage(formatMessage({ id: 'clinic.doctor.not_in_65doctor' }));
        return;
      }
      onConfirm(screen, async () => {
        await callback?.(item);
        clinic.setChosenDoctorId(doctor_id);
        navigation.navigate(screen, item);
      });
    },
    [clinic, formatMessage, navigation, onConfirm],
  );

  const onCallbackPress = useCallback(
    async (item: CallListInfo) => {
      try {
        appState.isShowLoading = true;
        const idDoctor = item?.receiverId || '0';
        console.log('====================================');
        console.log('idDoctor', idDoctor);
        console.log('====================================');
        const doctorStatus: StatusDoctor = await doctor.getUserDoctor(
          +idDoctor,
        );
        if (!doctorStatus.isOnline) {
          alertMessage(formatMessage({ id: 'clinic.doctor.offline' }));
          return;
        }
        confirmation.show({
          supportText: formatMessage(
            { id: 'permissions.doctor.call' },
            { cost: 5 },
          ),
          buttons: [
            {
              onPress: () =>
                handleAction(item, ROUTES.PRE_CONSULTATION, idDoctor),
              text: formatMessage({
                id: 'app.agree',
              }),
            },
            {
              onPress: () => {},
              text: formatMessage({
                id: 'app.back',
              }),
            },
          ],
        });
      } catch (error) {
      } finally {
        appState.isShowLoading = false;
      }
    },
    [appState, confirmation, doctor, formatMessage, handleAction],
  );

  const keyExtractor = useCallback((item: any) => item?.id?.toString(), []);

  const renderCallItem = useCallback(
    (item) => {
      return <CallListItem item={item} {...{ onCallbackPress }} />;
    },
    [onCallbackPress],
  );

  const callList = useMemo(() => {
    const list: any = [];
    if (contact.listCallBack) {
      contact.listCallBack?.data?.map((callInfo: CallListInfo) => {
        if (
          callInfo?.receiver?.firstName
            ?.trim()
            .toLowerCase()
            .includes(searchText.trim().toLowerCase()) ||
          callInfo?.receiver?.lastName
            ?.trim()
            .toLowerCase()
            .includes(searchText.trim().toLowerCase())
        ) {
          list.push({
            ...callInfo,
          });
        }
      });
    }
    return list;
  }, [contact.listCallBack, searchText]);

  const isLoadMore = useMemo(() => {
    if (contact?.listCallBack?.count && contact?.listCallBack?.total)
      return contact?.listCallBack?.count < contact?.listCallBack?.total;
  }, [contact?.listCallBack?.count, contact?.listCallBack?.total]);

  const onLoadMore = useCallback(() => {
    setIsRefresh(true);
    setLoadMore(true);
    setPageSize(pageSize + 10);
  }, [pageSize]);

  const onRefreshEvent = useCallback(() => {
    setIsRefresh(true);
    setPageSize(10);
  }, []);

  const onChangeTextSearch = useCallback((text) => {
    setSearchText(text);
  }, []);

  const ListHeaderComponent = useMemo(() => {
    return (
      <>
        <View style={styles.searchContainer}>
          <Icon65doctor name={ICONS.SEARCH} style={styles.searchIcon} />

          <TextField
            fontType={'REGULAR_SF'}
            style={styles.input}
            value={searchText}
            placeholder={formatMessage({ id: 'search_call' })}
            placeholderTextColor={colors.darkGray}
            onChangeText={onChangeTextSearch}
          />
        </View>
      </>
    );
  }, [
    colors.darkGray,
    formatMessage,
    onChangeTextSearch,
    searchText,
    styles.input,
    styles.searchContainer,
    styles.searchIcon,
  ]);

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

  return (
    <View style={{ flex: 1 }}>
      <AppBars
        textAlign="left"
        title={formatMessage({ id: 'app.call_list' })}
        isShadowBottom={false}
      />
      {!appState.isShowLoading && (
        <ListFullOption
          data={callList}
          showsHorizontalScrollIndicator
          showsVerticalScrollIndicator={false}
          loadMore={isLoadMore}
          onLoadMore={onLoadMore}
          style={styles.patientList}
          onRefreshEvent={onRefreshEvent}
          {...{
            keyExtractor,
            ListHeaderComponent,
            ItemSeparatorComponent,
            ListEmptyComponent,
          }}
          renderSubItem={renderCallItem}
        />
      )}
    </View>
  );
});
