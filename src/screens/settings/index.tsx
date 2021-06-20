import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components';
import { useSettingsStyle } from './styles';

export const SettingsScreen = () => {
  const styles = useSettingsStyle();

  return (
    <View style={styles.container}>
      <Text>Call list</Text>
    </View>
  );
};
