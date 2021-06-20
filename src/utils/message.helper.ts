import { CometChat } from '@cometchat-pro/react-native-chat';
import moment from 'moment';
import { MessageProps } from '@/screens/chatting/types';

export function mapInfoSendMessage(
  msg: CometChat.TextMessage | CometChat.MediaMessage | CometChat.BaseMessage,
  userNameCurrent: string,
): MessageProps {
  const sender = msg.getSender();
  return {
    id: msg.getId().toString(),
    messageType: msg.getType?.(),
    msg: msg.getText?.(),
    time: moment.unix(msg.getSentAt()).format('hh:mm').toString(),
    positions: userNameCurrent === sender?.getUid() ? 'LEFT' : 'RIGHT',
    user: {
      avatar: sender?.getAvatar?.(),
      fullName: sender?.getName?.(),
      id: sender?.getUid?.(),
      userName: sender?.getUid?.(),
    },
    isFake: false,
    data: msg.getData?.(),
    sentAt: msg.getSentAt?.(),
  };
}
