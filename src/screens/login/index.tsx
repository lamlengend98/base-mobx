import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Button, Text } from '@/components';
import { BUTTON_STYLES } from '@/components/elements/button/constants';
import GoogleButton from '@/components/google-button';
import { NavigationService } from '@/services';
import { ROUTES } from '@/stack';
import icFacebook from '../../assets/image/facebook.png';
import icLogo from '../../assets/image/logo.png';
import { useStyleLogin } from './styles';

export const LoginScreen = () => {
  const styles = useStyleLogin();
  const { formatMessage } = useIntl();

  const navigateLoginByPhone = useCallback(() => {
    NavigationService.navigate(ROUTES.LOGIN_PHONE, {});
  }, []);

  return (
    <View style={styles.container}>
      <FastImage source={icLogo} style={styles.logo} resizeMode={'contain'} />
      <View style={styles.buttonGroup}>
        <Button
          style={styles.button}
          buttonStyle={BUTTON_STYLES.BLUE}
          label={formatMessage({ id: 'login.mobile' })}
          onPress={navigateLoginByPhone}
        />

        {/* <View style={styles.indicatorContainer}>
          <View style={styles.indicator} />
          <Text fontType="REGULAR_RB" style={styles.textOr}>
            {formatMessage({ id: 'login.or' })}
          </Text>
          <View style={styles.indicator} />
        </View> */}

        {/* <GoogleButton />

        <Button
          style={styles.button}
          buttonStyle={BUTTON_STYLES.DARK_BLUE}
          icon={icFacebook}
          label={formatMessage({ id: 'login.facebook' })}
        /> */}
      </View>
    </View>
  );
};
