import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  StatusBar,
  KeyboardAvoidingView,
  ActivityIndicator,
  Platform,
  Image,
} from 'react-native';
import { allUserData } from '../api/UserAPI';
import { useNavigation } from '@react-navigation/native';
import { AppStyles } from '../utilities/AppStyles';
import { replaceFirstDigitWith233 } from '../utilities/Validations';
import { showToast } from '../components/ToastAlert';
import { useDispatch } from 'react-redux';
import { setSubscriber, setLoginStatus } from '../redux/slice/SubscriberSlice';
import {
  setFavoriteMovies,
  setMovies,
  setWatchList,
} from '../redux/slice/MovieSlice';
import LoadingPulse from '../animation/LoadingPulse';
import {
  checkInitialNotification,
  getFcmToken,
  requestUserPermission,
  sendBackgroundNotification,
  sendForegroundNotification,
} from '../utilities/General';
import messaging from '@react-native-firebase/messaging';
import LinearGradient from 'react-native-linear-gradient';

const bannerImage = require('../assets/images/new_image.png');

export default function LoginScreen() {
  const dispatch = useDispatch();
  const [apiStatus, setApiStatus] = useState(false);
  const phoneRef = useRef('');
  const deviceToken = useRef('');
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    const ff = async () => {
      deviceToken.current = await getFcmToken();
      await requestUserPermission();
      sendForegroundNotification();
      sendBackgroundNotification();
      checkInitialNotification();
    };

    ff();
  }, []);

  const handleLogin = async () => {
    const phoneNumber = phoneRef.current;

    if (phoneNumber != null && phoneNumber.length < 1) {
      showToast('Login Error', 'Phone number is required', 'error', 5000);
    } else {
      if (!isLoading) {
        setIsLoading(true);

        const formattedPhone = replaceFirstDigitWith233(phoneNumber);

        const responseData = await allUserData(
          formattedPhone,
          deviceToken.current,
        );

        if (responseData.success === 'false') {
          showToast('Login Error', responseData.message, 'error', 5000);
          setIsLoading(false);
        } else if (responseData.success === 'true') {
          const watchListArray = [];

          const myWatchList = responseData.watchList;

          if (myWatchList != null && myWatchList.length > 0) {
            myWatchList.forEach(item => {
              if (item.video) {
                watchListArray.push(item.video);
              }
            });
          }

          dispatch(setLoginStatus('active'));
          dispatch(setSubscriber(responseData.subscriber));
          dispatch(setMovies(responseData.movies));
          dispatch(setFavoriteMovies(responseData.favorites));
          dispatch(setWatchList(watchListArray));

          setIsLoading(false);

          navigation.navigate('BottomTabNav', {
            screen: 'Home',
          });
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={bannerImage}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      <LinearGradient
        colors={['rgba(73, 59, 59, 0)', 'rgba(5, 0, 0, 5)']}
        style={styles.overlay}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'android' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <StatusBar translucent backgroundColor="transparent" />
        <View style={styles.myContainer}>
          {isLoading ? <LoadingPulse /> : null}
          <Text style={styles.title}>Log into mCini</Text>
          <TextInput
            style={styles.input}
            placeholder="phone number"
            onChangeText={(text) => {
              phoneRef.current = text;
            }}
          />
          <TouchableOpacity
            onPress={isLoading ? null : handleLogin}
            style={styles.loginButton}
          >
            <Text style={styles.loginText}>
              {isLoading ? <ActivityIndicator color={'white'} /> : 'Login'}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    paddingBottom: 50,
  },
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  myContainer: {
    alignItems: 'center',
    paddingVertical: 50,
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  title: {
    color: AppStyles.generalColors.white_one,
    fontWeight: 'bold',
    fontSize: AppStyles.generalFontSize.large,
    marginBottom: AppStyles.generalMargin.higher,
  },
  input: {
    backgroundColor: 'white',
    color: AppStyles.generalColors.dark_four,
    width: '90%',
    paddingHorizontal: 10,
    marginBottom: AppStyles.generalMargin.higher,
    borderRadius: AppStyles.generalBorderRadius.radius_one,
  },
  loginButton: {
    width: '90%',
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: AppStyles.generalColors.blue,
    borderRadius: AppStyles.generalBorderRadius.radius_one,
  },
  loginText: {
    color: AppStyles.generalColors.white_one,
    fontSize: AppStyles.generalFontSize.normal,
    fontWeight: AppStyles.generalFontWeight.weight_one,
  },
});