import messaging from '@react-native-firebase/messaging';
import {Platform, PermissionsAndroid} from 'react-native';
import { showToast } from '../components/ToastAlert';

export const requestUserPermission = async () => {
  const systemOS = Platform.OS;
  let successState = false;

  if (systemOS.toLowerCase() === 'ios') {
    const authStatus = await messaging().requestPermission();
    successState =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  } else if (systemOS.toLowerCase() === 'android') {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    successState = true;
  }
  console.log('PERMISSION RESULT === ', successState);

  return successState;
};


//! GET FIREBASE TOKEN
export async function getFcmToken() {
  return await messaging().getToken();
}

//! CHECK FOR TOKEN REFRESH
 export const checkFcmTokenRefresh = () => {
    messaging().onTokenRefresh(async newToken => {
      console.log('FCM Token REFRESHED:', newToken);

      // Send the new token to your backend
    });
  };

  //! FOREGROUND NOTIFICATION
  export const sendForegroundNotification = () => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      const output = remoteMessage;
      // showToast(
      //   output.notification.title,
      //   output.notification.body,
      //   'success',
      //   10000,
      // );
      console.log(
        `FOREGROUND BODY: ${output.notification.body}, FOREGROUND TITLE: ${output.notification.title}`,
      );
      return {
        title: output.notification.title,
        body: output.notification.body,
      };
      // Alert.alert();
    });
    return unsubscribe;
  };

  //! BACKGROUND NOTIFICATION
  //! When the app is in the background or terminated
  export const sendBackgroundNotification = () => {
    // console.log('BACKGROUND: ', 1111);
    // messaging().setBackgroundMessageHandler(async remoteMessage => {
    //   console.log('BACKGROUND: ', remoteMessage);
    // });
    messaging().onNotificationOpenedApp(remoteMessage => {
      const output = remoteMessage;
      // showToast(output.notification.title, output.notification.body, 'success', 10000);
      console.log(
        'Notification caused app to open:',
        remoteMessage.notification,
      );

      return {
        title: output.notification.title,
        body: output.notification.body,
      };
    });
  };

  //! If the app was opened from a terminated state
  export async function checkInitialNotification() {
    const initialNotification = await messaging().getInitialNotification();
    if (initialNotification) {
      console.log(
        'App was opened by notification:',
        initialNotification.notification,
      );
    }
  }
