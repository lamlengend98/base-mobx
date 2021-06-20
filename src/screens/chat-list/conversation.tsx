import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { Image, View } from 'react-native';
import { CometChat } from '@cometchat-pro/react-native-chat';
import { observer } from 'mobx-react';
import { DefaultProfile } from '@/assets';
import { Text, Touchable } from '@/components';
import { useAppStore, useCometChat } from '@/hooks';
import { ChatListInfo } from '@/models/types';
import { NavigationService } from '@/services';
import { ROUTES } from '@/stack';
import { getTimeAgo } from '@/utils';
import { MessageProps } from '../chatting/types';
import LastMessage from './LastMessage';
import { useStylesConversation } from './styles';

interface ConversationProps {
  item: ChatListInfo;
  navigation: any;
}

const ConversationBase = observer(({ item, navigation }: ConversationProps) => {
  const styles = useStylesConversation();
  const [conversation, setConversation] = useState<
    CometChat.Conversation | undefined
  >();
  const { clinic } = useAppStore();
  const cometChat = useCometChat();
  const lastMessage = useMemo(() => {
    const last: MessageProps = conversation?.getLastMessage()?.data?.customData
      ?.lastMessage;
    if (!last) return conversation?.getLastMessage();
    return {
      type: last?.messageType,
      sender: {
        uid: last?.user?.id,
        ...last?.user,
      },
      getText: () => last?.msg,
      ...last,
    };
  }, [conversation]);

  const getConversation = useCallback(async () => {
    try {
      const conv = await CometChat.getConversation(
        item.doctorId.toString(),
        CometChat.RECEIVER_TYPE.USER,
      );
      setConversation(conv);
      await cometChat.getUnreadMessages();
    } catch (error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
    }
  }, [cometChat, item.doctorId]);

  const onPress = async () => {
    clinic.setChoicedDoctor({
      _65doctor_id: item.doctorId,
    });
    onChat();
  };
  useEffect(() => {
    if (cometChat.userLogged) {
      getConversation();
    }
  }, [cometChat.userLogged, getConversation, cometChat.unreadMessages]);

  const onChat = useCallback(() => {
    if (`${item.doctorId}` === conversation?.getLastMessage()?.sender?.uid) {
      CometChat.markAsRead(
        conversation?.getLastMessage()?.id.toString(),
        conversation?.getLastMessage()?.sender?.uid,
        CometChat.RECEIVER_TYPE.USER,
      );
    } else {
      CometChat.markAsRead(
        conversation?.getLastMessage()?.id.toString(),
        conversation?.getLastMessage()?.receiver?.uid,
        CometChat.RECEIVER_TYPE.USER,
      );
    }
    CometChat.markAsRead(
      conversation?.getLastMessage()?.id.toString(),
      conversation?.getLastMessage()?.sender?.uid,
      CometChat.RECEIVER_TYPE.USER,
    );
    NavigationService.navigate(ROUTES.CHATTING, {
      doctorId: item.doctorId,
      doctor: item.doctor,
      hasSend: false,
    });
  }, [conversation, item.doctor, item.doctorId]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // do something
      if (cometChat.userLogged) {
        getConversation();
      }
    });
    return unsubscribe;
  }, [cometChat.userLogged, getConversation, navigation]);

  console.log('====================================');
  console.log(conversation);
  console.log('====================================');
  return (
    <Touchable {...{ onPress }} style={styles.container}>
      <View style={styles.vAvatar}>
        <Image
          style={styles.avatar}
          source={item?.doctor?.image || DefaultProfile}
        />
      </View>
      <View style={styles.content}>
        <Text
          style={
            !conversation?.getUnreadMessageCount()
              ? styles.name
              : styles.nameUnread
          }
          fontType={'BOLD_SF'}
          numberOfLines={1}>
          {item?.doctor?.firstName} {item?.doctor?.lastName}
        </Text>
        {LastMessage(conversation, lastMessage)}
        <View style={styles.footer}>
          <Text numberOfLines={1}>
            {getTimeAgo(
              new Date(
                lastMessage?.sentAt
                  ? lastMessage?.sentAt * 1000
                  : item.updatedAt,
              ).toString(),
            ) || '9 hours ago'}
          </Text>
          {!conversation?.getUnreadMessageCount() ? (
            <></>
          ) : (
            <Text style={styles.badge} numberOfLines={1}>
              {conversation?.getUnreadMessageCount()}
            </Text>
          )}
        </View>
      </View>
    </Touchable>
  );
});

export const Conversation = memo(ConversationBase);
