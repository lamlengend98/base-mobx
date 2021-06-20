/* eslint-disable import/order */
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { tabBar } from '@/components';
import { PostConsultationScreen } from '@/screens';
import { CallStack, ChatStack, HomeStack, MyProfileStack } from '.';
import { ClinicStack } from './clinic-stack';
import { ScreenOptions } from './common';
import { ROUTES } from './routes';

const Stack = createBottomTabNavigator();

export const BottomTabStack = () => {
  return (
    <Stack.Navigator {...{ tabBar }} tabBarOptions={{ showLabel: false }}>
      <Stack.Screen
        options={ScreenOptions}
        name={ROUTES.HOME}
        component={HomeStack}
      />
      <Stack.Screen
        options={ScreenOptions}
        name={ROUTES.CALL_LIST}
        component={CallStack}
      />
      <Stack.Screen
        options={ScreenOptions}
        name={ROUTES.CLINIC_STACK}
        component={ClinicStack}
      />
      <Stack.Screen
        options={ScreenOptions}
        name={ROUTES.CHAT_LIST}
        component={ChatStack}
      />
      <Stack.Screen
        options={ScreenOptions}
        name={ROUTES.SETTINGS}
        component={MyProfileStack}
      />
      <Stack.Screen
        options={ScreenOptions}
        name={ROUTES.POST_CONSULTATION}
        component={PostConsultationScreen}
      />
    </Stack.Navigator>
  );
};
