import { RouteProp } from '@react-navigation/native';
import { ROUTES } from '@/stack';
import { Date } from '@/types/date';
import { DoctorProfile } from '@/types/doctor-profile';
import { StackNavigation } from '@/types/navigation';
import { Time } from '@/types/time';

type DoctorProfileParamList = {
  [ROUTES.DOCTOR_PROFILE]: DoctorProfile;
};

type NavigationParam = {
  [ROUTES.APPOINTMENT_DETAILS]: {
    date: Date;
    time: Time;
    doctor: DoctorProfileDetail;
  };
};

export type DoctorProfilePropsScreen = {
  route: RouteProp<DoctorProfileParamList, typeof ROUTES.DOCTOR_PROFILE>;
  navigation: StackNavigation<
    NavigationParam,
    typeof ROUTES.APPOINTMENT_DETAILS
  >;
};

export type DoctorProfileDetail = DoctorProfile & {
  category: string;
  exp: string;
  phone: string;
  opening: string;
  openingDays: Time[];
  nextAvailableDays: Date[];
  availableHours: Time[];
  qualifications: string;
  education: string;
  accreditedHospital: string;
  awards: string;
  consultationFee: string;
  specialty: string;
  languagesSpoken: string;
  workingPositions: string;
};
