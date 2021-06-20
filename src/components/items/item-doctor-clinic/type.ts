import { DoctorClinic } from '@/models/types';

export interface DoctorClinicProps {
  item?: DoctorClinic;
  onItemPress?: (item: DoctorClinic) => void;
  onVideoCallPress?: (item: DoctorClinic) => void;
  onChatPress?: (item: DoctorClinic) => void;
}

export interface TopDoctorReviewProps {
  item?: DoctorClinic;
  onItemPress: (item: DoctorClinic) => void;
}
