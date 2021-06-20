import AsyncStorage from '@react-native-community/async-storage';
import { decorate, observable } from 'mobx';
import { create } from 'mobx-persist';
import mobxDev from 'mobx-remotedev';
import {
  Appointment,
  AppState,
  Auth,
  Clinic,
  Condition,
  Contact,
  Devices,
  Doctor,
  Invoice,
  News,
  Notification,
  Payment,
  UserProfile,
} from '@/models';
import { Chat } from '@/models/chat';
import { APP_STORE_HYDRATE } from '@/utils';

const hydrate = create({
  storage: AsyncStorage,
  jsonify: true,
});

@mobxDev({ name: 'AppStore', global: true })
class AppStore {
  appState = new AppState();
  auth = new Auth();
  userProfile = new UserProfile();
  doctor = new Doctor();
  payment = new Payment();
  clinic = new Clinic();
  devices = new Devices();
  condition = new Condition();
  invoice = new Invoice();
  chat = new Chat();
  contact = new Contact();
  appointment = new Appointment();
  news = new News();
  notification = new Notification();

  constructor() {
    hydrate(APP_STORE_HYDRATE.APP_STATE, this.appState);
    hydrate(APP_STORE_HYDRATE.APP_AUTH, this.auth);
    hydrate(APP_STORE_HYDRATE.CLINIC, this.clinic);
    // hydrate(APP_STORE_HYDRATE.APP_AUTH, this.userProfile);
  }
}

decorate(AppStore, {
  appState: observable,
  auth: observable,
  userProfile: observable,
  payment: observable,
  doctor: observable,
  clinic: observable,
  devices: observable,
  condition: observable,
  chat: observable,
});

export type AppStoreType = AppStore;

export default new AppStore();
