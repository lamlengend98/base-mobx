import RNVoipCall from 'hisoft-react-native-voip-call';
import { Sender } from '@/tools/network/types';

export const displayIncommingCall = (
  sender: Sender,
  channelName: string,
  notificationId: string,
) => {
  const callOptions = {
    callerId: '825f4094-a674-4765-96a7-1ac512c02a71', // Important uuid must in this format
    ios: {
      phoneNumber: sender?.phone, // Caller Mobile Number
      name: `${sender.firstName} ${sender.lastName}`, // caller Name
      hasVideo: true,
    },
    android: {
      ringtuneSound: true, // defualt true
      ringtune: 'ringtune', // add file inside Project_folder/android/app/res/raw
      duration: 20000, // defualt 30000
      vibration: true, // defualt is true
      channel_name: channelName, //
      notificationId,
      notificationTitle: 'Incomming Call',
      notificationBody: `${sender?.firstName} ${sender?.lastName} is Calling...`,
      answerActionTitle: 'Answer',
      declineActionTitle: 'Decline',
    },
  };

  RNVoipCall.displayIncomingCall(callOptions)
    .then((data) => {
      console.log(data);
    })
    .catch((e) => console.log(e));
};

export const stopNotificationCallAndroid = (data) => {
  console.log(data);
  RNVoipCall.endAllCalls();
  RNVoipCall.stopRingtune();
};
