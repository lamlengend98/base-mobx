import React, { useMemo } from 'react';
import { StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { useAppStore } from '@/hooks';
import {
  AddCreditCardScreen,
  ChattingScreen,
  LoginPhoneScreen,
  LoginScreen,
  NotificationScreen,
  OtpScreen,
  PersonalDetailsScreen,
  SplashScreen,
  WelcomeScreen,
} from '@/screens';
import { COLORS } from '@/theme';
import { BottomTabStack } from './bottom-tabs-stack';
import { ScreenOptions } from './common';
import { ROUTES } from './routes';

const Stack = createStackNavigator();

export const RootStack = observer(() => {
  const { auth, appState } = useAppStore();
  console.log('====================================');
  console.log('toJS(auth?.infoDetail)', toJS(auth?.infoDetail));
  console.log('auth.data.RootStack', toJS(auth.data));
  console.log('====================================');
  const infoDetail = auth?.infoDetail?.data || auth.data;
  const hasInfo = useMemo(() => {
    if (infoDetail) {
      if (
        !infoDetail?.name ||
        infoDetail?.name?.trim() === '' ||
        !infoDetail?.email ||
        infoDetail?.email?.trim() === ''
      ) {
        return true;
      }
    }
    if (!infoDetail && !infoDetail) {
      return true;
    }
    return false;
  }, [infoDetail]);

  console.log('====================================');
  console.log('hasInfo', hasInfo);
  console.log('====================================');

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.WHITE} />
      <Stack.Navigator>
        {!auth?.infoLogged ? (
          <>
            <Stack.Screen
              options={ScreenOptions}
              name={ROUTES.SPLASH}
              component={SplashScreen}
            />
            <Stack.Screen
              options={ScreenOptions}
              name={ROUTES.LOGIN}
              component={LoginScreen}
            />
            <Stack.Screen
              options={ScreenOptions}
              name={ROUTES.LOGIN_PHONE}
              component={LoginPhoneScreen}
            />
            <Stack.Screen
              options={ScreenOptions}
              name={ROUTES.OTP}
              component={OtpScreen}
            />
            <Stack.Screen
              options={ScreenOptions}
              name={ROUTES.WELCOME}
              component={WelcomeScreen}
            />
          </>
        ) : (
          <>
            {hasInfo && (
              <Stack.Screen
                options={ScreenOptions}
                name={ROUTES.PERSONAL_DETAILS}
                component={PersonalDetailsScreen}
              />
            )}
            {appState.isShowSplash && (
              <Stack.Screen
                options={ScreenOptions}
                name={ROUTES.SPLASH}
                component={SplashScreen}
              />
            )}
            <Stack.Screen
              options={ScreenOptions}
              name={ROUTES.BOTTOM_TABS}
              component={BottomTabStack}
            />
            <Stack.Screen
              options={ScreenOptions}
              name={ROUTES.NOTIFICATION}
              component={NotificationScreen}
            />
            <Stack.Screen
              options={{
                headerShown: false,
                gestureEnabled: false,
              }}
              name={ROUTES.CHATTING}
              component={ChattingScreen}
            />
            <Stack.Screen
              options={{
                headerShown: false,
                gestureEnabled: false,
              }}
              name={ROUTES.ADD_CREDIT_CARD}
              component={AddCreditCardScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </>
  );
});
