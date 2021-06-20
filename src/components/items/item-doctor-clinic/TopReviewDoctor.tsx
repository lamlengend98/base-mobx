import React, { useCallback } from 'react';
import { FlatList } from 'react-native';
import { observer } from 'mobx-react';
import { HorizontalLoader } from '@/components/horizontal-loader';
import { useAppStore } from '@/hooks';
import { TopReview } from '@/models/types';
import { useStyleClinicDoctorsScreen } from '@/screens/clinic-doctors/styles';
import { DoctorReviewItem } from '../item-doctor-review';
import { DoctorReviewProps } from '../item-doctor-review/type';
import { TopDoctorReviewProps } from './type';

const TopReviewDoctor = observer(({ onItemPress }: TopDoctorReviewProps) => {
  const styles = useStyleClinicDoctorsScreen();
  const { clinic } = useAppStore();
  const keyExtractor = useCallback(
    (item: any, index: number) => index?.toString(),
    [],
  );

  const onTopDoctorPress = useCallback(
    (item: TopReview) => {
      onItemPress({
        _65doctor_id: item.doctorId,
        rating_avg: item.ratingAvg,
        name: item.name,
        photo: item.photo,
        rating: item.rating,
        registration_no: item.registrationNo,
        specialty: item.specialty,
        year_experience: item.yearExperience,
      });
    },
    [onItemPress],
  );
  const renderReviewDoctorItem = useCallback(
    ({ item }: DoctorReviewProps) => {
      return <DoctorReviewItem item={item} onItemPress={onTopDoctorPress} />;
    },
    [onTopDoctorPress],
  );

  if (clinic.loadingTopReview) {
    return <HorizontalLoader />;
  }

  return (
    <FlatList
      style={styles.list}
      // @ts-ignore
      data={clinic.topReviewDoctors}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={renderReviewDoctorItem}
      {...{ keyExtractor }}
    />
  );
});

export default TopReviewDoctor;
