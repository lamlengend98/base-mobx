import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  AppointmentDetailsScreen,
  AppointmentListScreen,
  DoctorProfileScreen,
  DoctorsScreen,
  HomeScreen,
  NewsScreen,
  PreConsultationScreen,
  SearchScreen,
  SymptomScreen,
} from '@/screens';
import { ScreenOptions } from './common';
import { ROUTES } from './routes';

const Stack = createStackNavigator();

export const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={ScreenOptions}
        name={ROUTES.HOME}
        component={HomeScreen}
      />
      <Stack.Screen
        options={ScreenOptions}
        name={ROUTES.SEARCH}
        component={SearchScreen}
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
        name={ROUTES.DOCTOR_PROFILE}
        component={DoctorProfileScreen}
      />
      <Stack.Screen
        options={ScreenOptions}
        name={ROUTES.DOCTORS}
        component={DoctorsScreen}
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
        name={ROUTES.NEWS}
        component={NewsScreen}
      />
    </Stack.Navigator>
  );
};
