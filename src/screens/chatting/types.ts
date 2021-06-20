export enum MessageTypes {
  IMAGE = 'image',
  TEXT = 'text',
  AUDIO = 'audio',
}

export type UserProps = {
  id: string;
  fullName: string;
  userName: string;
  avatar: string;
};

export type MessageProps = {
  id: string;
  messageType: MessageTypes | string;
  user?: UserProps;
  msg?: string;
  time?: string;
  positions: 'LEFT' | 'RIGHT';
  isFake?: boolean;
  data?: Record<string, any> | DataMedia;
  sentAt: number;
};

export type DataMedia = {
  attachments: { url: string }[];
  category: string;
  entities: any;
  resource: string;
  type: string;
  url: string;
  customData: any;
};

export type SliderAudioProps = {
  positions: 'LEFT' | 'RIGHT';
  data?: Record<string, any> | DataMedia;
};

export enum SEND_TYPE {
  MEDIA,
  TEXT,
  IMAGE,
  VIDEO,
}

export const ERROR_IMAGE = {
  E_PICKER_CANCELLED: 'E_PICKER_CANCELLED',
};
