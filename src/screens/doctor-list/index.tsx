import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { FlatList, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import _ from 'lodash';
import { observer } from 'mobx-react';
import { Icon65doctor } from '@/assets';
import { ICONS } from '@/assets/icons/constants';
import { AppBars, DoctorItem, Text, TextField } from '@/components';
import { useAppStore } from '@/hooks';
import { ROUTES } from '@/stack';
import { DoctorProfile, DoctorProfileProps } from '@/types/doctor-profile';
import { mapDoctorInfo } from '@/utils/doctor.helper';
import { mocksData } from './__mocks__/data';
import { DoctorLoader } from './doctor-loader';
import { useStyleDoctors } from './styles';

export const DoctorsScreen = observer(() => {
  const styles = useStyleDoctors();
  const { formatMessage } = useIntl();
  const navigation = useNavigation();
  const { doctor } = useAppStore();
  const [doctors, setDoctors] = useState<any[]>([]);

  const [searchText, setSearchText] = useState('');
  const mapDoctor: DoctorProfile[] = useMemo(() => {
    return doctors.length ? mapDoctorInfo(doctors) : doctor.doctorsInfo;
  }, [doctor.doctorsInfo, doctors]);

  const keyExtractor = useCallback((item: any) => item?.id?.toString(), []);

  const onChangeTextSearch = _.debounce(
    (text) => {
      setSearchText(text);
      onSearchDoctor(text);
    },
    400,
    { leading: false, trailing: true },
  );

  const onSearchDoctor = useCallback(
    async (text: string) => {
      const result = await doctor.searchDoctor(text);
      setDoctors(result);
    },
    [doctor],
  );

  const onDoctorPress = useCallback(
    (item: DoctorProfile) => {
      navigation.navigate(ROUTES.DOCTOR_PROFILE, item);
    },
    [navigation],
  );

  const renderFilters = useMemo(() => {
    return (
      <View style={styles.filterContainer}>
        {mocksData.filters.map((item, index) => {
          return (
            <View style={styles.filterContainer} key={index}>
              <Text fontType="REGULAR_SF" style={styles.filter}>
                {item}
              </Text>
              {index === mocksData.filters.length - 1 && (
                <Icon65doctor name={ICONS.CLOSE} style={styles.deleteIcon} />
              )}
            </View>
          );
        })}
      </View>
    );
  }, [styles]);

  function renderDoctorItem({ item }: DoctorProfileProps) {
    return <DoctorItem onPress={onDoctorPress} item={item} />;
  }

  useEffect(() => {
    doctor.getDoctors();
  }, [doctor]);

  if (doctor.isLoading) {
    return <DoctorLoader />;
  }

  return (
    <View style={styles.container}>
      <AppBars
        textAlign="left"
        title={formatMessage({ id: 'home.top_doctors' })}
        isShadowBottom={false}
      />
      <View style={styles.doctorContainer}>
        <Icon65doctor name={ICONS.SEARCH} style={styles.searchIcon} />

        <TextField
          fontType={'REGULAR_SF'}
          style={styles.input}
          placeholder={formatMessage({ id: 'home.search' })}
          onChangeText={onChangeTextSearch}
        />
      </View>

      {/* {renderFilters} */}

      <FlatList
        style={styles.doctorList}
        data={mapDoctor}
        renderItem={renderDoctorItem}
        {...{ keyExtractor }}
      />
    </View>
  );
});
