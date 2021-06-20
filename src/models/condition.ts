import Config from 'react-native-config';
import _ from 'lodash';
import { action, computed, decorate, observable, toJS } from 'mobx';
import {
  MedicalHistoryDetail,
  MedicalHistoryParam,
  Sympton,
  SymptonDetail,
} from '@/screens/pre-consultation/type';
import { NetworkService } from '@/services';
import { API_CONFIG } from '@/services/constants';
import { Options } from './types';

export class Condition extends NetworkService {
  symptons!: Sympton[];
  symptonDetails!: SymptonDetail[];
  note!: string;
  choicedSymtons!: Sympton[];
  choicedSymtonDetails!: SymptonDetail[];
  medicalHistoryDetail!: MedicalHistoryDetail;
  chosenHeight?: number;
  chosenWeight?: number;

  constructor() {
    super();
    this.setInitState();
  }

  setInitState() {
    this.symptons = [];
    this.symptonDetails = [];
    this.choicedSymtonDetails = [];
    this.choicedSymtons = [];
    this.note = '';
  }

  get isLoading() {
    return this.serviceStatus.loading;
  }

  setText(text: string) {
    this.note = text;
  }

  setChoicedSymton(sympton: Sympton[]) {
    this.choicedSymtons = sympton;
  }

  setChoicedSymtonDetails(choicedSymtonDetails: SymptonDetail[]) {
    this.choicedSymtonDetails = choicedSymtonDetails;
  }

  // lấy ra tất cả triệu chứng
  async getSymptons() {
    try {
      const { promise } = this.get(
        API_CONFIG.SYMPTON,
        {},
        {
          newEndpoint: Config.ENDPOINT_SERVICES,
          isAuth: true,
          useLoadGlobal: true,
        },
      );
      const info = await promise;
      this.symptons = info;
    } catch (error) {
      throw error;
    }
  }

  // lấy ra tất cả triệu chứng chi tiết
  async getSymptonDetails(symptomId: number) {
    try {
      const { promise } = this.get(
        API_CONFIG.SYMPTON_DETAIL,
        { symptomId },
        {
          newEndpoint: Config.ENDPOINT_SERVICES,
          isAuth: true,
          isServices: true,
        },
      );
      const info = await promise;
      this.symptonDetails = _.uniqBy(this.symptonDetails.concat(info), (e) => {
        return e.id;
      });
    } catch (error) {
      throw error;
    }
  }

  // gửi thông tin tư vấn
  async submitConsultation() {
    const { note } = this;
    const symptomIds = _.map(this.choicedSymtons, 'id');
    const symptomDetailIds = _.map(this.choicedSymtonDetails, 'id');
    try {
      const { promise } = this.post(
        API_CONFIG.PRE_CONSULTATION,
        { note, symptomIds, symptomDetailIds },
        {
          newEndpoint: Config.ENDPOINT_SERVICES,
          isAuth: true,
        },
      );
      const info = await promise;
    } catch (error) {
      throw error;
    }
  }

  // gửi thông tin review
  async submitReview(content, rating, callId) {
    try {
      const { promise } = this.post(
        API_CONFIG.REVIEW,
        { content, rating, callId },
        {
          newEndpoint: Config.ENDPOINT_SERVICES,
          isAuth: true,
        },
      );
      const info = await promise;
    } catch (error) {
      throw error;
    }
  }
  async getMedicalHistory(noLoading?: boolean) {
    try {
      const config: Options = {
        newEndpoint: Config.ENDPOINT_SERVICES,
        isAuth: true,
      };
      if (!noLoading) {
        config.useLoadGlobal = true;
      }
      const { promise } = this.get(API_CONFIG.MEDICAL_HISTORY, {}, config);
      const info = await promise;
      this.medicalHistoryDetail = info;
      this.chosenHeight = info.height;
      this.chosenWeight = info.weight;
      this.choicedSymtons = info.symptoms;
    } catch (error) {
      throw error;
    }
  }
  // gửi thông tin cân nặng, chiều cao bênh nhân
  async saveMedicalHistory(param: MedicalHistoryParam) {
    try {
      const { promise } = this.patch(API_CONFIG.MEDICAL_HISTORY, param, {
        newEndpoint: Config.ENDPOINT_SERVICES,
        isAuth: true,
        useLoadGlobal: true,
      });
      const info = await promise;
      this.medicalHistoryDetail = info;
      return true;
    } catch (error) {
      return false;
    }
  }

  setHeight(height: number) {
    try {
      this.chosenHeight = height;
    } catch (error) {}
  }

  setWeight(weight: number) {
    try {
      this.chosenWeight = weight;
    } catch (error) {}
  }

  reset() {
    this.setInitState();
  }
}

decorate(Condition, {
  symptons: observable,
  symptonDetails: observable,
  choicedSymtons: observable,
  note: observable,
  getSymptons: action,
  getSymptonDetails: action,
  setText: action,
  setChoicedSymton: action,
  setChoicedSymtonDetails: action,
  submitConsultation: action,
  reset: action,
  isLoading: computed,
  medicalHistoryDetail: observable,
  chosenHeight: observable,
  chosenWeight: observable,
  getMedicalHistory: action,
  setHeight: action,
  setWeight: action,
});

export type ConditionType = Condition;
