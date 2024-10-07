import { View, Text, StyleSheet, TouchableOpacity, TextInput, StatusBar, Image, KeyboardAvoidingView, ImageBackground } from 'react-native'
import React, { useState, useEffect } from 'react'
import { checkAuthAPI, allUserData } from '../api/UserAPI';
import { useNavigation } from '@react-navigation/native';
import { storeData, getStorageData } from '../utilities/LocalStorage';
import { AppStyles } from '../utilities/AppStyles';
import { replaceFirstDigitWith233 } from '../utilities/Validations';

const bannerImage = require('../assets/images/banner.png');

// const mciniLogo = require('../assets/images/logo/mcini.jpg')

export default function LoginScreen() {
  const [phone, setPhone] = useState('');
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [country, setCountry] = useState('option1');

  useEffect(() => {
    const authData = async () => {
      try {
        const storageData = await getStorageData(phone);
        // console.log('STORAGE DATA IS: ', storageData['msisdn']);
        // console.log('PHONE NUMBER:', phone);

        const response = await checkAuthAPI(storageData.msisdn);

        const message = response.message.toString().toLowerCase();

        console.log('MESSAGE: ', message);

        if (response.success == 'true' && message == 'user authenticated') {
          navigation.navigate('BottomTabNav', {
            Screen: 'HomeScreen',
            params: { movies: response.data }
          });
        }
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
      setIsError(true);
      setErrorMessage('Phone number is required');
    } else {
      // const responseData = await userLoginAPI(phone);
      const responseData = await allUserData(phone);

      console.log('MAIN USER LOGIN API RESPONSE: ', responseData['favourites']);

      const formattedPhone = replaceFirstDigitWith233(phone);

      setPhone(formattedPhone);

      var dataToBeStored = {
        msisdn: formattedPhone,
        subscriber: null,
        movies: null,
        favourites: null,
        watchList: null,
      }

      if (responseData['success'] == 'false') {

        await storeData(dataToBeStored);

        setIsError(true);
        setErrorMessage(responseData['message']);

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

        var dataToBeStored = {
          msisdn: formattedPhone,
          subscriber: responseData['subscriber'],
          movies: responseData['movies'],
          favourites: responseData['favourites'],
          watchList: watchListArray,
        }

        await storeData(dataToBeStored);

        // console.log('LOGIN WATCH-LIST === ', responseData['watchList']);
        

        setIsError(false);
        setErrorMessage('');

        navigation.navigate('BottomTabNav', {
          screen: 'Home', //This is the name I used in the BottomTabNav for the HomeScreen
          params: {
            subscriber: responseData['subscriber'],
            movies: responseData['movies'],
            favourites: responseData['favourites'],
            watchList: watchListArray
          } //This is the data I am passing to the HomeScreen
        });
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
          // backgroundColor: AppStyles.generalColors.dark_four,
          padding: AppStyles.generalPadding.higher
        }
      ]}
      source={bannerImage}
      resizeMode='cover'
    >
      <KeyboardAvoidingView

        behavior={Platform.OS === 'android' ? 'padding' : 'height'}
      >
        <StatusBar translucent backgroundColor='transparent'></StatusBar>
        {/* <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={mciniLogo}
          >
          </Image>
        </View> */}
        <View style={[
          // styles.innerContainer,
          {
            backgroundColor: AppStyles.generalColors.dark_three,
            paddingVertical: 50,
            padding: AppStyles.generalPadding.higher,
            // borderRadius: AppStyles.generalBorderRadius.radius_two
          }
        ]}>
          {/* {isError ? AlertComponent('Login', errorMessage) : ''} */}
          <View>
            <Text style={[
              styles.title,
              {
                fontSize: AppStyles.generalFontSize.large,
                marginBottom: AppStyles.generalMargin.higher,
              }
            ]}>Login</Text>
            {isError ?
              <View style={{
                width: '100%', borderColor: 'white', borderWidth: 1, marginBottom: 10,
                display: 'flex', alignItems: 'center',
                justifyContent: 'center',
                padding: 10
              }}>
                <Text style={{
                  color: AppStyles.generalColors.red_one,
                  fontWeight: AppStyles.generalFontWeight.weight_one,
                  // marginBottom: AppStyles.generalMargin.higher,
                }}>{errorMessage}</Text>
              </View>
              : ''}
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
              }}>Login</Text>
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