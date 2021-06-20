import Config from 'react-native-config';
import { action, computed, decorate, observable, toJS } from 'mobx';
import { NetworkService } from '@/services';
import { API_CONFIG } from '@/services/constants';
import {
  CallListParam,
  CallListResponse,
  ChatListResponse,
  PaginationParam,
} from './types';

export class Contact extends NetworkService {
  constructor() {
    super();
  }
  listChat?: ChatListResponse;
  listCallBack?: CallListResponse;

  get isLoading() {
    return this.serviceStatus.loading;
  }

  setChatList(list?: ChatListResponse) {
    this.listChat = list;
  }

  async getChatList(data: PaginationParam) {
    try {
      const config = {
        newEndpoint: Config.ENDPOINT_SERVICES,
        isAuth: true,
        useLoadGlobal: true,
      };
      if (data.loadMore) config.useLoadGlobal = false;
      const { promise } = this.get(API_CONFIG.CHAT_LIST, data, config);
      const info = await promise;
      console.log('toJS(info)', toJS(info));
      this.listChat = info;
      return true;
    } catch (error) {
      return false;
    }
  }
  async getListCallBack(data: CallListParam) {
    try {
      const config = {
        newEndpoint: Config.ENDPOINT_SERVICES,
        isAuth: true,
        useLoadGlobal: true,
      };
      if (data.loadMore) config.useLoadGlobal = false;
      const { promise } = this.get(API_CONFIG.CALL_BACK, data, config);
      const info = await promise;
      console.log('toJS(info)', toJS(info));
      this.listCallBack = info;
      return true;
    } catch (error) {
      return false;
    }
  }
}

decorate(Contact, {
  getChatList: action,
  getListCallBack: action,
  setChatList: action,
  listChat: observable,
  listCallBack: observable,
  isLoading: computed,
});

export type ContactType = Contact;
