import React from 'react';
import { useIntl } from 'react-intl';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { icGoogle } from '@/assets';
import { useTheme } from '@/theme';
import { Button } from '../elements';
import { BUTTON_STYLES } from '../elements/button/constants';
import styles from './google.styles';
// uncomment and provide webClientId
GoogleSignin.configure({
  webClientId:
    '981846771949-4i0k8lh0mpjfna5qok9j8pmrfsn0l4u0.apps.googleusercontent.com',
});

function GoogleButton(props) {
  const { formatMessage } = useIntl();
  const onPress = async () => {
    try {
      await GoogleSignin.hasPlayServices();

      const userInfo = await GoogleSignin.signIn();
      const token = await GoogleSignin.getTokens();
      console.log('userInfo', userInfo);
      console.log('token', token);
      const data = {
        user: {
          name: userInfo.user.name,
          type: 'google',
          idToken: userInfo.idToken,
          email: userInfo.user.email,
          token: token.accessToken,
          picture: userInfo.user.photo,
        },
      };
      console.log('before dispatch', data);
      //dispatch(googleLoginRequest(data));
      console.log('After dispatch', data);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('SIGN_IN_CANCELLED', error.code);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('IN_PROGRESS', error.code);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('PLAY_SERVICES_NOT_AVAILABLE', error.code);
      } else {
        console.log(error.code);
      }
    }
  };

  return (
    <Button
      {...{ onPress }}
      style={styles.button}
      buttonStyle={BUTTON_STYLES.WHITE}
      icon={icGoogle}
      label={formatMessage({ id: 'login.google' })}
    />
  );
}

export default GoogleButton;
