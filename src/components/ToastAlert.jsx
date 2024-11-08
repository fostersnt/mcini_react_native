import { Text } from 'react-native';
import Toast from 'react-native-toast-message';

export const showToast = (title, message, type = 'default', duration = 3000) => {
  Toast.show({
    text1: title,
    text2: message,
    type: type,
    visibilityTime: duration,
    position: 'top', // Can be 'top', 'bottom', or 'center'
  });
};


// To set up the Toast reference, include this in your main component file (e.g., App.js):
// <Toast />
