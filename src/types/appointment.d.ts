import { AppointmentInfo } from '@/models/types';
import { Date } from './date';
import { DoctorProfile } from './doctor-profile';

interface Appointment {
  id: string;
  doctor: DoctorProfile;
  date: Date;
  time: string;
  isUpcoming?: boolean;
}

export interface AppointmentProps {
  item?: AppointmentInfo;
  onPress?: (item: AppointmentInfo) => void;
}
