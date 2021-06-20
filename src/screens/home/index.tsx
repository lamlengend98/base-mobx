import React, { useCallback, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { FlatList, View } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react';
import { Icon65doctor } from '@/assets';
import { ICONS } from '@/assets/icons/constants';
import { AppBars, DoctorItem, Text, TopicItem, Touchable } from '@/components';
import { useAppStore, useCometChat, useNetworkInfo } from '@/hooks';
import { ROUTES } from '@/stack';
import { Platform } from '@/theme';
import { DoctorProfile, DoctorProfileProps } from '@/types/doctor-profile';
import { Topic, TopicProps } from '@/types/topic';
import { IsIos } from '@/utils';
import { HomeLoader } from './home-loader';
import Specility from './Specility';
import { useStyleHome } from './styles';

export const HomeScreen = observer(() => {
  const styles = useStyleHome();
  const { formatMessage } = useIntl();
  const navigation = useNavigation();
  const {
    doctor,
    devices,
    clinic,
    payment,
    condition,
    userProfile,
    auth,
    news,
  } = useAppStore();
  const network = useNetworkInfo();
  const cometChat = useCometChat();

  const keyExtractor = useCallback(({ id }) => id.toString(), []);

  console.log('====================================');
  console.log('auth.data.HomeScreen', auth.data);
  console.log('====================================');

  useEffect(() => {
    cometChat.createUser(
      {
        name: auth.data.name || 'noname',
        uid: auth.data.id?.toString(),
        avatar: auth.data.image,
      },
      '1',
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    clinic.getAccessTokenDoctor();
  }, [clinic]);

  useEffect(() => {
    news.getNews();
  }, [news]);

  console.log('====================================');
  console.log('news', news.listNews);
  console.log('====================================');

  useEffect(() => {
    const noLoading = true;
    // lấy thông tin ví
    payment.getWallet();
    payment.getCard(noLoading);
    condition.getMedicalHistory(noLoading);
    userProfile.getProfile(auth.data?.id);
  }, [auth.data?.id, condition, payment, userProfile]);

  const onDoctorPress = useCallback(
    (item: DoctorProfile) => {
      navigation.navigate(ROUTES.DOCTOR_PROFILE, item);
    },
    [navigation],
  );

  const onSeeAllDoctor = useCallback(() => {
    navigation.navigate(ROUTES.DOCTORS);
  }, [navigation]);

  const onTopicPress = useCallback(
    (item: Topic) => {
      console.log('item = ', item);
      navigation.navigate(ROUTES.NEWS, { item });
    },
    [navigation],
  );

  const onSearchPress = useCallback(() => {
    navigation.navigate(ROUTES.SEARCH, {
      doctors: doctor.doctorsInfo,
    });
  }, [doctor.doctorsInfo, navigation]);

  const renderDoctorItem = useCallback(
    ({ item }: DoctorProfileProps) => {
      return (
        <DoctorItem onPress={onDoctorPress} item={item} isShowStatus={false} />
      );
    },
    [onDoctorPress],
  );

  const topicItem = useCallback(
    ({ item }: TopicProps) => {
      return <TopicItem onPress={onTopicPress} item={item} />;
    },
    [onTopicPress],
  );

  const ListHeaderComponent = useCallback(() => {
    return (
      <>
        <Text style={styles.section}>
          {formatMessage({ id: 'home.interest' })}
        </Text>

        <Specility />

        <Carousel
          data={news.listNews}
          firstItem={1}
          renderItem={topicItem}
          sliderWidth={styles.topicWidth.width}
          itemWidth={styles.topicWidth.width - Platform.SizeScale(50)}
        />

        <View style={styles.sectionContainer}>
          <Text style={styles.section}>
            {formatMessage({ id: 'home.top_doctors' })}
          </Text>
          <Touchable onPress={onSeeAllDoctor}>
            <Text fontType={'MEDIUM_SF'}>
              {formatMessage({ id: 'home.see_all' })}
            </Text>
          </Touchable>
        </View>
      </>
    );
  }, [
    formatMessage,
    news.listNews,
    onSeeAllDoctor,
    styles.section,
    styles.sectionContainer,
    styles.topicWidth.width,
    topicItem,
  ]);

  const ListFooterComponent = useCallback(() => {
    return <View style={styles.footer} />;
  }, [styles.footer]);

  useEffect(() => {
    doctor.getDoctors();
  }, [clinic, doctor]);

  useEffect(() => {
    setTimeout(() => {
      if (IsIos) {
        if (network.ids?.userId && network.voip?.token) {
          devices.devices(network.ids?.userId!, network.voip?.token!);
        }
      } else {
        devices.pushDevice(network.ids?.userId!, '');
      }
    }, 2000);
  }, [network.voip?.token, network.ids?.userId, devices]);

  if (doctor.isLoading) {
    return <HomeLoader />;
  }

  return (
    <View style={styles.container}>
      <AppBars isShadowBottom={false} hasBack={false} hasRightIcons />
      <Touchable style={styles.searchContainer} onPress={onSearchPress}>
        <Icon65doctor name={ICONS.SEARCH} style={styles.searchIcon} />
        <Text style={styles.search}>
          {formatMessage({ id: 'home.search' })}
        </Text>
      </Touchable>

      <FlatList
        style={styles.topDoctorList}
        data={doctor.doctorsInfo.slice(0, 3)}
        renderItem={renderDoctorItem}
        {...{ ListHeaderComponent, keyExtractor, ListFooterComponent }}
      />
    </View>
  );
});
