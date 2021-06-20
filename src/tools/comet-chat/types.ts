import { ReactNode } from 'react';
import { CometChat } from '@cometchat-pro/react-native-chat';
import { MessageProps } from '@/screens/chatting/types';

export type CometChatProviderProps = {
  children: ReactNode;
};

export type CometChatUserCreate = {
  uid: string;
  name: string;
  avatar?: string;
};

export type CometChatContextValue = {
  createUser: (userCreate: CometChatUserCreate, userConnectUid: string) => void;
  login: (uid: string, userConnectUid: string) => void;
  logout: () => void;
  sendMessage: (receiverID: string, msg: string) => void;
  sendMediaMessage: (
    receiverID: string,
    name: string,
    type: string,
    uri: string,
    mime?: string,
    size?: number,
    extension?: string,
  ) => void;
  sendCustomMessage: (receiverID: string) => void;
  messages: MessageProps[];
  isInitialization: boolean;
  userLogged?: any;
  buildMessages: (user: CometChat.User, userConnectUid: string) => void;
  fetchPreviousMessages: (
    user: CometChat.User,
    userConnectUid: string,
    parentMessageId: string,
  ) => void;
  userConnectUid: string;
  checkLastMessageIsEndSession: () => boolean;
  unreadMessages: number;
  setUnreadMessages: (count: number) => void;
  getUnreadMessages: () => Promise<number>;
};

export type CometChatLocalStore = {
  isInitialization: boolean;
  user?: CometChat.User;
  error?: any;
  appSetting: CometChat.AppSettings;
  statusConnect: 'CONNECTED' | 'CONNECTING' | 'DISCONNECT';
  messagesRequest?: CometChat.MessagesRequest;
  messages: MessageProps[];
  userConnectUid: string;
  unreadMessages: number;
};

export const ERROR_CHAT = {
  ERR_UID_NOT_FOUND: 'ERR_UID_NOT_FOUND',
};
