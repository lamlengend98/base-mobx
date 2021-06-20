import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  ActiveMemberCodeScreen,
  AppointmentDetailsScreen,
  AppointmentListScreen,
  InvoicesDetail,
  InvoicesScreen,
  Legal,
  MedicalHistoryScreen,
  MyProfileScreen,
  PaymentScreen,
  PersonalProfileScreen,
  WalletScreen,
} from '@/screens';
import { CreditCardScreen } from '@/screens/credit-card';
import { ScreenOptions } from './common';
import { ROUTES } from './routes';

const Stack = createStackNavigator();

export const MyProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={ScreenOptions}
        name={ROUTES.SETTINGS}
        component={MyProfileScreen}
      />
      <Stack.Screen
        options={ScreenOptions}
        name={ROUTES.APPOINTMENT_DETAILS}
        component={AppointmentDetailsScreen}
      />
      <Stack.Screen
        options={ScreenOptions}
        name={ROUTES.APPOINTMENT_LIST}
        component={AppointmentListScreen}
      />
      <Stack.Screen
        options={ScreenOptions}
        name={ROUTES.MY_PROFILE}
        component={MyProfileScreen}
      />
      <Stack.Screen
        options={ScreenOptions}
        name={ROUTES.ACTIVE_MEMBER_CODE}
        component={ActiveMemberCodeScreen}
      />
      <Stack.Screen
        options={ScreenOptions}
        name={ROUTES.PERSONAL_PROFILE}
        component={PersonalProfileScreen}
      />
      <Stack.Screen
        options={ScreenOptions}
        name={ROUTES.MEDICAL_HISTORY}
        component={MedicalHistoryScreen}
      />
      <Stack.Screen
        options={ScreenOptions}
        name={ROUTES.PAYMENT}
        component={PaymentScreen}
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
      <Stack.Screen
        options={ScreenOptions}
        name={ROUTES.LEGAL}
        component={Legal}
      />
      <Stack.Screen
        options={ScreenOptions}
        name={ROUTES.INVOICES}
        component={InvoicesScreen}
      />
      <Stack.Screen
        options={ScreenOptions}
        name={ROUTES.INVOICES_DETAIL}
        component={InvoicesDetail}
      />
    </Stack.Navigator>
  );
};
