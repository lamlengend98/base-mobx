import { ReactNode } from 'react';
import RtcEngine from 'react-native-agora';
import { DoctorInfo } from '@/models/types';
import { Sender } from '../network/types';
import { CallingStatus } from './calling/types';

export type AgoraProviderProps = {
  children: ReactNode;
};

export type AgoraLocalStore = {
  isVisible: boolean;
  engine?: RtcEngine;
  appId?: string;
  channelName?: string;
  joinSucceed: boolean;
  peerIds: number[];
  callStatus: keyof typeof CallingStatus;
  infoCall?: {
    token: string | null;
    channelName: string | null;
    optionalInfo?: string | null;
    optionalUid?: number;
    uuid?: string | null;
    sender?: Sender;
  };
  stopCall?: CallInfo;
  doctor?: DoctorInfo;
  isLoading: boolean;
  hasTimeoutCall: boolean;
};

export enum TYPE_CALL {
  VIDEO,
  AUDIO,
}
export type CallInfo = {
  callbackCallId: string | null;
  channelName: string;
  createdAt: string;
  expireDate: number;
  id: string;
  isCallback: boolean;
  isFromPatient: boolean;
  receiverId: string;
  receiverToken: string;
  senderId: string;
  senderToken: string;
  status: string;
  updatedAt: string;
};

export type DataCall = {
  type: TYPE_CALL;
  infoJoin: {
    token: string | null;
    channelName: string;
    optionalInfo: string | null;
    optionalUid: number;
    uuid?: string;
    sender?: Sender;
  };
  timeoutCall?: boolean;
};
export type AgoraContextValue = {
  startCall: (data: DataCall) => Promise<void>;
  endCall: () => void;
  changeIsJoinSucceed: (bool: boolean) => void;
  changeCallStatus: (status: CallingStatus) => void;
  changeIsVisible: (bool: boolean) => void;
  changeInfoCall: (infoCall: AgoraLocalStore['infoCall']) => void;
  changeStopCall: (stopCall: CallInfo) => void;
};

export type CallActionsProps = {
  onPressBluetooth: () => void;
  onPressPause: () => void;
  onPressMic: () => void;
  onPressSound: () => void;
  onPressStopPhone: () => void;
  joinSucceed: boolean;
  callStatus: keyof typeof CallingStatus;
  hasTimeoutCall: boolean;
};
