import { Icon65doctor } from "@/assets";

export interface Payment {
  id: number;
  label: string;
  rightIcon?: string;
  screen: string;
}

export interface PaymentProps {
  item?: Payment;
  onPress?: (item: Payment) => void;
}
