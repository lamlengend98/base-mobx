import { ClinicInfo } from '@/models/types';

export interface ClinicProps {
  item?: ClinicInfo;
  onItemPress?: (item: ClinicInfo) => void;
  index: number;
}
