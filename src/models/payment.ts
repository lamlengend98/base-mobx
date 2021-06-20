import Config from 'react-native-config';
import { action, computed, decorate, observable, toJS } from 'mobx';
import { NetworkService } from '@/services';
import { API_CONFIG } from '@/services/constants';
import { WalletInfo } from './object';
import {
  CreditCardInfo,
  InvoiceInfo,
  Options,
  TransactionParam,
  TransactionResponse,
} from './types';

export class Payment extends NetworkService {
  payment: Payment[] = [];
  amount = '';
  wallet?: WalletInfo = new WalletInfo();
  creditCard!: Array<CreditCardInfo>;
  invoiceInfo?: InvoiceInfo;
  listTopUpTransaction!: TransactionResponse;

  constructor() {
    super();
  }

  async getWallet() {
    try {
      const { promise } = this.get(
        API_CONFIG.WALLET,
        {},
        {
          newEndpoint: Config.ENDPOINT_SERVICES,
          isAuth: true,
        },
      );
      const info = await promise;

      this.wallet = info;
      return true;
    } catch (error) {
      return false;
    }
  }

  get isLoading() {
    return this.serviceStatus.loading;
  }

  async getCard(noLoading?: boolean) {
    try {
      const config: Options = {
        newEndpoint: Config.ENDPOINT_SERVICES,
        isAuth: true,
        useSecret: false,
        useDeviceId: false,
      };
      if (!noLoading) {
        config.useLoadGlobal = true;
      }
      const { promise } = this.get(API_CONFIG.ADD_CARD, {}, config);
      const info = await promise;
      this.creditCard = toJS(info);
      return true;
    } catch (error) {
      return false;
    }
  }

  async addCard(data: any) {
    try {
      const { promise } = this.post(API_CONFIG.ADD_CARD, data, {
        newEndpoint: Config.ENDPOINT_SERVICES,
        isAuth: true,
        useLoadGlobal: true,
        useSecret: false,
        useDeviceId: false,
      });
      const info = await promise;
      return true;
    } catch (error) {
      return false;
    }
  }

  async addTopUp(data: any) {
    try {
      const { promise } = this.post(API_CONFIG.TOP_UP, data, {
        newEndpoint: Config.ENDPOINT_SERVICES,
        isAuth: true,
        useSecret: false,
        useDeviceId: false,
        useLoadGlobal: true,
      });
      const info = await promise;
      return true;
    } catch (error) {
      return false;
    }
  }

  async deleteCard(data: any) {
    try {
      const { promise } = this.delete(API_CONFIG.ADD_CARD, data, {
        newEndpoint: Config.ENDPOINT_SERVICES,
        isAuth: true,
        useSecret: false,
        useDeviceId: false,
        useLoadGlobal: true,
      });
      const info = await promise;
      return true;
    } catch (error) {
      return false;
    }
  }

  async getAllTransaction(data: TransactionParam) {
    try {
      const { promise } = this.get(API_CONFIG.TRANSACTION, data, {
        newEndpoint: Config.ENDPOINT_SERVICES,
        isAuth: true,
        useLoadGlobal: true,
      });
      const info = await promise;
      this.listTopUpTransaction = info;
      return true;
    } catch (error) {
      return false;
    }
  }

  setAmount(amount: any) {
    try {
      this.amount = amount;
    } catch (error) {}
  }
}
decorate(Payment, {
  addCard: action,
  amount: observable,
  setAmount: action,
  getWallet: action,
  wallet: observable,
  creditCard: observable,
  isLoading: computed,
  getCard: action,
  addTopUp: action,
  payment: observable,
  serviceStatus: observable,
  getAllTransaction: action,
  deleteCard: action,
  invoiceInfo: observable,
  listTopUpTransaction: observable,
});
