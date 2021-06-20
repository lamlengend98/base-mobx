import { TopReview } from '@/models/types';

export interface DoctorReviewProps {
  item: TopReview;
  onItemPress?: (item: TopReview) => void;
}
