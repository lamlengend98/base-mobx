export interface Time {
  id: string;
  day?: string;
  time: string;
  str?: string;
}

export interface TimeProps {
  item?: Time;
  isSelected?: boolean;
  onPress?: (item: Time) => void;
}
