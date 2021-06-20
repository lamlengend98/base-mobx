import Config from 'react-native-config';
import _ from 'lodash';
import { action, decorate, observable } from 'mobx';
import { NetworkService } from '@/services';
import { API_CONFIG } from '@/services/constants';
import { IsIos } from '@/utils';
import { PlayerDevice, PlayerIdOneSignal } from './types';

export class Devices extends NetworkService {
  playerDevice!: PlayerDevice;

  constructor() {
    super();
  }

  async pushDevice(normalPlayerId: string, voipPlayerId: string) {
    const platform = IsIos ? 'IOS' : 'ANDROID';
    try {
      const { promise } = this.post(
        API_CONFIG.NOTIFICATION_DEVICE,
        _.pickBy({ normalPlayerId, voipPlayerId, platform }),
        {
          newEndpoint: Config.ENDPOINT_SERVICES,
          isAuth: true,
          isServices: true,
        },
      );
      const info = await promise;
      this.playerDevice = info;
      return true;
    } catch (error) {
      throw error;
    }
  }

  async devices(playerId: string, identifier: string) {
    try {
      // const { promise } = this.get(
      //   API_CONFIG.NOTIFICATION_DEVICE,
      //   {},
      //   {
      //     newEndpoint: Config.ENDPOINT_SERVICES,
      //     isAuth: true,
      //     isServices: true,
      //   },
      // );
      const info: PlayerIdOneSignal = await this.registerPlayerId(identifier);
      this.pushDevice(playerId, info.id);

      return true;
    } catch (error) {
      throw error;
    }
  }

  async registerPlayerId(identifier: string) {
    try {
      const { promise } = this.post(
        API_CONFIG.PLAYERS,
        {
          app_id: Config.ONESIGNAL_APP_ID_VOIP,
          identifier,
          device_type: 0,
          test_type: 1,
        },
        {
          newEndpoint: Config.ENDPOINT_SERVICES_ONESIGNAL,
        },
      );
      const info: PlayerIdOneSignal = await promise;
      return info;
    } catch (error) {
      throw error;
    }
  }
}

decorate(Devices, {
  serviceStatus: observable,
  playerDevice: observable,
  devices: action,
  pushDevice: action,
});

export type DevicesType = Devices;
