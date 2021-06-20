import { action, computed, decorate, observable } from 'mobx';
import { persist } from 'mobx-persist';
import { AreaCodeProps } from '@/screens/login-phone/types';
import { NetworkService } from '@/services';
import { API_CONFIG } from '@/services/constants';
import { mapperAreacode } from '@/utils';
import {
  AuthInfoLogged,
  AuthInitInfo,
  AuthInitValues,
  PatientInfoProfile,
} from './types';

export class Auth extends NetworkService {
  data: AuthInitInfo = {} as AuthInitInfo;
  infoLogged?: AuthInfoLogged;
  infoDetail!: PatientInfoProfile;
  isAuth?: boolean;
  areacodes: AreaCodeProps[] = [];

  initialValues: AuthInitValues = {
    phoneCode: '84',
    phoneNumber: '',
    areCodeId: '271',
  };
  area_code_id: any;

  get isLoading() {
    return this.serviceStatus.loading;
  }

  clearInfo() {
    this.initialValues = {
      phoneCode: '84',
      phoneNumber: '',
      areCodeId: '271',
    };
  }

  async loginPhone() {
    try {
      const {
        areCodeId: area_code_id,
        phoneNumber: phone,
      } = this.initialValues;
      const { promise } = this.post(
        API_CONFIG.LOGIN,
        {
          area_code_id,
          phone,
        },
        { useDeviceId: true, useSecret: true },
      );
      const info = await promise;
      this.infoDetail = info;
      return info;
    } catch (error) {
      return error?.data?.error;
    }
  }

  async getAreaCodes() {
    try {
      const { promise } = this.get(
        API_CONFIG.AREA_CODE,
        {},
        {
          useLoadGlobal: false,
          isServices: true,
        },
      );
      const info = await promise;

      this.areacodes = mapperAreacode(info.data);
      return this.areacodes;
    } catch (error) {
      return error?.data?.error;
    }
  }

  async getWelcomeText(token65Doctor: string) {
    try {
      const { promise } = this.get(
        API_CONFIG.WELCOME_TEXT,
        {},
        { useDeviceId: true, isAuth: true, useLoadGlobal: true, token65Doctor },
      );
      const info = await promise;

      return info;
    } catch (error) {
      return error?.data?.error;
    }
  }

  async verifyOTP(activation_code: string) {
    try {
      const {
        areCodeId: area_code_id,
        phoneNumber: phone,
      } = this.initialValues;
      const { promise } = this.post(
        API_CONFIG.VERIFY_OTP,
        {
          activation_code,
          area_code_id,
          phone,
        },
        { useDeviceId: true, useSecret: true },
      );
      console.log('(await promise)', await promise);

      this.data = (await promise)?.data || {};
      this.infoDetail.data = (await promise)?.data || {};
      const info = await this.getAccessToken();
      return info;
    } catch (error) {
      throw Error(error?.data?.error);
    }
  }

  setInfoLogged(infoLogged) {
    this.infoLogged = infoLogged;
  }

  async getAccessToken() {
    try {
      const {
        areCodeId: area_code_id,
        phoneNumber: phone,
      } = this.initialValues;
      const { promise } = this.post(
        API_CONFIG.ACCESS_TOKEN,
        {
          grant_type: 'password',
          area_code_id,
          phone,
        },
        { useDeviceId: true, useSecret: true },
      );
      this.clearInfo();
      const info = await promise;
      return info;
    } catch (error) {
      return error?.data?.error;
    }
  }

  async resendOTP() {
    const { areCodeId: area_code_id, phoneNumber: phone } = this.initialValues;
    try {
      const { promise } = this.post(
        API_CONFIG.RESET_ACTIVATION,
        { area_code_id, phone },
        { useDeviceId: true, useSecret: true },
      );
      const info = await promise;
      return info;
    } catch (error) {
      return error?.data?.error;
    }
  }
  async logout() {
    try {
      const { promise } = this.post(
        API_CONFIG.LOGOUT,
        {},
        { useDeviceId: true, isAuth: true, useLoadGlobal: true },
      );
      const info = await promise;
      if (info) {
        this.infoLogged = undefined;
        this.data = {} as any;
      }
      return info;
    } catch (error) {
      return error?.data?.error;
    }
  }

  async updateInfo(infoDetail: PatientInfoProfile) {
    try {
      this.infoDetail = infoDetail;
    } catch (error) {}
  }
}

decorate(Auth, {
  data: [persist('object') as any, observable],
  initialValues: observable,
  clearInfo: action,
  verifyOTP: action,
  loginPhone: action,
  getAccessToken: action,
  setInfoLogged: action,
  getAreaCodes: action,
  getWelcomeText: action,
  isLoading: computed,
  infoLogged: [persist('object') as any, observable],
  infoDetail: [persist('object') as any, observable],
  serviceStatus: observable,
});

export type AuthType = Auth;
