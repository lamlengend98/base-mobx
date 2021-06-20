import { RouteProp } from '@react-navigation/native';
import { ROUTES } from '@/stack';
import { Date } from '@/types/date';
import { DoctorProfile } from '@/types/doctor-profile';
import { StackNavigation } from '@/types/navigation';
import { Time } from '@/types/time';

export type DoctorProfileDetail = DoctorProfile & {
  category: string;
  exp: string;
  phone: string;
  opening: string;
  openingDays: Time[];
  nextAvailableDays: Date[];
  availableHours: Time[];
};

type AppointmentDetailParamList = {
  [ROUTES.APPOINTMENT_DETAILS]: {
    date: Date;
    time: Time;
    doctor: DoctorProfileDetail;
  };
};

type NavigationParam = {
  [ROUTES.APPOINTMENT_LIST]: {};
};

export type AppointmentDetailPropsScreen = {
  route: RouteProp<
    AppointmentDetailParamList,
    typeof ROUTES.APPOINTMENT_DETAILS
  >;
  navigation: StackNavigation<NavigationParam, typeof ROUTES.APPOINTMENT_LIST>;
};
