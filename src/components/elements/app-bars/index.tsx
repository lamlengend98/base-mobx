import React, { memo, useCallback, useEffect, useMemo } from 'react';
import { Image, StatusBar, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import {
  DrawerActions,
  StackActions,
  useNavigation,
} from '@react-navigation/native';
import { observer } from 'mobx-react';
import { IAvixo, Icon65doctor } from '@/assets';
import { ICONS } from '@/assets/icons/constants';
import { useAppStore } from '@/hooks';
import { NotificationParam } from '@/models/types';
import { ROUTES } from '@/stack';
import { COLORS } from '@/theme';
import { getDisplayedAvatar } from '@/utils';
import { Text } from '../text';
import { Touchable } from '../touchable';
import { useStyleAppBars } from './styles';
import { AppBarsProps } from './types';

const AppBarsBase = observer(
  ({
    hasBack = true,
    iconPressLeft = 'ARROW_LEFT',
    onPressLeft,
    title,
    iconStyleLeft,
    isShadowBottom = true,
    textAlign = 'left',
    isShowDrawer = false,
    hasRightIcons = true,
  }: AppBarsProps) => {
    const styles = useStyleAppBars();
    const navigation = useNavigation();
    const { userProfile, notification, auth } = useAppStore();
    const image = useMemo(() => {
      return userProfile?.patientProfile?.data?.image;
    }, [userProfile?.patientProfile?.data?.image]);

    const getNotifyNotRead = useCallback(() => {
      const param: NotificationParam = {
        user_type: 'PATIENT',
        user_id: auth.data?.id,
        is_read: 0,
      };
      notification.getNotificationList(param);
    }, [auth.data?.id, notification]);

    useEffect(() => {
      getNotifyNotRead();
    }, [getNotifyNotRead]);

    function goBack() {
      getNotifyNotRead();
      if (onPressLeft) {
        onPressLeft?.();
      } else if (isShowDrawer) {
        navigation.dispatch(DrawerActions.openDrawer());
      } else {
        console.log('====================================');
        console.log('123');
        console.log('====================================');
        navigation.goBack();
      }
    }

    const onAvatarPress = useCallback(() => {
      navigation.navigate(ROUTES.SETTINGS);
    }, [navigation]);

    const onNotifyPress = useCallback(() => {
      navigation.navigate(ROUTES.NOTIFICATION);
    }, [navigation]);

    const userAvatar = useMemo(() => {
      return getDisplayedAvatar(image);
    }, [image]);

    return (
      <>
        <StatusBar barStyle="dark-content" backgroundColor={COLORS.WHITE} />
        <View style={styles.safeArea}>
          <View style={[styles.container, isShadowBottom && styles.shadow]}>
            <View style={styles.leftContainer}>
              {hasBack && (
                <Touchable
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  onPress={goBack}
                  style={styles.btnBack}>
                  <Icon65doctor
                    name={Icon65doctor.icons[iconPressLeft]}
                    style={[styles.icon, iconStyleLeft]}
                  />
                </Touchable>
              )}
              {title ? (
                <Text
                  fontType="BOLD_SF"
                  numberOfLines={1}
                  lineBreakMode="clip"
                  style={[styles.title, { textAlign }]}>
                  {title}
                </Text>
              ) : (
                <Image
                  style={styles.iconAvixo}
                  resizeMode="contain"
                  source={IAvixo}
                />
              )}
            </View>

            {hasRightIcons && (
              <View style={styles.rightContainer}>
                <View>
                  <Touchable
                    onPress={onNotifyPress}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    style={styles.btn}>
                    <Icon65doctor name={ICONS.NOTIFY} style={styles.icon} />
                  </Touchable>
                  {notification.listNotificationNotRead?.total ? (
                    <View style={styles.notiContainer}>
                      <Text style={styles.noti}>
                        {notification.listNotificationNotRead?.total}
                      </Text>
                    </View>
                  ) : (
                    <View />
                  )}
                </View>

                <Touchable
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  onPress={onAvatarPress}
                  style={styles.btn}>
                  <FastImage
                    source={userAvatar}
                    resizeMode="cover"
                    style={styles.avatar}
                  />
                </Touchable>
              </View>
            )}
          </View>
        </View>
      </>
    );
  },
);

export const AppBars = memo(AppBarsBase);
