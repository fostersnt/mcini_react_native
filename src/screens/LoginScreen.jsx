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
  ImageBackground,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {allUserData} from '../api/UserAPI';
import {useNavigation} from '@react-navigation/native';
import {AppStyles} from '../utilities/AppStyles';
import {replaceFirstDigitWith233} from '../utilities/Validations';
import {showToast} from '../components/ToastAlert';
import {useDispatch} from 'react-redux';
import {setSubscriber, setLoginStatus} from '../redux/slice/SubscriberSlice';
import {
  setFavoriteMovies,
  setMovies,
  setWatchList,
} from '../redux/slice/MovieSlice';
import LoadingPulse from '../animation/LoadingPulse';
import {checkInitialNotification, getFcmToken, requestUserPermission, sendBackgroundNotification, sendForegroundNotification} from '../utilities/General';
import messaging from '@react-native-firebase/messaging';

const bgVideo = require('../assets/videos/login_bg_video.mp4');
// const bgVideo = require('../assets/videos/login_bg_video_2.mp4');

const bannerImage = require('../assets/images/login_image.png');

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
      // console.log('FCM TOKEN useRef:', deviceToken.current);
      await requestUserPermission();
      // const apiData = await firebaseNotificationAPI();
      // if (apiData.success === 'false') {
      //   setApiStatus(true);
      // }
      sendForegroundNotification();
      sendBackgroundNotification();
      checkInitialNotification();
    };

    ff();
  }, []);

  //LOGIN FUNCTION
  const handleLogin = async () => {
    const phoneNumber = phoneRef.current;
    console.log('CURRENT PHONE LENGTH === ', phoneNumber.length);

    if (phoneNumber != null && phoneNumber.length < 1) {
      showToast('Login Error', 'Phone number is required', 'error', 5000);
    } else {
      if (!isLoading) {
        setIsLoading(true);

        const formattedPhone = replaceFirstDigitWith233(phoneNumber);

        const responseData = await allUserData(formattedPhone, deviceToken.current);

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

  //REGISTER NAVIGATION
  // const handleRegister = () => {
  //   navigation.navigate('Register');
  // };

  //IMAGE BACKGROUND
  return (
    <ImageBackground
      style={[
        styles.container,
        {
          padding: AppStyles.generalPadding.higher,
        },
      ]}
      source={bannerImage}
      resizeMode="cover">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'android' ? 'padding' : 'height'}>
        <StatusBar translucent backgroundColor="transparent" />

        <View style={styles.myContainer}>
            {/* <LoadingPulse></LoadingPulse> */}
            {isLoading ? <LoadingPulse /> : null}
            <Text
              style={[
                styles.title,
                {
                  fontSize: AppStyles.generalFontSize.large,
                  marginBottom: AppStyles.generalMargin.higher,
                },
              ]}>
              Log into mCini
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  height: AppStyles.generalHeight.height_one,
                  marginBottom: AppStyles.generalMargin.higher,
                  borderRadius: AppStyles.generalBorderRadius.radius_one,
                },
              ]}
              placeholder="phone number"
              onChangeText={text => {
                phoneRef.current = text;
              }}
            />
            <TouchableOpacity
              onPress={isLoading ? null : handleLogin}
              style={[
                styles.loginButton,
                {
                  backgroundColor: AppStyles.generalColors.blue,
                  padding: AppStyles.generalPadding.lower,
                  height: AppStyles.generalHeight.height_one,
                  borderRadius: AppStyles.generalBorderRadius.radius_one,
                },
              ]}>
              <Text
                style={{
                  color: AppStyles.generalColors.white_one,
                  fontSize: AppStyles.generalFontSize.normal,
                  fontWeight: AppStyles.generalFontWeight.weight_one,
                }}>
                {isLoading ? <ActivityIndicator color={'white'} /> : 'Login'}
              </Text>
            </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
  //   <View style={styles.container}>
  //     <Video
  //       source={bgVideo}
  //       style={styles.backgroundVideo}
  //       resizeMode="cover"
  //       repeat
  //       muted
  //       paused={false}
  //     />

  //     <KeyboardAvoidingView
  //       behavior={Platform.OS === 'android' ? 'padding' : 'height'}>
  //       <StatusBar translucent backgroundColor="transparent" />

  //       <View style={styles.myContainer}>
  //         <View>
  //           {/* <LoadingPulse></LoadingPulse> */}
  //           {isLoading ? <LoadingPulse /> : null}
  //           <Text
  //             style={[
  //               styles.title,
  //               {
  //                 fontSize: AppStyles.generalFontSize.large,
  //                 marginBottom: AppStyles.generalMargin.higher,
  //               },
  //             ]}>
  //             Login
  //           </Text>
  //           <TextInput
  //             style={[
  //               styles.input,
  //               {
  //                 height: AppStyles.generalHeight.height_one,
  //                 marginBottom: AppStyles.generalMargin.higher,
  //                 borderRadius: AppStyles.generalBorderRadius.radius_one,
  //               },
  //             ]}
  //             placeholder="phone number"
  //             onChangeText={text => {
  //               phoneRef.current = text;
  //             }}
  //           />
  //           <TouchableOpacity
  //             onPress={isLoading ? null : handleLogin}
  //             style={[
  //               styles.loginButton,
  //               {
  //                 backgroundColor: AppStyles.generalColors.blue,
  //                 padding: AppStyles.generalPadding.lower,
  //                 height: AppStyles.generalHeight.height_one,
  //                 borderRadius: AppStyles.generalBorderRadius.radius_one,
  //               },
  //             ]}>
  //             <Text
  //               style={{
  //                 color: AppStyles.generalColors.white_one,
  //                 fontSize: AppStyles.generalFontSize.normal,
  //                 fontWeight: AppStyles.generalFontWeight.weight_one,
  //               }}>
  //               {isLoading ? <ActivityIndicator color={'white'} /> : 'Login'}
  //             </Text>
  //           </TouchableOpacity>
  //         </View>
  //       </View>
  //     </KeyboardAvoidingView>
  //   </View>
  // );
}

const styles = StyleSheet.create({
  myContainer: {
    // opacity: 1,
    // flex: 1,
    // display: 'flex',
    // justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: AppStyles.generalColors.dark_three,
    paddingVertical: 50,
    // padding: AppStyles.generalPadding.higher,
  },
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  // errorText: {
  //   color: 'red',
  //   fontWeight: 'bold',
  //   marginBottom: 20,
  // },
  title: {
    color: AppStyles.generalColors.white_one,
    fontWeight: 'bold',
    // alignSelf: 'flex-start',
  },
  input: {
    backgroundColor: 'white',
    color: AppStyles.generalColors.dark_four,
    width: '90%',
    paddingHorizontal: 10,
  },
  loginButton: {
    width: '90%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // loginText: {
  //   color: 'white',
  //   fontSize: 16,
  //   fontWeight: 'bold'
  // },
  innerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    width: '100%',
    marginTop: 20,
  },
  notRegistered: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
