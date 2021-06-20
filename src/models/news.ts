import Config from 'react-native-config';
import { action, computed, decorate, observable, toJS } from 'mobx';
import { NetworkService } from '@/services';
import { API_CONFIG } from '@/services/constants';
import { Category } from '@/types/category';

export class News extends NetworkService {
  constructor() {
    super();
  }
  listNews?: Array<Category>;

  get isLoading() {
    return this.serviceStatus.loading;
  }

  async getNews() {
    try {
      const { promise } = this.get(
        API_CONFIG.NEWS,
        {},
        {
          newEndpoint: Config.ENDPOINT_API,
          isAuth: true,
          useLoadGlobal: true,
        },
      );
      const info = await promise;
      console.log('toJS(info).getNews', toJS(info));
      this.listNews = info?.data;
      return true;
    } catch (error) {
      return false;
    }
  }
}

decorate(News, {
  getNews: action,
  listNews: observable,
  isLoading: computed,
});

export type NewsType = News;
