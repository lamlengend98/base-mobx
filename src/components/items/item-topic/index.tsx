import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { TopicProps } from '@/types/topic';
import { Text } from '../../elements/text';
import { Touchable } from '../../elements/touchable';
import { useStylesItemTopic } from './styles';

const _TopicItem = ({ item, onPress }: TopicProps) => {
  const styles = useStylesItemTopic();
  const { formatMessage } = useIntl();

  const _onPress = useCallback(() => {
    return item && onPress?.(item);
  }, [onPress, item]);

  return (
    <Touchable style={styles.container} onPress={_onPress}>
      <FastImage
        source={{ uri: item?.picture }}
        resizeMode="cover"
        style={styles.avatar}>
        <View style={styles.overlay}>
          <Text style={styles.name} numberOfLines={3}>
            {item?.title}
          </Text>
        </View>
      </FastImage>
      <Text style={styles.description}>
        {formatMessage({ id: 'home.see_more' })}
      </Text>
    </Touchable>
  );
};

export const TopicItem = React.memo(_TopicItem);
