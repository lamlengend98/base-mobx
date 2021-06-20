import React from 'react';
import { ActivityIndicator } from 'react-native';
import { observer } from 'mobx-react';
import { useAppStore } from '@/hooks';
import { useStyleLoadingGlobal } from './styles';

export const LoadingGlobal = observer(() => {
  const { appState } = useAppStore();
  const [color, styles] = useStyleLoadingGlobal();

  return appState.isShowLoading ? (
    <ActivityIndicator size="large" style={styles.container} color={color} />
  ) : (
    <></>
  );
});
