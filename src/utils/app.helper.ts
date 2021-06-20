import { useMemo } from 'react';
import { Linking, Platform, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import moment from 'moment';
import { Specialities } from '@/models/types';

export const IsIos = Platform.OS === 'ios';

export const useStylesHepler = () => {
  const { colors } = useTheme();
  return useMemo(
    () =>
      StyleSheet.create({
        row: {
          flexDirection: 'row',
        },
        center: {
          alignItems: 'center',
          justifyContent: 'center',
        },
        image: {
          width: '100%',
          height: '100%',
        },
      }),
    [],
  );
};

export function mapSpecility(specialities: any[]): Specialities[] {
  return specialities.map(({ id, name, icon, ...other }) => ({
    ...other,
    id,
    name,
    image: icon,
  }));
}

export const getTimeAgo = (time: string) => {
  return moment(time).fromNow();
};

export const openCall = (phoneNumber?: string) => {
  Linking.openURL(`tel:${phoneNumber}`);
};
