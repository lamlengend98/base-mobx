import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';
import { debounce } from 'lodash';
import { useAppStore } from '@/hooks';
import { NavigationService } from '@/services';
import { ROUTES } from '@/stack';
import icLogo from '../../assets/image/logo.png';
import { useStyleSplash } from './styles';

export const SplashScreen = () => {
  const styles = useStyleSplash();
  const navigation = useNavigation();
  const { auth } = useAppStore();

  useEffect(() => {
    if (auth.infoLogged) {
      setTimeout(() => {
        NavigationService.replace(ROUTES.BOTTOM_TABS, {});
      }, 500);
    }
  }, [auth.infoLogged]);

  useEffect(() => {
    debounce(() => {
      if (navigation.dangerouslyGetState().routeNames.includes(ROUTES.LOGIN)) {
        NavigationService.replace(ROUTES.LOGIN, {});
      }
    }, 1e3)?.();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <FastImage source={icLogo} style={styles.logo} resizeMode={'contain'} />
      <ActivityIndicator
        style={styles.indicator}
        color={styles.indicatorColor.color}
      />
    </View>
  );
};
