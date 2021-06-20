import { action, decorate, observable } from 'mobx';
import { persist } from 'mobx-persist';
import { LOCALIZATION_CONFIG, SUPPORTED_LOCALES } from '@/utils';

export class AppState {
  locale = LOCALIZATION_CONFIG.vi.default;
  isShowLoading = false;
  isShowSplash = true;

  changeIsShowSplash = (bool: boolean) => {
    this.isShowSplash = bool;
  };

  changeLocale = (locale: SUPPORTED_LOCALES) => {
    if (LOCALIZATION_CONFIG?.[locale]) {
      this.locale = locale;
    } else {
      console.warn(
        'changeLocale received locale that is not supported by LOCALIZATION_CONFIG for current region',
      );
    }
  };

  setIsShowLoading(isShowLoading) {
    this.isShowLoading = isShowLoading;
  }
}

decorate(AppState, {
  locale: [persist('object') as any, observable],
  changeLocale: action,
  changeIsShowSplash: action,
  setIsShowLoading: action,
  isShowLoading: observable,
  isShowSplash: observable,
});

export type AppStateType = AppState;
