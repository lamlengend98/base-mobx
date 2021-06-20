import React, { Fragment, useMemo } from 'react';
import { View } from 'react-native';
import {
  BottomTabBarOptions,
  BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import { observer } from 'mobx-react-lite';
import { Icon65doctor, TabBarSvg } from '@/assets';
import { ICONS } from '@/assets/icons/constants';
import { useAppStore, useMemberCode } from '@/hooks';
import { NavigationService } from '@/services';
import { ROUTES } from '@/stack';
import { Platform } from '@/theme';
import { Touchable } from '../touchable';
import Badge from './badge';
import { useStyleTabBar } from './styles';

const IconsTab = [
  ICONS.CIRCLE_PLUS,
  ICONS.CALL,
  ICONS.LOGO,
  ICONS.MAIL,
  ICONS.SETTINGS,
];

const TabBarBase = observer(
  ({
    state,
    descriptors,
    navigation,
  }: BottomTabBarProps<BottomTabBarOptions>) => {
    const { styles } = useStyleTabBar();
    const memberCode = useMemberCode();
    const focusedOptions = descriptors[state.routes[state.index]?.key].options;

    const { clinic, auth } = useAppStore();

    const routes = useMemo(
      () =>
        state.routes.map((route, index: number) => {
          const { options } = descriptors[route?.key];
          const isFocused = state.index === index;
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route?.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };
          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route?.key,
            });
          };

          async function handleShowInputMemberCode() {
            const response = await clinic.checkRegisterStatus(auth.data.id);
            if (response) {
              NavigationService.navigate(ROUTES.CLINIC_STACK, {
                user_id: auth.data.id,
              });
            } else {
              memberCode?.show?.();
            }
          }

          if (index === 2) {
            return (
              <Fragment key={index.toString()}>
                <View style={styles.btnViewEmpty} />
                <Touchable
                  activeOpacity={0.9}
                  onPress={handleShowInputMemberCode}
                  style={styles.btnLogoAction}>
                  <Icon65doctor
                    name={IconsTab[index]}
                    style={styles.iconLogo}
                  />
                </Touchable>
              </Fragment>
            );
          }

          if (index < 5) {
            return (
              <Touchable
                key={index.toString()}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                style={[
                  styles.btnAction,
                  {
                    justifyContent: isFocused
                      ? 'flex-start'
                      : styles.btnAction.justifyContent,
                    height: isFocused
                      ? Platform.SizeScale(65)
                      : styles.btnAction.height,
                  },
                ]}
                {...{ onPress, onLongPress }}>
                {isFocused && <View style={styles.borderTab} />}
                <Icon65doctor
                  name={IconsTab[index]}
                  style={styles.iconAction}
                />
                <Badge {...{ index }} />
              </Touchable>
            );
          }
        }),
      [
        auth.data.id,
        clinic,
        descriptors,
        memberCode,
        navigation,
        state.index,
        state.routes,
        styles,
      ],
    );

    if (!focusedOptions) {
      return <></>;
    }

    return (
      <View style={styles.container}>
        {routes}
        <TabBarSvg
          width={Platform.deviceWidth + Platform.SizeScale()}
          style={styles.bgTab}
          height={Platform.SizeScale(160)}
        />
      </View>
    );
  },
);

export const tabBar = (props: BottomTabBarProps<BottomTabBarOptions>) => (
  <TabBarBase {...props} />
);
