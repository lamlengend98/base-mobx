import Config from 'react-native-config';
import { action, decorate, observable } from 'mobx';
import { persist } from 'mobx-persist';
import { NetworkService } from '@/services';
import { API_CONFIG } from '@/services/constants';
import { mapSpecility } from '@/utils';
import { mapTopReviewDoctor } from '@/utils/doctor.helper';
import { login } from './dataAuth';
import { ClinicInfo, DoctorClinic, Specialities, TopReview } from './types';

export class Clinic extends NetworkService {
  constructor() {
    super();
  }

  isAuthInvite = false;
  doctorToken?: string;
  clinicInfo!: Array<ClinicInfo>;
  clinicDoctorsInfo: DoctorClinic[] = [];
  choicedDoctor!: DoctorClinic;
  specialties: Specialities[] = [];
  topReviewDoctors: TopReview[] = [];
  chosenDoctorId?: number;
  loadingTopReview?: boolean;

  setChoicedDoctor(choicedDoctor: DoctorClinic) {
    this.choicedDoctor = choicedDoctor;
  }

  setChosenDoctorId(doctorId: number) {
    this.chosenDoctorId = doctorId;
  }

  async checkRegisterStatus(user_id: number) {
    try {
      const url = API_CONFIG.REGISTER_STATUS + '?user_id=' + user_id;
      const { promise } = this.get(
        url,
        {},
        {
          newEndpoint: Config.ENDPOINT_SERVICES_CMS,
          useLoadGlobal: true,
        },
      );
      const info = await promise;
      if (info?.status === 'success') {
        return true;
      }
    } catch (error) {
      return false;
    }
  }

  async getAccessTokenDoctor() {
    try {
      const { promise } = this.post(API_CONFIG.LOGIN_DOCTOR, login, {
        newEndpoint: Config.ENDPOINT_SERVICES_CMS,
      });
      const info = await promise;
      if (info?.status === 'ok') {
        this.doctorToken = info?.token;
      }
      return true;
    } catch (error) {
      return error?.data?.error;
    }
  }

  setAuthInviteStatus(isInvited) {
    this.isAuthInvite = isInvited;
  }

  async confirmInviteCode(data) {
    try {
      const { promise } = this.post(API_CONFIG.PATIENT_SIGN_UP, data, {
        newEndpoint: Config.ENDPOINT_SERVICES_CMS,
        isAuth: true,
        token65Doctor: this.doctorToken,
      });
      const info = await promise;
      if (info.status === 'success') {
        this.setAuthInviteStatus(true);
      }
      return true;
    } catch (error) {
      return false;
    }
  }

  async getAllClinics(id) {
    const url = API_CONFIG.CLINIC + '?user_id=' + id;
    try {
      const { promise } = this.get(
        url,
        {},
        {
          newEndpoint: Config.ENDPOINT_SERVICES_CMS,
          isAuth: true,
          useSecret: true,
          useLoadGlobal: true,
          token65Doctor: this.doctorToken,
        },
      );
      const info = await promise;
      this.clinicInfo = info.clinics;
      return true;
    } catch (error) {
      console.log('error', error);

      return false;
    }
  }

  async getClinic(id) {
    const url = API_CONFIG.CLINIC_DOCTORS + '?clinic_id=' + id;
    try {
      const { promise } = this.get(
        url,
        {},
        {
          newEndpoint: Config.ENDPOINT_SERVICES_CMS,
          isAuth: true,
          useSecret: true,
          useLoadGlobal: true,
          token65Doctor: this.doctorToken,
        },
      );
      const info = await promise;
      console.log('info.getClinic', info);
      if (info?.status === 'ok') {
        this.clinicDoctorsInfo = info?.data?.doctors;
      }
      return true;
    } catch (error) {
      console.log('error', error);

      return false;
    }
  }

  async getSpecialties(id?: number, isGetAll = true) {
    const url = API_CONFIG.SPECIALTIES + (id ? `/${id}` : '');

    try {
      const { promise } = this.get(
        url,
        {},
        {
          newEndpoint: Config.ENDPOINT_API,
          isAuth: true,
        },
      );
      const info = await promise;
      if (isGetAll) {
        this.specialties = mapSpecility(info?.data);
      }
      return info?.data;
    } catch (error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
    }
  }

  async getDoctorTopReview(id?: number) {
    const url = API_CONFIG.CLINIC_DOCTORS;
    this.loadingTopReview = true;
    try {
      const { promise } = this.get(
        url,
        { clinic_id: id, rating_order: 'DESC' },
        {
          newEndpoint: Config.ENDPOINT_SERVICES_CMS,
          isAuth: true,
          token65Doctor: this.doctorToken,
        },
      );
      const info = await promise;
      console.log(
        `🛠 LOG: 🚀 --> --------------------------------------------------------------------------------------`,
      );
      console.log(
        `🛠 LOG: 🚀 --> ~ file: clinic.ts ~ line 170 ~ Clinic ~ getDoctorTopReview ~ info`,
        info,
      );
      console.log(
        `🛠 LOG: 🚀 --> --------------------------------------------------------------------------------------`,
      );

      this.topReviewDoctors = mapTopReviewDoctor(info?.data?.doctors);
    } catch (error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
    } finally {
      this.loadingTopReview = false;
    }
  }
}
decorate(Clinic, {
  isAuthInvite: [persist('object') as any, observable],
  doctorToken: [persist('object') as any, observable],
  clinicDoctorsInfo: observable,
  clinicInfo: observable,
  choicedDoctor: observable,
  loadingTopReview: observable,
  getAllClinics: action,
  getAccessTokenDoctor: action,
  setChoicedDoctor: action,
  confirmInviteCode: action,
  getSpecialties: action,
  getDoctorTopReview: action,
});
