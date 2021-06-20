import Config from 'react-native-config';
import Axios from 'axios';
import jp from 'jsonpath';
import { action, decorate, observable, toJS } from 'mobx';
import { NetworkService } from '@/services';
import { API_CONFIG } from '@/services/constants';
import {
  AuthInfoLogged,
  AuthInitInfo,
  PatientInfoProfile,
  ProfileInitValues,
} from './types';

export class UserProfile extends NetworkService {
  data: AuthInitInfo = {} as AuthInitInfo;
  infoLogged?: AuthInfoLogged;
  patientProfile!: PatientInfoProfile;

  initialValues: ProfileInitValues = {
    firstName: '',
    lastName: '',
    dobDay: '',
    dobMonth: '',
    dobYear: '',
    gender: '',
    email: '',
    avatar: '',
  };

  get isLoading() {
    return this.serviceStatus.loading;
  }

  clearInfo() {
    this.data = {} as AuthInitInfo;
    this.initialValues = {
      firstName: '',
      lastName: '',
      dobDay: '',
      dobMonth: '',
      dobYear: '',
      gender: '',
      email: '',
      avatar: '',
    };
  }

  async updateProfile() {
    return true;
  }

  async getProfile(id: number) {
    try {
      const url = API_CONFIG.PROFILE + id;
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
      this.patientProfile = info;
      return true;
    } catch (error) {
      return false;
    }
  }
  async postProfile(id: number, body: any) {
    try {
      const url = API_CONFIG.PROFILE + id;
      const { promise } = this.post(url, body, {
        newEndpoint: Config.ENDPOINT_API,
        isAuth: true,
        useLoadGlobal: true,
      });
      const info = await promise;
      this.patientProfile = info;
      console.log('info', toJS(info));
      return {
        ...info,
        status: true,
      };
    } catch (error) {
      return false;
    }
  }

  async postProfileWithAvatar(id: number, form_data: FormData, token = '') {
    try {
      const url = Config.ENDPOINT_API + API_CONFIG.PROFILE + id;
      const promise = Axios({
        method: 'post',
        url: url,
        data: form_data,
        headers: {
          'content-type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      const info = await promise;
      console.log('info', toJS(info));
      this.patientProfile = info?.data;
      return {
        ...info,
        status: true,
      };
    } catch (error) {
      console.log('error', error);

      return false;
    }
  }
}

decorate(UserProfile, {
  data: observable,
  initialValues: observable,
  clearInfo: action,
  getProfile: action,
  postProfileWithAvatar: action,
  serviceStatus: observable,
  patientProfile: observable,
});

export type UserProfileType = UserProfile;
