import { ReactNode } from 'react';
import { NetInfoState } from '@react-native-community/netinfo';

export type NetInfo = {
  ws?: WebSocket;
  netInfoState?: NetInfoState;
  ids?: {
    pushToken: string;
    userId: string;
  };
  infoCall?: {
    token: string;
    channelName: string;
    uid: string;
    uuid: string;
    sender: Sender;
  };
  voip?: {
    token: string;
  };
};

export type NetInfoProvider = {
  children: ReactNode;
  value: NetInfo;
};

export const TYPE_CALL_DEVICE = {
  START_CALL: 1,
  STOP_CALL: 0,
  NOTIFICATION: 2,
  CHAT: 3,
};

export const TYPE_CALL_ACTION = {
  ANSWER_CALL: 1,
  DECLINE_CALL: 0,
  CLICK_CALL: 2,
};

export type Sender = {
  phone?: string;
  gender?: number;
  firstName?: string;
  id?: string;
  image?: string;
  email?: string;
  role_id?: number;
  lastName?: string;
};
