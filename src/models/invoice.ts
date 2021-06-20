import Config from 'react-native-config';
import { action, decorate, observable, toJS } from 'mobx';
import { NetworkService } from '@/services';
import { API_CONFIG } from '@/services/constants';
import { InvoiceInfo, InvoiceListResponse, PaginationParam } from './types';

export class Invoice extends NetworkService {
  constructor() {
    super();
  }
  invoiceInfo?: InvoiceInfo;
  invoiceLst?: InvoiceListResponse;

  async getInvoices(data: PaginationParam) {
    try {
      const config = {
        newEndpoint: Config.ENDPOINT_SERVICES,
        isAuth: true,
        useSecret: false,
        useDeviceId: false,
        useLoadGlobal: true,
      };
      if (data.loadMore) config.useLoadGlobal = false;
      const { promise } = this.get(API_CONFIG.INVOICE, data, config);
      const info = await promise;
      console.log('toJS(info).getInvoices', toJS(info));
      this.invoiceLst = toJS(info);
      return true;
    } catch (error) {
      console.log('error', error);
      return false;
    }
  }
}
decorate(Invoice, {
  invoiceInfo: observable,
  invoiceLst: observable,
  getInvoices: action,
});
