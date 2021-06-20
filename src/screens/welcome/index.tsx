import React, { useCallback, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { ScrollView, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { observer } from 'mobx-react';
import { Button, Text } from '@/components';
import { BUTTON_STYLES } from '@/components/elements/button/constants';
import { useAppStore } from '@/hooks';
import icLogo from '../../assets/image/logo.png';
import { useStyleWelcome } from './styles';
import { WelcomeTextT } from './types';

export const WelcomeScreen = observer(({ route }) => {
  const styles = useStyleWelcome();
  const { formatMessage } = useIntl();
  const { auth, appState } = useAppStore();
  const info = route.params?.info;
  const [welcome, setWelcome] = useState<WelcomeTextT>();

  function navigateHome() {
    auth.setInfoLogged(info);
    appState.changeIsShowSplash(false);
  }

  const getWelcomeText = useCallback(async () => {
    const result: any = await auth.getWelcomeText(info.access_token);
    setWelcome(result);
  }, [auth, info.access_token]);

  useEffect(() => {
    getWelcomeText();
  }, [getWelcomeText]);

  return (
    <View style={styles.container}>
      <FastImage source={icLogo} style={styles.logo} resizeMode={'contain'} />
      <View style={styles.buttonGroup}>
        <Text fontType="BOLD_RB" style={styles.text}>
          {formatMessage({ id: 'welcome' })}
        </Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text fontType="REGULAR_RB" style={styles.text}>
            {welcome?.value || formatMessage({ id: 'welcome.note' })}
          </Text>
        </ScrollView>
        <Button
          style={styles.button}
          buttonStyle={BUTTON_STYLES.BLUE}
          label={formatMessage({ id: 'welcome.start' }).toUpperCase()}
          onPress={navigateHome}
        />
      </View>
    </View>
  );
});
