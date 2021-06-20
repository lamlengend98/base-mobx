import { DoctorInfo } from '@/models/types';

export enum CallingStatus {
  CALLING = 'CALLING',
  IN_THE_CALL = 'IN_THE_CALL',
  HANG_ON = 'HANG_ON',
  BUSY_LINE = 'BUSY_LINE',
}

export type CallingProps = {
  status: keyof typeof CallingStatus;
  onPressStopPhone: () => void;
  doctor?: DoctorInfo;
  changeCallStatus?: (status: CallingStatus) => void;
  onCallback: () => void;
};
