import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

export const useSettingsStyle = () => {
  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
        },
      }),
    [],
  );
};
