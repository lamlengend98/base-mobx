import AsyncStorage from '@react-native-community/async-storage';
import RNVoipCall from 'hisoft-react-native-voip-call';
import { TYPE_CALL_DEVICE } from './types';

export const handleBackgroundMessing = ({ message }) => {
  console.log(
    `🛠 LOG: 🚀 --> -----------------------------------------------------------------------------------------------------`,
  );
  console.log(
    `🛠 LOG: 🚀 --> ~ file: background-messaging.tsx ~ line 6 ~ handleBackgroundMessing ~ message`,
    message,
  );
  console.log(
    `🛠 LOG: 🚀 --> -----------------------------------------------------------------------------------------------------`,
  );
  const mess = JSON.parse(
    message.replace(/\\/g, '').replace('"{', '{').replace('}"', '}'),
  );
  console.log(
    `🛠 LOG: 🚀 --> ------------------------------------------------------------------------------------------------`,
  );
  console.log(
    `🛠 LOG: 🚀 --> ~ file: background-messaging.tsx ~ line 19 ~ handleBackgroundMessing ~ mess`,
    mess,
  );
  console.log(
    `🛠 LOG: 🚀 --> ------------------------------------------------------------------------------------------------`,
  );
  // Make your call here

  AsyncStorage.setItem(
    'storedVoip',
    message.replace(/\\/g, '').replace('"{', '{').replace('}"', '}'),
    (error) => {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
    },
  );
  const {
    custom: {
      a: { type, channelName, sender, token, uid, call },
      i,
    },
  } = mess;
  const callOptions = {
    callerId: i, // Important uuid must in this format
    ios: {
      phoneNumber: sender?.phone, // Caller Mobile Number
      name: 'RNVoip', // caller Name
      hasVideo: true,
    },
    android: {
      ringtuneSound: true, // defualt true
      ringtune: 'ringtune', // add file inside Project_folder/android/app/res/raw
      duration: 20000, // defualt 30000
      vibration: true, // defualt is true
      channel_name: channelName, //
      notificationId: Number(uid),
      notificationTitle: 'Incomming Call',
      notificationBody: `${sender?.firstName} ${sender?.lastName} is Calling...`,
      answerActionTitle: 'Answer',
      declineActionTitle: 'Decline',
    },
  };

  type === TYPE_CALL_DEVICE.START_CALL &&
    RNVoipCall.displayIncomingCall(callOptions)
      .then((data) => {
        console.log(data);
      })
      .catch((e) => console.log(e));

  type === TYPE_CALL_DEVICE.STOP_CALL && RNVoipCall.endAllCalls();

  return Promise.resolve();
};
