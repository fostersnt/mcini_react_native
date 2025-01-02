import messaging from '@react-native-firebase/messaging';
import {Platform, PermissionsAndroid} from 'react-native';

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
