import React, { useCallback, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { Animated, Easing, View } from 'react-native';
import { observer } from 'mobx-react';
import { Observer, useLocalStore } from 'mobx-react-lite';
import { Icon65doctor } from '@/assets';
import { Button, Text, TextField, Touchable } from '@/components';
import { useAppStore, useValue } from '@/hooks';
import { NavigationService } from '@/services';
import { ROUTES } from '@/stack';
import { useTheme } from '@/theme';
import { alertMessage } from '@/utils/alert.helper';
import { MemberCodeContext } from './context';
import { useStyleMemberCode } from './styles';
import { MemberCodeContextValue, MemberCodeProviderProps } from './types';

export const MemberCodeProvider = observer(
  ({ children }: MemberCodeProviderProps) => {
    const styles = useStyleMemberCode();
    const store = useLocalStore(() => ({
      isVisible: false,
      data: false,
    }));
    const { colors } = useTheme();

    const { clinic, auth } = useAppStore();

    const [inviteCode, setInviteCode] = useState('');

    const { formatMessage } = useIntl();

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
      (signed?: boolean) => {
        store.isVisible = true;
        store.data = signed || false;
        handleAnimation(1);
      },
      [handleAnimation, store],
    );

    const handleCloseDialog = useCallback(() => {
      handleAnimation(0, () => {
        store.isVisible = false;
        store.data = false;
        setInviteCode('');
      });
    }, [handleAnimation, store]);

    const contextValue = useMemo<MemberCodeContextValue>(
      () => ({
        close: handleCloseDialog,
        show: handleShowDialog,
      }),
      [handleCloseDialog, handleShowDialog],
    );

    const onAddPaymentMethod = useCallback(async () => {
      if (inviteCode?.trim().length === 0) {
        alertMessage(formatMessage({ id: 'app.code.empty' }), () => {});
        return;
      }
      const data = {
        user_id: auth.data.id,
        invite_code: inviteCode,
      };
      const res = await clinic.confirmInviteCode(data);
      if (store.data) {
        if (!res) {
          alertMessage(formatMessage({ id: 'app.code.error' }), () => {});
        } else {
          handleCloseDialog();
          clinic.getAllClinics(auth.data?.id);
        }
      } else {
        if (clinic.isAuthInvite) {
          handleCloseDialog();
          NavigationService.navigate(ROUTES.CLINIC, { user_id: auth.data.id });
        } else {
          alertMessage(formatMessage({ id: 'app.code.error' }), () => {});
        }
      }
    }, [
      auth.data.id,
      clinic,
      formatMessage,
      handleCloseDialog,
      inviteCode,
      store.data,
    ]);

    const onChangeText = useCallback((value) => {
      setInviteCode(value);
    }, []);

    return (
      <>
        <MemberCodeContext.Provider value={contextValue}>
          {children}
        </MemberCodeContext.Provider>
        <Observer>
          {() => {
            const {
              isVisible,
              data: {},
            } = store;
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
                    <View style={styles.body}>
                      <Icon65doctor
                        name={Icon65doctor.icons.USER_CIRCLE}
                        style={styles.userCircle}
                      />
                      <Text style={styles.title}>
                        {formatMessage({ id: 'confirm.payment.number' })}
                      </Text>
                      <TextField
                        numberOfLines={1}
                        inputStyle={styles.memberCode}
                        style={styles.inputNumber}
                        placeholder={formatMessage({
                          id: 'confirm.member.code',
                        })}
                        onChangeText={onChangeText}
                        placeholderTextColor={colors.darkGray}
                        value={inviteCode}
                      />
                      <Button
                        onPress={onAddPaymentMethod}
                        buttonStyle="BLUE"
                        label={formatMessage({
                          id: 'app.add',
                        })}
                      />
                    </View>
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

MemberCodeContext.displayName = 'MemberCodeProvider';
const DURATION_ANIMATION = 500;
