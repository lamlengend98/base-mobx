/* eslint-disable import/order */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  CallDoctorScreen,
  ClinicDoctorsScreen,
  ClinicScreen,
  CreditCardScreen,
  PostConsultationScreen,
  PreConsultationScreen,
  SymptomScreen,
  WalletScreen,
} from '@/screens';
import { ScreenOptions } from './common';
import { ROUTES } from './routes';

const Stack = createStackNavigator();

export const ClinicStack = ({ route }) => {
  const { user_id } = route.params;
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={ScreenOptions}
        name={ROUTES.CLINIC}
        component={ClinicScreen}
        initialParams={{
          user_id,
        }}
      />
      <Stack.Screen
        options={ScreenOptions}
        name={ROUTES.CLINIC_DOCTORS}
        component={ClinicDoctorsScreen}
      />
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
      <Stack.Screen
        options={ScreenOptions}
        name={ROUTES.WALLET}
        component={WalletScreen}
      />
      <Stack.Screen
        options={ScreenOptions}
        name={ROUTES.CREDIT_CARD}
        component={CreditCardScreen}
      />
      {/* <Stack.Screen
        options={ScreenOptions}
        name={ROUTES.POST_CONSULTATION}
        component={PostConsultationScreen}
      /> */}
    </Stack.Navigator>
  );
};
