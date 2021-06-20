import { CallListInfo } from "@/models/types";

interface CallList {
  id: number;
  name: string;
  time: string;
  call_time: number;
  avatar: string;
}
interface CallList2 {
  id: number;
  callbackCallId: number;
  senderId: number;
  receiverId: number;
  senderToken: string;
  receiverToken: string;
  expireDate: any;
  channelName: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  isCallback: boolean;
  isFromPatient: boolean;
}

export interface CallListProps {
  item?: CallListInfo;
  onCallbackPress?: (item: CallListInfo) => void;
}
