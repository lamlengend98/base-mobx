import { InvoiceInfo } from '@/models/types';

export type InvoiceProps = {
  item: InvoiceInfo;
  onPress?: (item: InvoiceInfo) => void;
};
