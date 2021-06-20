import { ACTION_TYPES } from '@/components/items/item-notification/constants';
import { NotificationResponse } from '@/models/types';

export interface NotificationProps {
  item?: NotificationResponse;
  onActionPress?: (
    item: NotificationResponse,
    type: keyof typeof ACTION_TYPES,
  ) => void;
}
