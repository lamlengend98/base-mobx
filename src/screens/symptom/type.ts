import { SymptonDetail } from '../pre-consultation/type';

export interface SymptonDetailProps {
  item: SymptonDetail;
  isSelected?: boolean;
  onItemPress?: (item: SymptonDetail) => void;
}
