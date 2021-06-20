import React, { useCallback, useMemo } from 'react';
import { Animated, Easing, View } from 'react-native';
import { Observer, useLocalStore } from 'mobx-react-lite';
import { Text, Touchable } from '@/components';
import { useValue } from '@/hooks';
import { AlertDialogContext } from './context';
import { useStyleAlertDialog } from './styles';
import {
  AlertDialogContextValue,
  AlertDialogData,
  AlertDialogProviderProps,
  ButtonData,
} from './types';

export const AlertDialogProvider = ({ children }: AlertDialogProviderProps) => {
  const styles = useStyleAlertDialog();
  const store = useLocalStore(() => ({
    isVisible: false,
    data: {} as AlertDialogData,
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

  const handleShowDialog = useCallback(
    (data: AlertDialogData) => {
      store.isVisible = true;
      store.data = data;
      handleAnimation(1);
    },
    [handleAnimation, store],
  );

  const handleCloseDialog = useCallback(() => {
    handleAnimation(0, () => {
      store.isVisible = false;
      store.data = {} as AlertDialogData;
    });
  }, [handleAnimation, store]);

  const contextValue = useMemo<AlertDialogContextValue>(
    () => ({
      close: handleCloseDialog,
      show: handleShowDialog,
    }),
    [handleCloseDialog, handleShowDialog],
  );

  const renderButton = useCallback(
    ({ onPress: press, text }: ButtonData, index: number) => {
      let onPress = handleCloseDialog;
      if (store.data.buttons?.length! > 1) {
        onPress = press;
      }

      return (
        <Touchable style={styles.btn} key={index.toString(16)} {...{ onPress }}>
          <Text style={!index ? styles.btnTextOK : styles.btnTextCancel}>
            {text}
          </Text>
        </Touchable>
      );
    },
    [
      handleCloseDialog,
      store.data.buttons?.length,
      styles.btn,
      styles.btnTextCancel,
      styles.btnTextOK,
    ],
  );

  return (
    <>
      <AlertDialogContext.Provider value={contextValue}>
        {children}
      </AlertDialogContext.Provider>
      <Observer>
        {() => {
          const {
            isVisible,
            data: {
              supportText,
              buttons = [{ text: 'OK', onPress: handleCloseDialog }],
              subSupportText,
              title,
            },
          } = store;
          if (!isVisible) {
            return <></>;
          }
          return (
            <>
              <Touchable style={styles.touchScrim} onPress={handleCloseDialog}>
                <></>
              </Touchable>
              <Animated.View pointerEvents="box-none" style={[styles.scrim]}>
                <View style={styles.container}>
                  {!!title && (
                    <Text fontType="BOLD_SF" style={styles.title}>
                      {title}
                    </Text>
                  )}
                  <Text style={styles.supportText}>{supportText}</Text>
                  {!!subSupportText && (
                    <Text style={styles.subSupportText}>{subSupportText}</Text>
                  )}
                  {
                    <View style={styles.buttons}>
                      {buttons?.map(renderButton)}
                    </View>
                  }
                </View>
              </Animated.View>
            </>
          );
        }}
      </Observer>
    </>
  );
};

AlertDialogContext.displayName = 'AlertDialogProvider';
const DURATION_ANIMATION = 250;
