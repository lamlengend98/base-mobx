import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ChatList } from '@/screens';
import { ScreenOptions } from './common';
import { ROUTES } from './routes';

const Stack = createStackNavigator();

export const ChatStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={ScreenOptions}
        name={ROUTES.CHAT_LIST}
        component={ChatList}
      />
    </Stack.Navigator>
  );
};
