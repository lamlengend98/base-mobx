export interface Date {
  id?: string;
  dayOfWeek: string;
  dayOfMonth: string;
  month: string;
  str?: string;
  date: string;
}

export interface DateProps {
  item?: Date;
  isSelected?: boolean;
  onPress?: (item: Date) => void;
}
