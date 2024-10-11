import { View, Text, StyleSheet, TouchableOpacity, TextInput, StatusBar, Image, KeyboardAvoidingView, ImageBackground, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { checkAuthAPI, allUserData } from '../api/UserAPI';
import { useNavigation } from '@react-navigation/native';
import { AppStyles } from '../utilities/AppStyles';
import { replaceFirstDigitWith233 } from '../utilities/Validations';
import { showToast } from '../components/ToastAlert';
import { useDispatch, useSelector } from 'react-redux';
import { setSubscriber } from '../redux/slice/SubscriberSlice';
import { setFavoriteMovies, setMovies, setWatchList } from '../redux/slice/MovieSlice';

const bannerImage = require('../assets/images/banner.png');

export default function LoginScreen() {
  const dispatch = useDispatch();
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentSubscriber, setCurrentSubscriber] = useState(null);

  const subscriberData = useSelector((state) => state.subscriber.subscriberDetails);

  useEffect(() => {
    const authData = async () => {
      try {
        // const storageData = await getStorageData(phone);
        setCurrentSubscriber(subscriberData);

        if (currentSubscriber != null && currentSubscriber.msisdn != '') {
          const response = await checkAuthAPI(currentSubscriber.msisdn);

          const message = response['message'].toString().toLowerCase();

          console.log('MESSAGE: ', message);

          if (response.success == 'true' && message == 'user authenticated!') {
            navigation.navigate('BottomTabNav', {
              Screen: 'HomeScreen',
              params: { movies: response.data }
            });
          }
        }
        console.log('SUBSCRIBER MSISDN === ', currentSubscriber ? currentSubscriber.msisdn : 'N/A');
      } catch (error) {
        console.log('USE EFFECT ERROR AT LOGIN SCREEN: ', error.toString());
      }
    }
    //Calling the authCheck function
    authData();
  }, []);

  const navigation = useNavigation();

  //LOGIN FUNCTION
  const handleLogin = async () => {
    if (phone.length < 1) {
      showToast('Login Error', 'Phone number is required', 'error', 5000)
    } else {
      if (!isLoading) {

        setIsLoading(true)

        const formattedPhone = replaceFirstDigitWith233(phone);

        setPhone(formattedPhone);

        const responseData = await allUserData(phone);

        if (responseData['success'] == 'false') {

          showToast('Login Error', responseData['message'], 'error', 5000)

          setIsLoading(false)

        } else if (responseData['success'] == 'true') {

          const watchListArray = [];

          const myWatchList = responseData['watchList'];

          if (myWatchList != null && myWatchList.length > 0) {
            myWatchList.forEach(item => {
              if (item.video) {
                watchListArray.push(item.video);
              }
            });
          }

          dispatch(setSubscriber(responseData['subscriber']));
          dispatch(setMovies(responseData['movies']));
          dispatch(setFavoriteMovies(responseData['favorites']));
          dispatch(setWatchList(watchListArray))

          setIsLoading(false)

          // navigation.navigate('Home');

          navigation.navigate('BottomTabNav', {
            screen: 'Home',
          });
        }
      }
    }
  }


  //REGISTER NAVIGATION
  const handleRegister = () => {
    navigation.navigate('Register');
  }

  return (
    <ImageBackground
      style={[
        styles.container,
        {
          padding: AppStyles.generalPadding.higher,
        }
      ]}
      source={bannerImage}
      resizeMode='cover'
    >
      <KeyboardAvoidingView

        behavior={Platform.OS === 'android' ? 'padding' : 'height'}
      >
        <StatusBar translucent backgroundColor='transparent'></StatusBar>

        <View style={[
          {
            backgroundColor: AppStyles.generalColors.dark_three,
            paddingVertical: 50,
            padding: AppStyles.generalPadding.higher,
            opacity: 1,
          }
        ]}>
          <View>
            <Text style={[
              styles.title,
              {
                fontSize: AppStyles.generalFontSize.large,
                marginBottom: AppStyles.generalMargin.higher,
              }
            ]}>Login</Text>
            <TextInput
              style={[
                styles.input,
                {
                  height: AppStyles.generalHeight.height_one,
                  marginBottom: AppStyles.generalMargin.higher,
                  borderRadius: AppStyles.generalBorderRadius.radius_one
                }
              ]}
              placeholder='phone number'
              onChangeText={(text) => setPhone(text)}
            />
            <TouchableOpacity onPress={handleLogin} style={[
              styles.loginButton,
              {
                backgroundColor: AppStyles.generalColors.blue,
                padding: AppStyles.generalPadding.lower,
                height: AppStyles.generalHeight.height_one,
                borderRadius: AppStyles.generalBorderRadius.radius_one
              }
            ]}>
              <Text style={{
                color: AppStyles.generalColors.white_one,
                fontSize: AppStyles.generalFontSize.normal,
                fontWeight: AppStyles.generalFontWeight.weight_one
              }}>
                {isLoading ? <ActivityIndicator color={'white'} /> : 'Login'}
              </Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.innerContainer} onPress={handleRegister}>
              <Text style={styles.notRegistered}>Not a subscriber? Register</Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  logoContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    marginBottom: 20,
    width: 50,
    height: 50
  },
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
  },
  // errorText: {
  //   color: 'red',
  //   fontWeight: 'bold',
  //   marginBottom: 20,
  // },
  title: {
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'flex-start'
  },
  input: {
    backgroundColor: 'white',
    width: '100%',
    paddingHorizontal: 10,
  },
  loginButton: {
    width: '100%',
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
    marginTop: 20
  },
  notRegistered: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  },
})