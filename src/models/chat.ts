import Config from 'react-native-config';
import { action, computed, decorate, observable } from 'mobx';
import { NetworkService } from '@/services';
import { API_CONFIG } from '@/services/constants';
import { StartChat, UpdateStatusCall } from './types';

export class Chat extends NetworkService {
  recordSecs: any;
  recordTime = '';
  currentPositionSec = 0;
  currentDurationSec = 1;
  startChatInfo!: StartChat;

  constructor() {
    super();
    this.setInitState();
  }

  setInitState = () => {
    this.recordSecs = undefined;
    this.recordTime = '';
  };

  setRecordSecs = (recordSecs: any) => {
    this.recordSecs = recordSecs;
  };

  setRecordTime = (recordTime: string) => {
    this.recordTime = recordTime;
  };

  get getRecordSecs() {
    return this.recordSecs;
  }

  get getRecordTime() {
    return this.recordTime;
  }

  async changStatusChat(chatSessionId: string, status: UpdateStatusCall) {
    try {
      const { promise } = this.patch(
        API_CONFIG.CHAT,
        { chatSessionId, status },
        {
          newEndpoint: Config.ENDPOINT_SERVICES,
          isAuth: true,
        },
      );
      const info = await promise;
    } catch (error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
      throw error;
    }
  }

  async startChat(receiverId: number) {
    try {
      const { promise } = this.post(
        API_CONFIG.START_CHAT,
        { receiverId },
        {
          newEndpoint: Config.ENDPOINT_SERVICES,
          isAuth: true,
        },
      );
      const info = await promise;
      console.log(
        `🛠 LOG: 🚀 --> ------------------------------------------------------------------------`,
      );
      console.log(
        `🛠 LOG: 🚀 --> ~ file: chat.ts ~ line 51 ~ Chat ~ startChat ~ info`,
        info,
      );
      console.log(
        `🛠 LOG: 🚀 --> ------------------------------------------------------------------------`,
      );
      this.startChatInfo = info;

      await this.changStatusChat(
        this.startChatInfo.id,
        UpdateStatusCall.PATIENT_JOINED,
      );
    } catch (error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
      throw error;
    }
  }

  async stopChat(chatSessionId: number) {
    try {
      const { promise } = this.post(
        API_CONFIG.STOP_CHAT,
        { chatSessionId },
        {
          newEndpoint: Config.ENDPOINT_SERVICES,
          isAuth: true,
        },
      );
      const info = await promise;
    } catch (error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
      throw error;
    }
  }
}

decorate(Chat, {
  recordSecs: observable,
  recordTime: observable,
  setRecordSecs: action,
  setRecordTime: action,
  startChat: action,
  getRecordSecs: computed,
  getRecordTime: computed,
});

export type ChatType = Chat;
