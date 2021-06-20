import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { Keyboard, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-tiny-toast';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import { isEmpty } from 'lodash';
import { observer } from 'mobx-react';
import { Button, Text, Touchable } from '@/components';
import { BUTTON_STYLES } from '@/components/elements/button/constants';
import { useAppStore } from '@/hooks';
import { ROUTES } from '@/stack';
import { showErrorToast, showInfoToast } from '@/tools';
import { alertMessage } from '@/utils/alert.helper';
import icLogo from '../../assets/image/logo.png';
import { OTP } from './component';
import { useStyleOtp } from './styles';

export const OtpScreen = observer(() => {
  const styles = useStyleOtp();
  const { formatMessage } = useIntl();
  const { auth, appState } = useAppStore();
  const navigation = useNavigation();

  const onSubmit = useCallback(
    (values) => {
      console.log('====================================');
      console.log('values', values);
      console.log('====================================');
      if (isEmpty(values.otp)) {
        showErrorToast(
          formatMessage({ id: 'error.otp.empty' }),
          Toast.position.TOP,
        );
      } else {
        appState.isShowLoading = true;
        auth
          .verifyOTP(values.otp)
          .then((info) => {
            console.log('====================================');
            console.log('info', info);
            console.log('====================================');
            if (info?.access_token) {
              navigation.navigate(ROUTES.WELCOME, { info });
            } else {
              alertMessage(
                formatMessage({ id: 'error.areaCode.invalid' }),
                () => {
                  navigation.goBack();
                },
              );
            }
          })
          .catch(() => {
            Keyboard.dismiss();
            alertMessage(formatMessage({ id: 'error.otp.invalid' }), () => {});
          })
          .finally(() => {
            appState.isShowLoading = false;
          });
      }
    },
    [appState, auth, formatMessage, navigation],
  );

  const resendOTP = useCallback(() => {
    auth
      .resendOTP()
      .then(() => {
        showInfoToast(formatMessage({ id: 'otp.resend' }), Toast.position.TOP);
      })
      .catch(() => {
        showErrorToast(
          formatMessage({ id: 'msg.otp.did_resend' }),
          Toast.position.TOP,
        );
      });
  }, [auth, formatMessage]);

  return (
    <KeyboardAwareScrollView
      scrollEnabled={false}
      keyboardShouldPersistTaps="handled">
      <Formik initialValues={{ otp: '' }} {...{ onSubmit }}>
        {({ submitForm, handleChange, values }) => (
          <View style={styles.container}>
            <FastImage
              source={icLogo}
              style={styles.logo}
              resizeMode={'contain'}
            />
            <View style={styles.buttonGroup}>
              <View style={styles.inputContainer}>
                <OTP code={values.otp} setCode={handleChange('otp')} />
              </View>

              <Button
                style={styles.button}
                buttonStyle={BUTTON_STYLES.BLUE}
                label={formatMessage({ id: 'otp.verify' })}
                onPress={submitForm}
              />

              <View style={styles.resendContainer}>
                <Text fontType="REGULAR_RB">
                  {formatMessage({ id: 'otp.dont_receive' })}
                </Text>
                <Touchable onPress={resendOTP}>
                  <Text fontType="REGULAR_RB" style={styles.resend}>
                    {formatMessage({ id: 'otp.resend' })}
                  </Text>
                </Touchable>
              </View>
            </View>
          </View>
        )}
      </Formik>
    </KeyboardAwareScrollView>
  );
});
