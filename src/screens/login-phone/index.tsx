import React, { useCallback, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-tiny-toast';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import { isEmpty } from 'lodash';
import { observer } from 'mobx-react';
import { Button, Text, TextField } from '@/components';
import { BUTTON_STYLES } from '@/components/elements/button/constants';
import { useAppStore } from '@/hooks';
import { ROUTES } from '@/stack';
import { useTheme } from '@/theme';
import { showErrorToast } from '@/tools';
import icLogo from '../../assets/image/logo.png';
import AreaCodes from './AreaCodes';
import { useStyleLoginPhone } from './styles';

export const LoginPhoneScreen = observer(() => {
  const styles = useStyleLoginPhone();
  const { formatMessage } = useIntl();
  const navigation = useNavigation();
  const { auth } = useAppStore();
  const { colors } = useTheme();
  const [showAreacode, setShowAreacode] = useState(false);

  useEffect(() => {
    auth.getAreaCodes();
  }, [auth]);

  const onSubmit = useCallback(
    async (values) => {
      if (isEmpty(values.phoneNumber)) {
        showErrorToast(
          formatMessage({ id: 'error.phone.empty' }),
          Toast.position.TOP,
        );
      } else {
        auth.initialValues = values;
        const info = await auth.loginPhone();
        if (!info) {
          showErrorToast(
            formatMessage({ id: 'error.phone.invalid' }),
            Toast.position.TOP,
          );
        } else {
          navigation.navigate(ROUTES.OTP, values);
        }
      }
    },
    [auth, formatMessage, navigation],
  );
  const onPressPhoneCode = useCallback(() => {
    setShowAreacode(!showAreacode);
  }, [showAreacode]);

  const { initialValues, isLoading } = auth;
  return (
    <KeyboardAwareScrollView
      scrollEnabled={false}
      keyboardShouldPersistTaps="handled">
      <Formik {...{ initialValues, onSubmit }}>
        {({ values, handleChange, submitForm }) => (
          <View style={styles.container}>
            <FastImage
              source={icLogo}
              style={styles.logo}
              resizeMode={'contain'}
            />
            <View style={styles.buttonGroup}>
              <View style={styles.inputContainer}>
                <Text onPress={onPressPhoneCode} fontType="BOLD_RB">
                  +{values.phoneCode}
                </Text>
                <View style={styles.indicator} />
                <TextField
                  keyboardType={'phone-pad'}
                  maxLength={13}
                  style={styles.input}
                  placeholder={formatMessage({ id: 'otp.phone' })}
                  placeholderTextColor={colors.darkGray}
                  onChangeText={handleChange('phoneNumber')}
                />
              </View>
              <Button
                style={styles.button}
                buttonStyle={BUTTON_STYLES.BLUE}
                label={formatMessage({ id: 'otp.send' })}
                indicatorColor="white"
                onPress={submitForm}
                {...{ isLoading }}
              />
              {showAreacode && (
                <AreaCodes
                  onChangeAreacode={handleChange('phoneCode')}
                  onChangeAreacodeId={handleChange('areCodeId')}
                  {...{ onPressPhoneCode }}
                />
              )}
            </View>
          </View>
        )}
      </Formik>
    </KeyboardAwareScrollView>
  );
});
