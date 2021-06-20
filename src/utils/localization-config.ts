import { Translation } from '@/types/translates';
import { SUPPORTED_LOCALES } from './constants';

export const LOCALIZATION_CONFIG = {
  vi: {
    msgs: () => require('@/localization/vi.json') as Translation,
    default: SUPPORTED_LOCALES.vi,
    supported: [SUPPORTED_LOCALES.vi],
  },
  en: {
    msgs: () => require('@/localization/en.json') as Translation,
    default: SUPPORTED_LOCALES.en,
    supported: [SUPPORTED_LOCALES.en],
  },
};
