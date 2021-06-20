import React from 'react';
import { useIntl } from 'react-intl';
import { ScrollView, View } from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import { AppBars, Text } from '@/components';
import { Platform } from '@/theme';
import { Topic } from '@/types/topic';
import { useNewsStyle } from './styles';

export const NewsScreen = ({ route }) => {
  const styles = useNewsStyle();
  const { formatMessage } = useIntl();
  const item: Topic = route.params?.item;

  return (
    <View style={styles.container}>
      <AppBars
        isShadowBottom={false}
        title={formatMessage({ id: 'app.news' })}
      />
      <ScrollView style={styles.body}>
        <Text style={{ fontWeight: 'bold', fontSize: 30 }}>{item.title}</Text>
        {item.picture && (
          <AutoHeightImage
            source={{ uri: item.picture }}
            style={{ marginTop: Platform.SizeScale(12) }}
            width={Platform.deviceWidth - Platform.SizeScale(30)}
          />
        )}
        <Text
          isViewHtml
          showMore={false}
          style={{ fontSize: 15, marginTop: Platform.SizeScale(12) }}>
          {item.content}
        </Text>
      </ScrollView>
    </View>
  );
};
