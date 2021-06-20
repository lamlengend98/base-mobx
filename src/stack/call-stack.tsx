import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  CallDoctorScreen,
  CallListScreen,
  PostConsultationScreen,
  PreConsultationScreen,
  SymptomScreen,
} from '@/screens';
import { ScreenOptions } from './common';
import { ROUTES } from './routes';

const Stack = createStackNavigator();

export const CallStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={ScreenOptions}
        name={ROUTES.CALL_LIST}
        component={CallListScreen}
      />
      {/* <Stack.Screen
        options={ScreenOptions}
        name={ROUTES.POST_CONSULTATION}
        component={PostConsultationScreen}
      /> */}
      <Stack.Screen
        options={ScreenOptions}
        name={ROUTES.PRE_CONSULTATION}
        component={PreConsultationScreen}
      />
      <Stack.Screen
        options={ScreenOptions}
        name={ROUTES.SYMPTOM}
        component={SymptomScreen}
      />
      <Stack.Screen
        options={ScreenOptions}
        name={ROUTES.CALL_DOCTOR}
        component={CallDoctorScreen}
      />
    </Stack.Navigator>
  );
};
