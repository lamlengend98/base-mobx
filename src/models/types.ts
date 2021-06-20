export interface Common {
  loading: boolean;
  error: any;
}

export type AuthStatus = Common;

export interface AuthInitValues {
  phoneCode: string;
  phoneNumber: string;
  areCodeId: string;
}

export interface AuthInitInfo {
  id: number;
  name?: any;
  area_code_id: number;
  phone: string;
  email?: any;
  image?: string;
  drug_allergy?: any;
  notes?: any;
  devices?: { data: any[] };
  gender?: string;
}

export interface AuthInfoLogged {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
}

export interface ProfileInitValues {
  firstName: string;
  lastName: string;
  dobDay: string;
  dobMonth: string;
  dobYear: string;
  gender: any;
  email: string;
  avatar: string;
}

export type DoctorStatus = Common;

export interface Pagination {
  total: number;
  count: number;
  per_page: number;
  current_page: number;
  total_pages: number;
  links: any[];
}

export interface DoctorProfile {
  specialty: string;
  what_i_do: string;
  doctor_age: number;
  consultation_fee: string;
  qualifications: string;
  languages_spoken: '';
  education: string;
  awards: string;
  working_positions: string;
  accredited_hospital: string;
  insurances_accept: {
    id: number;
    name: string;
    no: number;
  }[];
}

export interface DoctorAppointment {
  data: {
    id: number;
    doctor: string;
    address: string;
    created_date: string;
    date_appointment: string;
  }[];
}

export interface DoctorAppointments {
  id: number;
  address: string;
  appointments: DoctorAppointment;
}

export interface DoctorAddresses {
  data: DoctorAppointments[];
}

export interface DoctorInfo {
  reviews?: any;
  details?: any;
  id: number;
  name: string;
  picture: string;
  rating_avg: number;
  doctor_profile: DoctorProfile;
  addresses: DoctorAddresses;
  value: string;
  phone: string;
  is_online: number;
  rating: any[];
}

export interface DoctorClinic {
  id?: number;
  name?: string;
  specialty?: string;
  registration_no?: string;
  year_experience?: number;
  photo?: string;
  _65doctor_id: number;
  rating?: any[];
  rating_avg?: number;
}

export interface PlayerDevice {
  id: string;
  userId: string;
  voipPlayerId: string;
}

export interface PlayerIdOneSignal {
  success: boolean;
  id: string;
}

export interface InfoDoctorCall {
  token: string;
  channelName: string;
  uid: string;
  paymentOption: any;
}

export enum UpdateStatusCall {
  CHANNEL_CREATED = 'CHANNEL_CREATED',
  PATIENT_JOINED = 'PATIENT_JOINED',
  DOCTOR_JOINED = 'DOCTOR_JOINED',
  CHANNEL_CLOSED = 'CHANNEL_CLOSED',
}

export interface Clinic {
  id: number;
  name: string;
  address: string;
  image: string;
  categories: string;
}

export interface PreConsultation {
  id: number;
  name: string;
  image?: string;
}

export interface WalletInfo {
  id: number;
  balance: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}
export interface CreditCardInfo {
  billing_details: BillingDetails;
  card: CardDetail;
  created: number;
  customer: string;
  id: string;
  livemode: boolean;
  metadata: object;
  object: string;
  type: string;
}
export interface BillingDetails {
  address: {
    city: string;
    country: string;
    line1: string;
    line2: string;
    postal_code: string;
    state: string;
  };
  email: string;
  name: string;
  phone: string;
}
export interface CardDetail {
  checks: {
    address_line1_check: string;
    address_postal_code_check: string;
    cvc_check: string;
  };
  brand: string;
  country: string;
  fingerprint: string;
  funding: string;
  generated_from: string;
  last4: string;
  customer: string;
  type: string;
  metadata: {};
  exp_month: number;
  exp_year: number;
  networks: {
    available: Array<string>;
    preferred: string;
  };
  three_d_secure_usage: {
    supported: true;
  };
  wallet: any;
}

export interface ClinicInfo {
  clinic_address: string;
  clinic_email: string;
  clinic_name: string;
  clinic_phone: string;
  clinic_website: string;
  clinic_avatar: string;
  clinic_review: number;
  clinic_status: string;
  id: number;
}
export interface PatientInfo {
  address: string;
  dob: string;
  email: string;
  gender: string;
  home_phone: string;
  name: string;
  nric: string;
  postal_code: string;
  tel: string;
  url: string;
}
export interface InvoiceInfo {
  id: number;
  doctorId: number;
  patientId: number;
  callId: number;
  chatSessionId: number;
  amount: string;
  note: string;
  status: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  doctor: DoctorInfoInvoice;
  patient: PatientInfoInvoice;
  details: Array<InvoiceDetail>;
}

export interface PatientInfoInvoice {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  image: string;
  gender: string;
  avatar: string;
  address: string;
}
export interface DoctorInfoInvoice {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  image: string;
  gender: string;
  avatar: string;
  address: string;
}

export interface InvoiceDetail {
  description: string;
  vat: number;
  amount: string;
}

export interface ChatListInfo {
  id: number;
  doctorId: number;
  patientId: number;
  doctor: InfoChatPartner;
  patient: InfoChatPartner;
  messageInfo: MessageInfo;
  createdAt: string;
  updatedAt: string;
}
export interface MessageInfo {
  id: number;
  unseen_number: number;
  latest_message: string;
  unseen: boolean;
  time: string;
}
export interface ChatListResponse {
  data: Array<ChatListInfo>;
  count: number;
  total: number;
}

export interface InfoChatPartner {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role_id: number;
  gender: string;
  image: string;
  phone: string;
}

export interface PaginationParam {
  page: number;
  page_size: number;
  loadMore?: boolean;
}

export interface NotificationParam {
  user_type: 'PATIENT' | 'DOCTOR';
  user_id: string | number;
  is_read?: 0 | 1;
  set_read?: 1;
}

export interface InvoiceListResponse {
  data: Array<InvoiceInfo>;
  count: number;
  total: number;
}
export interface InvoiceInfo {
  id: number;
  doctorId: number;
  patientId: number;
  callId: number;
  chatSessionId: number;
  amount: string;
  note: string;
  status: string;
  type: string;
  createdAt: string;
  updatedAt: string;
}

export interface StartChat {
  endTime: string;
  id: string;
  isFromPatient: boolean;
  receiverId: string;
  senderId: string;
  startTime: string;
  status: string;
}
export interface PatientInfoProfile {
  data: {
    id: number;
    role: number;
    area_code_id: number;
    name: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    image: string;
    notes: string;
    devices: {
      data: Array<any>;
    };
    gender: string;
  };
}

export interface CallListParam {
  page: number;
  page_size: number;
  isPicked?: boolean;
  loadMore?: boolean;
}
export interface CallListResponse {
  count: number;
  total: number;
  data: Array<CallListInfo>;
}
export interface CallListInfo {
  isCallback: boolean;
  isFromPatient: boolean;
  isPicked: boolean;
  id: string;
  senderToken: string;
  receiverToken: string;
  channelName: string;
  status: string;
  senderId: string;
  receiverId: string;
  receiver: CallListReceiver;
  createdAt: string;
  updatedAt: string;
  expireDate: number;
  callbackCallId: number;
  sender: CallListSender;
  invoice: InvoiceInfo;
  startTime: string;
  endTime: string;
}
export interface CallListSender {
  id: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  role_id: number;
}
export interface CallListReceiver {
  id: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  role_id: number;
}
export interface AppointmentInfo {
  id: number;
  address: string;
  date_appointment: string;
  doctor: string;
  doctor_id: number;
  patient_mobile: string;
  patient_name: string;
  doctor_picture: string;
  rating_avg: number;
  is_online: number;
  doctor_profile: {
    specialty: string;
    doctor_age: number;
  };
  type: string;
}

export interface TransactionParam {
  page: number;
  page_size: number;
  type: 'TOPUP' | 'INVOICE';
}

export interface TransactionResponse {
  data: Array<TransactionTopUp>;
  count: number;
  total: number;
}

export interface TransactionTopUp {
  id: string;
  userId: string;
  amount: string;
  type: string;
  createdAt: string;
  updatedAt: string;
}
export interface Specialities {
  id: string;
  name: string;
  picture: string;
}

export interface Rating {
  content: string;
  rating: number;
}
export interface TopReview {
  name: string;
  photo: string;
  rating: Rating[];
  ratingAvg: number;
  registrationNo: string;
  salutation: string;
  specialty: string;
  yearExperience: number;
  doctorId: number;
}

export interface Options {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  headers?: { [key: string]: string } | null;
  data?: { [key: string]: any };
  qs?: any;
  isAuth?: boolean;
  timeout?: number;
  useLoadGlobal?: boolean;
  useSecret?: boolean;
  useDeviceId?: boolean;
  url?: string;
  newEndpoint?: string;
  isServices?: boolean;
  token65Doctor?: string;
}

export interface StatusDoctor {
  id: string;
  isOnline: boolean;
  updatedAt: string;
  userId: string;
  callTime: {
    value: number;
  };
  chatTime: {
    value: number;
  };
}

export interface NotificationResponse {
  data: NotificationDetail & NotificationCallDetail;
  type: 'appointment' | 'call';
  created_at: {
    date: string;
    timezone_type: number;
    timezone: string;
  };
}
export interface NotificationTotalResponse {
  data: Array<NotificationResponse>;
  total: number;
}

export interface NotificationCallDetail {
  channel_name: string;
  receiver_token: string;
  sender_token: string;
  status: string;
  created_at: {
    date: string;
    timezone_type: number;
    timezone: string;
  };
  updated_at: {
    date: string;
    timezone_type: number;
    timezone: string;
  };
  expire_date: number;
  id: number;
  is_from_patient: number;
  receiver_id: number;
  sender_id: number;
}

export interface NotificationDetail {
  id: number;
  doctor_id: number;
  rating_avg: number;
  is_online: number;
  date_appointment: string;
  doctor: string;
  address: string;
  patient_name: string;
  patient_mobile: string;
  doctor_picture: string;
  doctor_profile: {
    specialty: string;
    doctor_age: number;
  };
}
