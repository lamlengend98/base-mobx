import React, { useMemo } from 'react';
import { useIntl } from 'react-intl';
import { ActivityIndicator, View } from 'react-native';
import { CometChat } from '@cometchat-pro/react-native-chat';
import moment from 'moment';
import { Text } from '@/components';
import { useAppStore } from '@/hooks';
import { useStylesConversation } from './styles';

const LastMessage = (
  conversation?: CometChat.Conversation,
  lastMessage?:
    | CometChat.TextMessage
    | CometChat.MediaMessage
    | CometChat.CustomMessage
    | any,
) => {
  const styles = useStylesConversation();
  const { auth } = useAppStore();
  const { formatMessage } = useIntl();
  const time = useMemo(() => {
    return conversation
      ? moment
          .unix(conversation?.getLastMessage()?.sentAt)
          .format('hh:mm')
          .toString()
      : '';
  }, [conversation]);

  const message = useMemo(() => {
    if (lastMessage?.type === CometChat.MESSAGE_TYPE.TEXT) {
      if (auth.data.id.toString() === lastMessage?.sender?.uid.toString()) {
        return `You: ${lastMessage?.getText()}• ${time}`;
      } else {
        return `${lastMessage?.getText()}• ${time}`;
      }
    } else if (lastMessage?.type === CometChat.MESSAGE_TYPE.AUDIO) {
      if (auth.data.id.toString() === lastMessage?.sender?.uid.toString()) {
        return `${formatMessage({ id: 'app.chat.send_audio' })}• ${time}`;
      } else {
        return `${formatMessage({ id: 'app.chat.received_audio' })}• ${time}`;
      }
    } else if (lastMessage?.type === CometChat.MESSAGE_TYPE.IMAGE) {
      if (auth.data.id.toString() === lastMessage?.sender?.uid.toString()) {
        return `${formatMessage({ id: 'app.chat.send_image' })}• ${time}`;
      } else {
        return `${formatMessage({ id: 'app.chat.received_image' })}• ${time}`;
      }
    } else if (lastMessage?.type === CometChat.MESSAGE_TYPE.VIDEO) {
      if (auth.data.id.toString() === lastMessage?.sender?.uid.toString()) {
        return `${formatMessage({ id: 'app.chat.send_video' })}• ${time}`;
      } else {
        return `${formatMessage({ id: 'app.chat.received_video' })}• ${time}`;
      }
    } else if (lastMessage?.type === CometChat.MESSAGE_TYPE.CUSTOM) {
      if (auth.data.id.toString() === lastMessage?.sender?.uid.toString()) {
        return `• ${time}`;
      } else {
        return `• ${time}`;
      }
    } else {
      return undefined;
    }
  }, [auth.data.id, formatMessage, lastMessage, time]);
  if (message === undefined) {
    return (
      <View style={styles.loadingLastMessage}>
        <ActivityIndicator
          style={styles.indicator}
          color={styles.indicatorColor.color}
        />
      </View>
    );
  }

  return (
    <View>
      <Text
        style={[styles.msg]}
        fontType={
          conversation?.getUnreadMessageCount() ? 'BOLD_SF' : 'REGULAR_SF'
        }
        numberOfLines={1}>
        {message}
      </Text>
    </View>
  );
};

export default LastMessage;
