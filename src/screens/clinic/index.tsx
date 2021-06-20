import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { FlatList, View } from 'react-native';
import { observer } from 'mobx-react';
import { Icon65doctor } from '@/assets';
import { ICONS } from '@/assets/icons/constants';
import { AppBars, ClinicItem, Text, TextField, Touchable } from '@/components';
import { useAppStore, useMemberCode } from '@/hooks';
import { ClinicInfo } from '@/models/types';
import { ROUTES } from '@/stack';
import { Platform, useTheme } from '@/theme';
import { mocksData } from './__mocks__/data';
import { useStyleClinicScreen } from './styles';

export const ClinicScreen = observer(({ navigation, route }) => {
  const styles = useStyleClinicScreen();
  const { formatMessage } = useIntl();
  const [searchText, setSearchText] = useState('');
  const [] = useState(mocksData.filters);
  const { colors } = useTheme();
  const memberCode = useMemberCode();

  const { clinic } = useAppStore();

  useEffect(() => {
    const user_id = route?.params?.user_id;
    clinic.getAllClinics(user_id);
  }, [clinic, route?.params?.user_id]);

  const onChangeTextSearch = useCallback((text) => {
    setSearchText(text);
  }, []);

  const keyExtractor = useCallback(
    (item: ClinicInfo, index: number) => index?.toString(),
    [],
  );

  const onItemPress = useCallback(
    (item: ClinicInfo) => {
      navigation.navigate(ROUTES.CLINIC_DOCTORS, item);
    },
    [navigation],
  );

  const renderClinicItem = useCallback(
    ({ item, index }: { item: ClinicInfo; index: number }) => {
      return <ClinicItem item={item} {...{ onItemPress, index }} />;
    },
    [onItemPress],
  );

  const onPressInviteCode = useCallback(() => {
    const signed = true;
    memberCode?.show?.(signed);
  }, [memberCode]);

  const renderLeftAccessory = useCallback(() => {
    return (
      <View style={styles.iconContainer}>
        <Icon65doctor name={ICONS.SEARCH} style={styles.searchIcon} />
      </View>
    );
  }, [styles.iconContainer, styles.searchIcon]);

  const ListHeaderComponent = useMemo(() => {
    return (
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <View
            style={{
              width: '50%',
              alignItems: 'center',
            }}>
            <TextField
              fontType={'REGULAR_SF'}
              style={styles.input}
              value={searchText}
              placeholder={formatMessage({ id: 'search.clinic' })}
              placeholderTextColor={colors.darkGray}
              onChangeText={onChangeTextSearch}
              renderLeftAccessory={renderLeftAccessory}
            />
          </View>
        </View>
        <Touchable onPress={onPressInviteCode} style={styles.btn}>
          <Icon65doctor
            name={ICONS.PLUS_BOLD}
            color={colors.darkGray2}
            size={Platform.SizeScale(15)}
          />
        </Touchable>
      </View>
    );
  }, [
    styles.header,
    styles.searchContainer,
    styles.input,
    styles.btn,
    searchText,
    formatMessage,
    colors.darkGray,
    colors.darkGray2,
    onChangeTextSearch,
    renderLeftAccessory,
    onPressInviteCode,
  ]);

  const ListFooterComponent = useCallback(() => {
    return <View style={styles.footer} />;
  }, [styles.footer]);

  const listClinic = useMemo(() => {
    return clinic.clinicInfo?.filter((item: ClinicInfo) => {
      let clinic = {
        ...item,
      };
      if (!item?.clinic_name) {
        const clinic_name = '';
        clinic = {
          ...item,
          clinic_name,
        };
      }
      return clinic?.clinic_name
        ?.toLowerCase()
        .trim()
        .includes(searchText.toLowerCase().trim());
    });
  }, [clinic.clinicInfo, searchText]);

  return (
    <View style={styles.container}>
      <AppBars
        textAlign="left"
        title={formatMessage({ id: 'clinic' })}
        isShadowBottom={false}
      />

      <FlatList
        style={styles.list}
        data={listClinic}
        renderItem={renderClinicItem}
        {...{ keyExtractor, ListHeaderComponent, ListFooterComponent }}
      />
    </View>
  );
});
