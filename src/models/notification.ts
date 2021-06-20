import Config from 'react-native-config';
import { action, decorate, observable } from 'mobx';
import { NetworkService } from '@/services';
import { API_CONFIG } from '@/services/constants';
import { NotificationParam, NotificationTotalResponse } from './types';

export class Notification extends NetworkService {
  constructor() {
    super();
  }

  listNotification!: NotificationTotalResponse;
  listNotificationNotRead!: NotificationTotalResponse;

  get isLoading() {
    return this.serviceStatus.loading;
  }

  async getNotificationList(data: NotificationParam) {
    const url = `${API_CONFIG.NOTIFICATION}?user_type=${
      data.user_type
    }&user_id=${data.user_id}${
      typeof data.is_read === 'number' ? `&is_read=${data.is_read}` : ``
    }${typeof data.set_read === 'number' ? `&set_read=${data.set_read}` : ``}`;
    try {
      const { promise } = this.get(
        url,
        {},
        {
          newEndpoint: Config.ENDPOINT_API,
          isAuth: true,
          useLoadGlobal: true,
        },
      );
      const info = await promise;
      console.log('info.getNotificationList', info);
      this.listNotification = info;
      if (data.is_read === 0) {
        this.listNotificationNotRead = info;
      }
      return true;
    } catch (error) {
      console.log('error', error);

      return false;
    }
  }
}

decorate(Notification, {
  serviceStatus: observable,
  getNotificationList: action,
  listNotification: observable,
  listNotificationNotRead: observable,
});

export type NotificationType = Notification;
