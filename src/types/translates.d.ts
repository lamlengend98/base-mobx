import EN from '@/localization/en.json';
import VI from '@/localization/vi.json';

export type Translation = typeof EN & typeof VI;
export type TranslationKeys = keyof typeof EN & keyof typeof VI;
