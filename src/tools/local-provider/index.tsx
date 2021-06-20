/* eslint-disable simple-import-sort/sort */
// import moment from 'moment';
import React from 'react';
import { IntlProvider } from 'react-intl';
import 'moment/locale/en-ie';
// import 'moment/locale/vi';
import { SUPPORTED_LOCALES, LOCALIZATION_CONFIG } from '@/utils';
import { LocaleProviderProps } from './types';

export const LocaleProvider = ({ children }: LocaleProviderProps) => {
  return (
    <IntlProvider
      locale={SUPPORTED_LOCALES.vi}
      messages={LOCALIZATION_CONFIG.vi.msgs()}>
      {children}
    </IntlProvider>
  );
};
