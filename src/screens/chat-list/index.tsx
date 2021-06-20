import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { View } from 'react-native';
import _ from 'lodash';
import { observer } from 'mobx-react';
import { Icon65doctor } from '@/assets';
import { ICONS } from '@/assets/icons/constants';
import { AppBars, ListFullOption, Text, TextField } from '@/components';
import { useAppStore } from '@/hooks';
import { ChatListInfo, PaginationParam } from '@/models/types';
import { useTheme } from '@/theme';
import { Conversation } from './conversation';
import { useStylesChatList } from './styles';

export const ChatList = observer(({ navigation }) => {
  const styles = useStylesChatList();
  const { formatMessage } = useIntl();
  const { contact, appState } = useAppStore();
  const { listChat } = contact;
  const [pageSize, setPageSize] = useState(10);
  const [isRefresh, setIsRefresh] = useState(true);
  const [searchText, setSearchText] = useState('');
  const { colors } = useTheme();
  const [loadMore, setLoadMore] = useState(false);

  useEffect(() => {
    if (isRefresh) {
      const data: PaginationParam = {
        page: 1,
        page_size: pageSize,
      };
      if (loadMore) {
        data.loadMore = true;
        setLoadMore(false);
      }
      contact.getChatList(data);
      setIsRefresh(false);
    }
  }, [contact, isRefresh, loadMore, pageSize]);

  useEffect(() => {
    try {
      if (contact.listChat) {
        contact.setChatList({
          data: contact?.listChat?.data.filter((e) =>
            `${e?.doctor?.firstName} ${e?.doctor?.lastName}`.includes(
              searchText,
            ),
          ),
          count: 1,
          total: 10,
        });
      }
    } catch (error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
    }
  }, [contact, searchText]);

  const renderItem = useCallback(
    (item) => <Conversation {...{ navigation, item }} />,
    [navigation],
  );

  const keyExtractor = useCallback((item: any) => item.id, []);

  const onChangeTextSearch = _.debounce(
    (text) => {
      setSearchText(text);
    },
    400,
    { leading: false, trailing: true },
  );

  const renderLeftAccessory = useCallback(() => {
    return (
      <View style={styles.iconContainer}>
        <Icon65doctor name={ICONS.SEARCH} style={styles.searchIcon} />
      </View>
    );
  }, [styles]);

  const ListHeaderComponent = useMemo(
    () => (
      <TextField
        placeholder={formatMessage({ id: 'chat_list.search.placeholder' })}
        inputStyle={styles.inputSearch}
        style={styles.search}
        onChangeText={onChangeTextSearch}
        placeholderTextColor={colors.darkGray}
        {...{ renderLeftAccessory }}
      />
    ),
    [
      colors.darkGray,
      formatMessage,
      onChangeTextSearch,
      renderLeftAccessory,
      styles.inputSearch,
      styles.search,
    ],
  );

  const ListEmptyComponent = useCallback(() => {
    return (
      <View style={styles.emptyStyle}>
        <Text style={styles.emptyText}>
          {formatMessage(
            { id: 'app.list_empty' },
            { name: formatMessage({ id: 'app.chat' }).toLowerCase() },
          )}
        </Text>
      </View>
    );
  }, [formatMessage, styles.emptyStyle, styles.emptyText]);

  const ItemSeparatorComponent = useCallback(
    () => <View style={styles.separator} />,
    [styles.separator],
  );

  const chatList = useMemo(() => {
    const list: any = [];
    if (listChat) {
      listChat?.data?.map((chatInfo: ChatListInfo) => {
        if (
          chatInfo?.doctor?.firstName
            ?.trim()
            .toLowerCase()
            .includes(searchText.trim().toLowerCase()) ||
          chatInfo?.doctor?.lastName
            ?.trim()
            .toLowerCase()
            .includes(searchText.trim().toLowerCase())
        ) {
          list.push({
            ...chatInfo,
          });
        }
      });
    }
    return _.sortBy(list, (chatInfo: ChatListInfo) => {
      return new Date(chatInfo.updatedAt);
    });
  }, [listChat, searchText]);

  const isLoadMore = useMemo(() => {
    if (listChat?.count && listChat?.total)
      return listChat?.count < listChat?.total;
  }, [listChat?.count, listChat?.total]);

  const onLoadMore = useCallback(() => {
    setIsRefresh(true);
    setLoadMore(true);
    setPageSize(pageSize + 10);
  }, [pageSize]);

  const onRefreshEvent = useCallback(() => {
    setIsRefresh(true);
    setPageSize(10);
  }, []);

  return (
    <>
      <AppBars title="Chat" />
      {!appState.isShowLoading && (
        <ListFullOption
          data={chatList}
          showsHorizontalScrollIndicator
          showsVerticalScrollIndicator={false}
          loadMore={isLoadMore}
          onLoadMore={onLoadMore}
          contentStyle={styles.container}
          onRefreshEvent={onRefreshEvent}
          renderSubItem={renderItem}
          {...{
            ListHeaderComponent,
            keyExtractor,
            ItemSeparatorComponent,
            ListEmptyComponent,
          }}
        />
      )}
    </>
  );
});
