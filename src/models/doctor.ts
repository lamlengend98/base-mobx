import Config from 'react-native-config';
import { action, computed, decorate, observable } from 'mobx';
import { NetworkService } from '@/services';
import { API_CONFIG } from '@/services/constants';
import { CallInfo } from '@/tools/agora/types';
import { getErrorString } from '@/utils';
import {
  mapDoctorInfo,
  mapDoctorInfoDetail,
  mappingStatusHelper,
} from '@/utils/doctor.helper';
import {
  DoctorInfo,
  InfoDoctorCall,
  Pagination,
  StatusDoctor,
  UpdateStatusCall,
} from './types';

export class Doctor extends NetworkService {
  doctors: DoctorInfo[] = [];
  pagination?: Pagination;
  doctor?: DoctorInfo;
  infoCall?: InfoDoctorCall;
  statusDoctor?: StatusDoctor;

  constructor() {
    super();
  }

  get doctorsInfo() {
    return mapDoctorInfo(this.doctors);
  }

  get doctorsInfoDetail() {
    if (this.doctor) {
      return mapDoctorInfoDetail(this.doctor!);
    }
  }

  get isLoading() {
    return this.serviceStatus.loading;
  }

  get isLoadingCall() {
    return this.serviceStatus.loading && !this.infoCall;
  }

  async getDoctors() {
    try {
      const { promise } = this.get(API_CONFIG.DOCTORS);
      const info = await promise;
      this.doctors = info.data;
      this.pagination = info?.meta;
      return true;
    } catch (error) {
      throw getErrorString(error?.data?.error);
    }
  }

  async bookingAppointment(data) {
    try {
      const { promise } = this.post(API_CONFIG.APPOINTMENTS, data, {
        useLoadGlobal: true,
        isAuth: true,
      });
      await promise;
      return true;
    } catch (error) {
      throw getErrorString(error?.data?.error);
    }
  }

  async getDoctorDetail(id: number) {
    try {
      this.doctor = undefined;
      const { promise } = this.get(API_CONFIG.DOCTOR + `/${id}`);
      const info = await promise;
      this.doctor = info.data;
      return this.doctor;
    } catch (error) {
      throw getErrorString(error?.data?.error);
    }
  }

  async getDoctorConsultation(id: number) {
    try {
      this.doctor = undefined;
      const { promise } = this.get(
        API_CONFIG.DOCTOR,
        {
          user_id: id,
        },
        {
          newEndpoint: Config.ENDPOINT_SERVICES_CMS,
          useLoadGlobal: true,
          isAuth: true,
        },
      );
      const info = await promise;
      return info?.data?.doctor;
    } catch (error) {
      throw getErrorString(error?.data?.error);
    }
  }

  async callDoctor(receiverId: number): Promise<InfoDoctorCall> {
    try {
      this.infoCall = undefined;
      const { promise } = this.post(
        API_CONFIG.START_CALL,
        { receiverId },
        {
          newEndpoint: Config.ENDPOINT_SERVICES,
          isAuth: true,
          useSecret: false,
          useDeviceId: false,
        },
      );
      const info = await promise;
      this.infoCall = info;
      return info;
    } catch (error) {
      throw getErrorString(error?.data);
    }
  }

  async stopCallDoctor(
    channelToken: string,
    channelName: string,
  ): Promise<CallInfo> {
    try {
      this.infoCall = undefined;
      const { promise } = this.post(
        API_CONFIG.STOP_CALL,
        { channelToken, channelName },
        {
          newEndpoint: Config.ENDPOINT_SERVICES,
          isAuth: true,
          useSecret: false,
          useDeviceId: false,
          useLoadGlobal: true,
        },
      );
      const info = await promise;
      this.infoCall = info;
      return info;
    } catch (error) {
      throw getErrorString(error?.data);
    }
  }

  async updateCallStatus(
    status: keyof typeof UpdateStatusCall,
    channelToken: string,
  ): Promise<any> {
    try {
      const { promise } = this.patch(
        API_CONFIG.UPDATE_CALL,
        { status, channelToken },
        {
          newEndpoint: Config.ENDPOINT_SERVICES,
          isAuth: true,
          useSecret: false,
          useDeviceId: false,
        },
      );
      const info = await promise;
      return info;
    } catch (error) {
      throw getErrorString(error?.data?.error);
    }
  }

  async searchDoctor(keyword: string): Promise<any> {
    try {
      const { promise } = this.get(
        API_CONFIG.SEARCH_DOCTOR,
        { keyword },
        {
          newEndpoint: Config.ENDPOINT_API,
          isAuth: true,
          useSecret: false,
          useDeviceId: false,
          isServices: true,
        },
      );
      const info = await promise;
      return info?.data;
    } catch (error) {
      throw getErrorString(error?.data?.error);
    }
  }

  async getUserDoctor(id: number) {
    try {
      const { promise } = this.get(
        API_CONFIG.USER_STATUS + `/${id}`,
        {},
        {
          newEndpoint: Config.ENDPOINT_SERVICES,
          isAuth: true,
        },
      );
      const info = await promise;
      console.log('toJS(info)', info);
      const statusDoctor = mappingStatusHelper(info);
      this.statusDoctor = statusDoctor;
      return statusDoctor;
    } catch (error) {
      console.log('error', error);

      throw error;
    }
  }
}

decorate(Doctor, {
  doctors: observable,
  doctor: observable,
  infoCall: observable,
  pagination: observable,
  serviceStatus: observable,
  statusDoctor: observable,
  getDoctors: action,
  getDoctorDetail: action,
  bookingAppointment: action,
  searchDoctor: action,
  getUserDoctor: action,
  getDoctorConsultation: action,
  isLoadingCall: computed,
  doctorsInfoDetail: computed,
  doctorsInfo: computed,
  isLoading: computed,
});

export type DoctorType = Doctor;
