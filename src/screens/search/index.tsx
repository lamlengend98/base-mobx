import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useIntl } from 'react-intl';
import { FlatList, TextInput, View } from 'react-native';
import Toast from 'react-native-tiny-toast';
import { useNavigation } from '@react-navigation/native';
import _ from 'lodash';
import { Icon65doctor } from '@/assets';
import { ICONS } from '@/assets/icons/constants';
import { AppBars, DoctorItem, Text, TextField } from '@/components';
import { useAppStore } from '@/hooks';
import { ROUTES } from '@/stack';
import { Platform, useTheme } from '@/theme';
import { showErrorToast } from '@/tools';
import { DoctorProfile, DoctorProfileProps } from '@/types/doctor-profile';
import { mapDoctorInfo } from '@/utils/doctor.helper';
import { mocksData } from './__mocks__/search';
import { useStyleSearch } from './styles';

export const SearchScreen = ({ route }) => {
  const styles = useStyleSearch();
  const { formatMessage } = useIntl();
  const navigation = useNavigation();
  const [doctors, setDoctors] = useState<any[]>([]);
  const [searchText, setSearchText] = useState('');
  const { doctor } = useAppStore();
  const refInput = useRef<TextInput>(null);
  const { colors } = useTheme();
  const mapDoctor: DoctorProfile[] = useMemo(() => {
    return doctors.length ? doctors : [];
  }, [doctors]);

  const onSearchDoctor = useCallback(
    async (text: string) => {
      const result = await doctor.searchDoctor(text);
      if (!result.length) {
        showErrorToast(
          formatMessage({ id: 'app.search.doctor' }, { str: text }),
          Toast.position.TOP,
        );
      }
      setDoctors(mapDoctorInfo(result));
    },
    [doctor, formatMessage],
  );

  useEffect(() => {
    if (route?.params?.doctors) {
      setTimeout(() => {
        setDoctors(route?.params?.doctors);
      }, 0);
    }
  }, [route?.params?.doctors]);

  useEffect(() => {
    const { current: input } = refInput;
    input?.focus();
  }, []);

  useEffect(() => {
    if (searchText) {
      onSearchDoctor(searchText);
    } else {
      setDoctors(route?.params?.doctors);
    }
  }, [onSearchDoctor, route?.params?.doctors, searchText]);

  const keyExtractor = useCallback((item: any) => item?.id?.toString(), []);

  const onChangeTextSearch = _.debounce(
    (text) => {
      setSearchText(text);
    },
    400,
    { leading: false, trailing: true },
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
    return (
      <DoctorItem
        styleAvatar={{ height: Platform.SizeScale(200) }}
        onPress={onDoctorPress}
        item={item}
      />
    );
  }

  const ListFooterComponent = useCallback(() => {
    return <View style={styles.footer} />;
  }, [styles.footer]);

  return (
    <View style={styles.container}>
      <AppBars isShadowBottom={false} />
      <View style={styles.searchContainer}>
        <Icon65doctor name={ICONS.SEARCH} style={styles.searchIcon} />
        <TextField
          fontType={'REGULAR_SF'}
          style={styles.input}
          placeholder={formatMessage({ id: 'home.search' })}
          placeholderTextColor={colors.darkGray}
          onChangeText={onChangeTextSearch}
          ref={refInput}
        />
      </View>

      {/* {renderFilters} */}

      <FlatList
        style={styles.doctorList}
        data={mapDoctor}
        renderItem={renderDoctorItem}
        {...{ keyExtractor, ListFooterComponent }}
      />
    </View>
  );
};
