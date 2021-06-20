import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  View,
} from 'react-native';

interface ListProps {
  data: any;
  renderSubItem: any;
  style?: any;
  horizontal?: any;
  showsHorizontalScrollIndicator?: any;
  showsVerticalScrollIndicator?: any;
  ListHeaderComponent?: any;
  onRefreshEvent?: any;
  scrollEnabled?: any;
  ListEmptyComponent?: any;
  isMultiSelect?: any;
  loadMore?: any;
  onLoadMore?: any;
  listFooterComponent?: any;
  onScroll?: any;
  noLoading?: any;
  noRefresh?: any;
  contentStyle?: any;
}
function keyExtractor(item: any, index: any) {
  return item + index;
}
const Row = React.memo(({ item, onPress, renderSubItem, index }: any) => {
  return renderSubItem(item, index, onPress);
});

const renderItem = ({
  item,
  index,
  favorites,
  setFavorite,
  renderSubItem,
}: any) => {
  function onPressItem() {
    setFavorite((favoriteItems: any) => {
      const isFavorite = favoriteItems.includes(item);

      if (isFavorite) {
        return favoriteItems.filter((title: any) => title !== item);
      }
      return [item];
    });
  }
  return (
    <Row
      item={item}
      isFavorite={favorites.includes(item)}
      onPress={onPressItem}
      renderSubItem={renderSubItem}
      index={index}
    />
  );
};

const renderItemMultiSelect = ({
  item,
  index,
  favorites,
  setFavorite,
  renderSubItem,
}: any) => {
  function onPressItem() {
    console.log('item', item);
    setFavorite((favoriteItems: any) => {
      const isFavorite = favoriteItems.includes(item);

      if (isFavorite) {
        return favoriteItems.filter((title: any) => title !== item);
      }
      if (item.id == 0) {
        return [item];
      }
      if (item.id !== 0) {
        return [item, ...favoriteItems.filter((e: any) => e.id !== 0)];
      }
    });
  }
  return (
    <Row
      item={item}
      isFavorite={favorites.includes(item)}
      onPress={onPressItem}
      renderSubItem={renderSubItem}
      index={index}
    />
  );
};
const isCloseToBottom = ({
  layoutMeasurement,
  contentOffset,
  contentSize,
}: any) => {
  const paddingToBottom = 20;
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};
export const ListFullOption = forwardRef(
  (
    {
      data,
      renderSubItem,
      style,
      horizontal,
      showsHorizontalScrollIndicator,
      showsVerticalScrollIndicator,
      ListHeaderComponent,
      onRefreshEvent,
      scrollEnabled,
      ListEmptyComponent,
      isMultiSelect,
      loadMore,
      onLoadMore,
      listFooterComponent,
      onScroll,
      noLoading,
      noRefresh,
      contentStyle,
    }: ListProps,
    ref,
  ) => {
    const [favorites, setFavorite] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [isLoadMore, setIsLoadMore] = useState(false);
    const flatList: any = useRef(null);

    useImperativeHandle(ref, () => ({
      scrollToEnd,
    }));

    const onRefresh = useCallback(async () => {
      setRefreshing(true);
      if (noLoading) {
        setTimeout(() => setRefreshing(false), 100);
        onRefreshEvent && (await onRefreshEvent());
      } else {
        try {
          onRefreshEvent && (await onRefreshEvent());
        } catch (error) {
          setRefreshing(false);
        } finally {
          setRefreshing(false);
        }
      }
    }, [noLoading, onRefreshEvent]);

    const renderItemCall = useCallback(
      ({ item, index }) => {
        if (isMultiSelect) {
          return renderItemMultiSelect({
            item,
            index,
            favorites,
            setFavorite,
            renderSubItem,
          });
        }
        return renderItem({
          item,
          index,
          favorites,
          setFavorite,
          renderSubItem,
        });
      },

      [isMultiSelect, favorites, renderSubItem],
    );
    const renderLoading = () => <ActivityIndicator />;
    const onMomentumScrollEnd = useCallback(
      async ({ nativeEvent }) => {
        if (!loadMore) return;
        if (isCloseToBottom(nativeEvent)) {
          console.log('reach to end list');
          setIsLoadMore(true);
          onLoadMore && (await onLoadMore());
          setTimeout(() => {
            setIsLoadMore(false);
          }, 0);
        }
      },
      [loadMore, onLoadMore],
    );

    const renderListFooterComponent = useCallback(
      () => <View>{listFooterComponent || null}</View>,
      [listFooterComponent],
    );

    const onContentSizeChange = useCallback(() => {
      if (isLoadMore) {
        flatList?.current.scrollToEnd({ animated: true });
      }
    }, [isLoadMore]);

    const scrollToEnd = () => {
      flatList?.current.scrollToEnd({ animated: true });
    };

    return (
      <FlatList
        ListHeaderComponent={ListHeaderComponent}
        showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
        showsVerticalScrollIndicator={showsVerticalScrollIndicator}
        horizontal={horizontal}
        refreshControl={
          !noRefresh && (
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          )
        }
        scrollEventThrottle={16}
        onScroll={onScroll}
        ref={flatList}
        onMomentumScrollEnd={onMomentumScrollEnd}
        extraData={favorites}
        ListFooterComponent={renderListFooterComponent}
        nestedScrollEnabled
        onContentSizeChange={onContentSizeChange}
        contentContainerStyle={style}
        style={contentStyle}
        data={data} // data is a constant values in the File scope.
        renderItem={refreshing ? renderLoading : renderItemCall}
        keyExtractor={keyExtractor}
        scrollEnabled={scrollEnabled}
        ListEmptyComponent={ListEmptyComponent}
        decelerationRate="fast"
        snapToEnd={false}
      />
    );
  },
);
