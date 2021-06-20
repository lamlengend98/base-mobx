import { ImageStyle } from 'react-native';

export interface DoctorProfile {
  id: number;
  name: string;
  avatar: string;
  details: string;
  address: string;
  reviews: number;
  rating: any[];
  rating_avg: number;
  is_online: number;
}

export interface DoctorProfileProps {
  item?: DoctorProfile;
  onPress?: (item: DoctorProfile) => void;
  isShowStatus?: boolean;
  styleAvatar?: any;
}
