import Config from 'react-native-config';
import { action, decorate, observable, toJS } from 'mobx';
import { NetworkService } from '@/services';
import { API_CONFIG } from '@/services/constants';
import { AppointmentInfo } from './types';

export class Appointment extends NetworkService {
  constructor() {
    super();
  }
  listUpcomingAppointment!: Array<AppointmentInfo>;
  listPastAppointment!: Array<AppointmentInfo>;

  get isLoading() {
    return this.serviceStatus.loading;
  }

  async getAppointmentList(id, type) {
    const url =
      (type === 'upcoming'
        ? API_CONFIG.APPOINTMENT_UPCOMING
        : API_CONFIG.APPOINTMENT_PAST) + id;
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
      console.log('toJS(info)', toJS(info));
      if (type === 'upcoming') {
        this.listUpcomingAppointment = info?.data;
      } else {
        this.listPastAppointment = info?.data;
      }
      return true;
    } catch (error) {
      return false;
    }
  }
}

decorate(Appointment, {
  getAppointmentList: action,
  listUpcomingAppointment: observable,
  listPastAppointment: observable,
});

export type AppointmentType = Appointment;
