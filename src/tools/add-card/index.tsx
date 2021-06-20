import React, { useCallback, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { Alert, Animated, Easing, Keyboard, View } from 'react-native';
import Modal from 'react-native-modal';
import { observer } from 'mobx-react';
import { Observer, useLocalStore } from 'mobx-react-lite';
import { useAppStore, useValue } from '@/hooks';
import { TransactionParam } from '@/models/types';
import { AddCardContext } from './context';
import { useStyleAddCard } from './styles';
import TopUp from './top-up';
import TransactionList from './transaction-list';
import { AddCardContextValue, AddCardProviderProps } from './types';

export const AddCardProvider = observer(
  ({ children }: AddCardProviderProps) => {
    const styles = useStyleAddCard();
    const { formatMessage, formatNumber } = useIntl();

    const [amount, setAmount] = useState('');
    const { payment } = useAppStore();
    const [amountText, setAmountText] = useState('');
    const [pageSize, setPageSize] = useState(10);
    const [isRefresh, setIsRefresh] = useState(true);

    const getTopUpHistory = useCallback(() => {
      if (isRefresh) {
        console.log('====================================');
        console.log('123');
        console.log('====================================');
        const body: TransactionParam = {
          page: 1,
          page_size: pageSize,
          type: 'TOPUP',
        };
        payment.getAllTransaction(body);
        setIsRefresh(false);
      }
    }, [isRefresh, pageSize, payment]);

    const store = useLocalStore<{
      isVisible: boolean;
      isShowAll: boolean;
      action: () => void;
    }>(() => ({
      isVisible: false,
      isShowAll: false,
      action: () => {},
    }));

    const animation = useValue(new Animated.Value(0));

    const handleAnimation = useCallback(
      (toValue: number, callback = () => {}) => {
        Animated.timing(animation, {
          toValue,
          duration: DURATION_ANIMATION,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }).start(callback);
      },
      [animation],
    );

    const handleShowDialog = useCallback(() => {
      store.isVisible = true;
      store.isShowAll = false;
      handleAnimation(1);
    }, [handleAnimation, store]);

    const handleCloseDialog = useCallback(() => {
      handleAnimation(0, () => {
        store.isVisible = false;
        store.isShowAll = false;
      });
    }, [handleAnimation, store]);

    const handleShowAll = useCallback(() => {
      store.isShowAll = true;
    }, [store]);

    const handleShowLess = useCallback(() => {
      store.isShowAll = false;
    }, [store]);

    const openModal = useCallback(
      (action) => {
        store.isVisible = true;
        store.action = action;
        getTopUpHistory();
      },
      [getTopUpHistory, store],
    );

    const contextValue = useMemo<AddCardContextValue>(
      () => ({
        close: handleCloseDialog,
        show: handleShowDialog,
        open: openModal,
      }),
      [handleCloseDialog, handleShowDialog, openModal],
    );

    const onAddPress = useCallback(() => {
      const amountNum = +amount.replace(/\./g, '');
      if (amount === '' || amount?.length === 0) {
        Alert.alert(formatMessage({ id: 'app.noAmount' }));
        return;
      }
      if (amountNum < 50) {
        Alert.alert(formatMessage({ id: 'app.top_up_minium' }));
        return;
      }
      store.isVisible = false;
      payment.setAmount(amountNum);
      setAmountText('');
      Keyboard.dismiss();
      store.action();
    }, [amount, formatMessage, payment, store]);

    const onChangeText = useCallback(
      (text: string) => {
        if (!isNaN(+text.replace(/\./g, ''))) {
          setAmount(text);
          setAmountText(formatNumber(+text.replace(/\./g, '')));
        }
      },
      [formatNumber],
    );

    const onLoadMore = useCallback(() => {
      setIsRefresh(true);
      setPageSize(pageSize + 10);
      getTopUpHistory();
    }, [getTopUpHistory, pageSize]);

    const onRefreshEvent = useCallback(() => {
      setIsRefresh(true);
      setPageSize(10);
      getTopUpHistory();
    }, [getTopUpHistory]);

    const isLoadMore = useMemo(() => {
      if (
        payment?.listTopUpTransaction?.count &&
        payment?.listTopUpTransaction?.total
      )
        return (
          payment?.listTopUpTransaction?.count <
          payment?.listTopUpTransaction?.total
        );
      else return false;
    }, [
      payment?.listTopUpTransaction?.count,
      payment?.listTopUpTransaction?.total,
    ]);
    return (
      <>
        <AddCardContext.Provider value={contextValue}>
          {children}
        </AddCardContext.Provider>
        <Observer>
          {() => {
            const { isVisible, isShowAll } = store;
            if (!isVisible) {
              return <></>;
            }
            return (
              <Modal
                backdropOpacity={0.5}
                isVisible
                style={styles.container}
                onBackdropPress={handleCloseDialog}>
                <View style={styles.bodyModal}>
                  {isShowAll ? (
                    <TransactionList
                      topUpHistory={payment.listTopUpTransaction?.data}
                      {...{
                        onLoadMore,
                        onRefreshEvent,
                        isLoadMore,
                        handleShowLess,
                        handleCloseDialog,
                      }}
                    />
                  ) : (
                    <TopUp
                      {...{
                        handleCloseDialog,
                        amountText,
                        onChangeText,
                        onAddPress,
                        handleShowAll,
                      }}
                      listTransaction={payment.listTopUpTransaction}
                    />
                  )}
                </View>
              </Modal>
            );
          }}
        </Observer>
      </>
    );
  },
);

AddCardContext.displayName = 'AddCardProvider';
const DURATION_ANIMATION = 250;
