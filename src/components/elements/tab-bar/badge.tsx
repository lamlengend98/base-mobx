import React from 'react';
import { View } from 'react-native';
import { useCometChat } from '@/hooks';
import { Text } from '../text';
import { useStyleTabBar } from './styles';

const Badge = ({ index }: any) => {
  const { styles } = useStyleTabBar();
  const cometChat = useCometChat();

  if (index === 3 && cometChat.unreadMessages) {
    return (
      <View style={styles.badge}>
        <Text style={styles.textBadge}>{cometChat.unreadMessages}</Text>
      </View>
    );
  }
  return null;
};

export default Badge;
