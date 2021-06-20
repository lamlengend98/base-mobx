import React, { useCallback, useEffect, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { AppState, AppStateStatus } from 'react-native';
import Config from 'react-native-config';
import { CometChat } from '@cometchat-pro/react-native-chat';
import _ from 'lodash';
import { useLocalStore, useObserver } from 'mobx-react-lite';
import { nanoid } from 'nanoid';
import { useDropdownAlert } from '@/hooks';
import { NavigationService } from '@/services';
import { mapInfoSendMessage } from '@/utils';
import { alertMessage } from '@/utils/alert.helper';
import { CometChatContext } from './context';
import {
  CometChatContextValue,
  CometChatLocalStore,
  CometChatProviderProps,
  CometChatUserCreate,
  ERROR_CHAT,
} from './types';

export const CometChatProvider = ({ children }: CometChatProviderProps) => {
  const localStore = useLocalStore<CometChatLocalStore>(() => ({
    isInitialization: false,
    statusConnect: 'CONNECTING',
    appSetting: new CometChat.AppSettingsBuilder()
      .setRegion(Config.COMET_CHAT_REGION)
      .build(),
    messages: [],
    userConnectUid: '',
    unreadMessages: 0,
  }));
  const { formatMessage } = useIntl();
  const dropdownAlert = useDropdownAlert();

  const setUnreadMessages = useCallback(
    async (count: number) => {
      localStore.unreadMessages = count;
    },
    [localStore],
  );

  const fetchPreviousMessages = useCallback(
    (user: CometChat.User, userConnectUid: string, parentMessageId: string) => {
      localStore.userConnectUid = userConnectUid;
      localStore.messagesRequest = new CometChat.MessagesRequestBuilder()
        .setUID(userConnectUid)
        .setMessageId(+parentMessageId)
        .setLimit(5)
        .build();
      localStore.messagesRequest
        ?.fetchPrevious()
        .then(
          (
            msgPrev:
              | CometChat.BaseMessage[]
              | CometChat.TextMessage[]
              | CometChat.MediaMessage[],
          ) => {
            console.log('====================================');
            console.log('msgPrev', msgPrev);
            console.log('====================================');
            const messages = msgPrev.map(
              (
                msg:
                  | CometChat.BaseMessage
                  | CometChat.TextMessage
                  | CometChat.MediaMessage,
              ) => mapInfoSendMessage(msg, user?.getUid()!),
            );
            localStore.messages = [...messages, ...localStore.messages];
          },
        )
        .catch((error) => {
          console.log(
            `🛠 LOG: 🚀 --> -----------------------------------------------------------------------------`,
          );
          console.log(
            `🛠 LOG: 🚀 --> ~ file: index.tsx ~ line 50 ~ CometChatProvider ~ error`,
            error,
          );
          console.log(
            `🛠 LOG: 🚀 --> -----------------------------------------------------------------------------`,
          );
        });
    },
    [localStore],
  );

  const buildMessages = useCallback(
    (user: CometChat.User, userConnectUid: string) => {
      localStore.userConnectUid = userConnectUid;
      localStore.messagesRequest = new CometChat.MessagesRequestBuilder()
        .setUID(userConnectUid)
        .setLimit(5)
        .build();
      localStore.messagesRequest
        ?.fetchPrevious()
        .then(
          (
            msgPrev:
              | CometChat.BaseMessage[]
              | CometChat.TextMessage[]
              | CometChat.MediaMessage[],
          ) => {
            console.log('====================================');
            console.log('msgPrev', msgPrev);
            console.log('====================================');
            localStore.isInitialization = true;
            // @ts-ignore
            localStore.messages = msgPrev.map(
              (
                msg:
                  | CometChat.BaseMessage
                  | CometChat.TextMessage
                  | CometChat.MediaMessage,
              ) => mapInfoSendMessage(msg, user?.getUid()!),
            );
          },
        )
        .catch((error) => {
          console.log(
            `🛠 LOG: 🚀 --> -----------------------------------------------------------------------------`,
          );
          console.log(
            `🛠 LOG: 🚀 --> ~ file: index.tsx ~ line 50 ~ CometChatProvider ~ error`,
            error,
          );
          console.log(
            `🛠 LOG: 🚀 --> -----------------------------------------------------------------------------`,
          );

          localStore.isInitialization = true;
        });
    },
    [localStore],
  );

  const handleAppStateChange = useCallback(
    (appStatus: AppStateStatus) => {
      if (
        localStore.isInitialization &&
        appStatus === 'active' &&
        localStore.user &&
        localStore.messagesRequest &&
        localStore.userConnectUid
      ) {
        localStore.isInitialization = false;
        buildMessages(localStore.user, localStore.userConnectUid);
      }
    },
    [buildMessages, localStore],
  );

  const showErrorSend = useCallback((error: any) => {
    if (error.code === ERROR_CHAT.ERR_UID_NOT_FOUND) {
      alertMessage(
        ERROR_CHAT.ERR_UID_NOT_FOUND,
        () => NavigationService.back(),
        'Doctor account is not active in the system, contact administrator please! ',
      );
    } else {
      alertMessage(error.code, () => {}, error.message);
    }
  }, []);

  const receiveMessage = useCallback(
    (message: any) => {
      console.log(
        `🛠 LOG: 🚀 --> ---------------------------------------------------------------------------------`,
      );
      console.log(
        `🛠 LOG: 🚀 --> ~ file: index.tsx ~ line 99 ~ CometChatProvider ~ message`,
        message,
        localStore.user,
      );
      console.log(
        `🛠 LOG: 🚀 --> ---------------------------------------------------------------------------------`,
      );
      dropdownAlert.show(message);
      setUnreadMessages(localStore.unreadMessages + 1);
      if (
        message.receiver.uid === localStore.user?.getUid() &&
        message.receiverType === 'user'
      ) {
        CometChat.markAsRead(
          message.id,
          message.sender.uid,
          CometChat.RECEIVER_TYPE.USER,
        );
        const { messages, user } = localStore;
        localStore.messages = [
          ...messages,
          mapInfoSendMessage(message, user?.getUid()!),
        ];
      }
    },
    [dropdownAlert, localStore, setUnreadMessages],
  );

  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, [handleAppStateChange]);

  useEffect(() => {
    if (!localStore.isInitialization && !localStore.error) {
      CometChat.init(Config.COMET_CHAT_ID, localStore.appSetting)
        .then(() => {
          localStore.error = undefined;
          CometChat.addConnectionListener('XMPPConnectionListener', {
            inConnecting: () => {
              localStore.statusConnect = 'CONNECTING';
            },
            onConnected: () => {
              localStore.statusConnect = 'CONNECTED';
            },
            onDisconnected: () => {
              localStore.statusConnect = 'DISCONNECT';
            },
          });
          CometChat.addMessageListener('CHAT_SCREEN_MESSAGE_LISTENER', {
            onTextMessageReceived: receiveMessage,
            onMediaMessageReceived: receiveMessage,
          });
        })
        .catch((error) => {
          localStore.error = error;
        });
    }
    return () => {
      CometChat.removeConnectionListener('XMPPConnectionListener');
      CometChat.removeConnectionListener('CHAT_SCREEN_MESSAGE_LISTENER');
    };
  }, [localStore, receiveMessage]);

  const logout = useCallback(async () => {
    const logout = await CometChat.logout();
    console.log(
      `🛠 LOG: 🚀 --> ---------------------------------------------------------------------`,
    );
    console.log(
      `🛠 LOG: 🚀 --> ~ file: index.tsx ~ line 159 ~ logout ~ logout`,
      logout,
    );
    console.log(
      `🛠 LOG: 🚀 --> ---------------------------------------------------------------------`,
    );
  }, []);

  const getUnreadMessages = useCallback(async () => {
    const unread = await CometChat.getUnreadMessageCountForAllUsers();
    console.log(
      `🛠 LOG: 🚀 --> --------------------------------------------------------------------`,
    );
    console.log(
      `🛠 LOG: 🚀 --> ~ file: index.tsx ~ line 171 ~ .then ~ unread`,
      unread,
    );
    console.log(
      `🛠 LOG: 🚀 --> --------------------------------------------------------------------`,
    );
    let total = 0;
    _.map(unread, (value) => {
      console.log(
        `🛠 LOG: 🚀 --> -----------------------------------------------------------------`,
      );
      console.log(
        `🛠 LOG: 🚀 --> ~ file: badge.tsx ~ line 28 ~ _.map ~ value`,
        value,
      );
      console.log(
        `🛠 LOG: 🚀 --> -----------------------------------------------------------------`,
      );
      total += Number(value);
    });
    localStore.unreadMessages = total;
    return total;
  }, [localStore]);

  const login = useCallback(
    (uid: string, userConnectUid: string) => {
      localStore.isInitialization = false;
      CometChat.login(uid, Config.COMET_CHAT_AUTH_KEY)
        .then((user) => {
          console.log('====================================');
          console.log('user login', user);
          console.log('====================================');
          localStore.user = user;
          localStore.error = undefined;
          localStore.userConnectUid = userConnectUid;
          buildMessages(localStore.user, userConnectUid);
          getUnreadMessages();
        })
        .catch((error) => {
          console.log('====================================');
          console.log('error', error);
          console.log('====================================');
          localStore.error = error;
          localStore.user = undefined;
        });
    },
    [buildMessages, getUnreadMessages, localStore],
  );

  const createUser = useCallback(
    (userCreate: CometChatUserCreate, userConnectUid: string) => {
      localStore.isInitialization = false;
      CometChat.createUser(userCreate, Config.COMET_CHAT_AUTH_KEY)
        .then((user) => {
          console.log('====================================');
          console.log('user', user);
          console.log('====================================');
          localStore.userConnectUid = userConnectUid;
          localStore.user = user;
          localStore.error = undefined;
          login(userCreate.uid, userConnectUid);
        })
        .catch((error) => {
          console.log('====================================');
          console.log(error);
          console.log('====================================');
          localStore.error = error;
          localStore.user = undefined;
          login(userCreate.uid, userConnectUid);
        });
    },
    [localStore, login],
  );

  const sendCustomMessage = useCallback(
    async (receiverID: string) => {
      try {
        const baseMessage = new CometChat.CustomMessage(
          receiverID,
          CometChat.RECEIVER_TYPE.USER,
          CometChat.MESSAGE_TYPE.CUSTOM,
          {
            data: formatMessage({
              id: 'app.chat.end_session',
            }),
            lastMessage: localStore.messages.pop(),
          },
        );
        const result = await CometChat.sendMessage(baseMessage);
        console.log(
          `🛠 LOG: 🚀 --> -------------------------------------------------------------------------------`,
        );
        console.log(
          `🛠 LOG: 🚀 --> ~ file: index.tsx ~ line 213 ~ sendCustoMessage ~ result`,
          result,
        );
        console.log(
          `🛠 LOG: 🚀 --> -------------------------------------------------------------------------------`,
        );
      } catch (error) {
        console.log('====================================');
        console.log(error);
        console.log('====================================');
        showErrorSend(error);
      }
    },
    [formatMessage, localStore.messages, showErrorSend],
  );

  const sendMessage = useCallback(
    (receiverID: string, msg: string) => {
      const textMessage = new CometChat.TextMessage(
        receiverID,
        msg,
        CometChat.RECEIVER_TYPE.USER,
      );

      const { messages, user } = localStore;
      localStore.messages = [
        ...messages,
        {
          id: nanoid(),
          isFake: true,
          positions: 'LEFT',
          messageType: 'text',
          sentAt: new Date().getTime(),
        },
      ];

      CometChat.sendMessage(textMessage).then(
        (msgSended) => {
          console.log('====================================');
          console.log(msgSended);
          console.log('====================================');
          localStore.messages = [
            ...messages,
            mapInfoSendMessage(
              msgSended as CometChat.TextMessage,
              user?.getUid()!,
            ),
          ].filter(({ isFake }) => !isFake);
        },
        (error) => {
          console.log('Message sending failed with error:', error);
          // Handle any error
          showErrorSend(error);
        },
      );
    },
    [localStore, showErrorSend],
  );

  const checkLastMessageIsEndSession = useCallback(() => {
    const lastMessage = localStore.messages[localStore.messages.length - 1];
    if (lastMessage?.messageType === CometChat.MESSAGE_TYPE.CUSTOM) {
      return true;
    }
    return false;
  }, [localStore.messages]);

  const sendMediaMessage = useCallback(
    (receiverID, name: string, type: string, uri: string, mime?: string) => {
      const mediaMessage = new CometChat.MediaMessage(
        receiverID,
        {
          name,
          type: mime,
          uri,
        },
        type,
        CometChat.RECEIVER_TYPE.USER,
      );

      const { messages, user } = localStore;
      localStore.messages = [
        ...messages,
        {
          id: nanoid(),
          isFake: true,
          positions: 'LEFT',
          messageType: 'text',
          sentAt: new Date().getTime(),
        },
      ];

      CometChat.sendMediaMessage(mediaMessage).then(
        (msgSended) => {
          console.log('====================================');
          console.log(msgSended);
          console.log('====================================');
          localStore.messages = [
            ...messages,
            mapInfoSendMessage(
              msgSended as CometChat.MediaMessage,
              user?.getUid()!,
            ),
          ].filter(({ isFake }) => !isFake);
        },
        (error) => {
          console.log('Message sending failed with error:', error);
          // Handle any error
          showErrorSend(error);
        },
      );
    },
    [localStore, showErrorSend],
  );

  const messages = useObserver(() => localStore.messages);
  const userLogged = useObserver(() => localStore.user);
  const isInitialization = useObserver(() => localStore.isInitialization);
  const userConnectUid = useObserver(() => localStore.userConnectUid);
  const unreadMessages = useObserver(() => localStore.unreadMessages);

  const value = useMemo<CometChatContextValue>(
    () => ({
      createUser,
      login,
      logout,
      sendMessage,
      sendCustomMessage,
      sendMediaMessage,
      messages,
      userLogged,
      isInitialization,
      buildMessages,
      fetchPreviousMessages,
      userConnectUid,
      checkLastMessageIsEndSession,
      unreadMessages,
      setUnreadMessages,
      getUnreadMessages,
    }),
    [
      sendCustomMessage,
      createUser,
      login,
      logout,
      sendMessage,
      sendMediaMessage,
      messages,
      userLogged,
      isInitialization,
      buildMessages,
      fetchPreviousMessages,
      userConnectUid,
      checkLastMessageIsEndSession,
      unreadMessages,
      setUnreadMessages,
      getUnreadMessages,
    ],
  );
  return (
    <CometChatContext.Provider {...{ value }}>
      {children}
    </CometChatContext.Provider>
  );
};
