import { PreConsultation } from '@/models/types';
import { Sympton } from '@/screens/pre-consultation/type';

export interface PreConsultationProps {
  item?: Sympton;
  isSelected?: boolean;
  onItemPress?: (item: Sympton) => void;
}
