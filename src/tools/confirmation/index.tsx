import React, { useCallback, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { Animated, Easing, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { Observer, useLocalStore } from 'mobx-react-lite';
import { DownloadDone, Error } from '@/assets';
import { Button, Text, Touchable } from '@/components';
import { useValue } from '@/hooks';
import { ConfirmationContext } from './context';
import { useStyleConfirmation } from './styles';
import {
  ConfirmationContextValue,
  ConfirmationData,
  ConfirmationProviderProps,
  TypeDialog,
} from './types';

export const ConfirmationProvider = observer(
  ({ children }: ConfirmationProviderProps) => {
    const styles = useStyleConfirmation();
    const store = useLocalStore(() => ({
      isVisible: false,
      data: {} as ConfirmationData,
    }));
    const [typeDialog, setTypeDialog] = useState<TypeDialog>(
      TypeDialog.CONFIRM,
    );

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

    const handleShowDialog = useCallback(
      (data: ConfirmationData = {} as ConfirmationData) => {
        store.isVisible = true;
        store.data = data;
        handleAnimation(1);
      },
      [handleAnimation, store],
    );

    const handleShowDialogConfirm = useCallback(
      (data: ConfirmationData = {} as ConfirmationData) => {
        setTypeDialog(TypeDialog.CONFIRM);
        handleShowDialog(data);
      },
      [handleShowDialog],
    );

    const handleShowDialogInfo = useCallback(
      (data: ConfirmationData = {} as ConfirmationData) => {
        setTimeout(() => {
          setTypeDialog(TypeDialog.INFO);
          handleShowDialog(data);
        }, 1000);
      },
      [handleShowDialog],
    );

    const handleCloseDialog = useCallback(() => {
      handleAnimation(0, () => {
        store.isVisible = false;
        store.data = {} as ConfirmationData;
      });
    }, [handleAnimation, store]);

    const contextValue = useMemo<ConfirmationContextValue>(
      () => ({
        close: handleCloseDialog,
        show: handleShowDialogConfirm,
        showInfo: handleShowDialogInfo,
      }),
      [handleCloseDialog, handleShowDialogConfirm, handleShowDialogInfo],
    );

    const onAgree = useCallback(async () => {
      try {
        handleCloseDialog();
        toJS(store?.data?.buttons!)[0]?.onPress();
      } catch (error) {}
    }, [handleCloseDialog, store?.data?.buttons]);

    const onBack = useCallback(async () => {
      try {
        handleCloseDialog();
        store?.data?.buttons && store?.data?.buttons[1]?.onPress();
      } catch (error) {}
    }, [handleCloseDialog, store?.data?.buttons]);

    return (
      <>
        <ConfirmationContext.Provider value={contextValue}>
          {children}
        </ConfirmationContext.Provider>
        <Observer>
          {() => {
            const { isVisible, data } = store;
            if (!isVisible) {
              return <></>;
            }
            return (
              <>
                <Touchable
                  style={styles.touchScrim}
                  onPress={handleCloseDialog}>
                  <></>
                </Touchable>
                <Animated.View
                  pointerEvents="box-none"
                  style={[styles.scrim, { opacity: animation }]}>
                  <View style={styles.container}>
                    {typeDialog === TypeDialog.CONFIRM ? (
                      <ConfirmDialog
                        {...{ onAgree, onBack, handleCloseDialog, data }}
                      />
                    ) : (
                      <InfoDialog {...{ onAgree, data }} />
                    )}
                  </View>
                </Animated.View>
              </>
            );
          }}
        </Observer>
      </>
    );
  },
);

const ConfirmDialog = observer(({ onAgree, onBack, data }) => {
  const styles = useStyleConfirmation();
  return (
    <View style={styles.body}>
      <FastImage
        source={DownloadDone}
        resizeMode="cover"
        style={styles.avatar}
      />
      <Text style={styles.title}>{data.supportText}</Text>
      <View style={styles.buttons}>
        <Button
          onPress={onAgree}
          buttonStyle="BLUE"
          label={data?.buttons ? data?.buttons[0]?.text : ''}
          style={styles.button}
        />
        <Button
          onPress={onBack}
          buttonStyle="BLUE"
          label={data?.buttons ? data?.buttons[1]?.text : ''}
          style={styles.button}
        />
      </View>
    </View>
  );
});

const InfoDialog = observer(({ onAgree, data }) => {
  const styles = useStyleConfirmation();
  const { formatMessage } = useIntl();

  return (
    <View style={styles.body}>
      <FastImage source={Error} resizeMode="cover" style={styles.avatar} />
      <Text style={styles.title}>
        {formatMessage({ id: 'permissions.doctor.call' }, { cost: 5 })}
      </Text>
      <View style={styles.buttons}>
        <Button
          onPress={onAgree}
          buttonStyle="BLUE"
          label={data && data?.buttons ? data?.buttons[0]?.text : ''}
          style={styles.button}
        />
      </View>
    </View>
  );
});

ConfirmationContext.displayName = 'ConfirmationProvider';
const DURATION_ANIMATION = 500;
