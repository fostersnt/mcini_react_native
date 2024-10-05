import { View, Text, StyleSheet, TouchableOpacity, TextInput, StatusBar, Image, KeyboardAvoidingView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { userLoginAPI, checkAuthAPI, userLogout } from '../api/UserAPI';
import { useNavigation } from '@react-navigation/native';
import { storeData, getData } from '../utilities/LocalStorage';
import { AppStyles } from '../utilities/AppStyles';

const mciniLogo = require('../assets/images/logo/mcini.jpg')

export default function LoginScreen() {
  const [phone, setPhone] = useState('');
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [country, setCountry] = useState('option1');

  useEffect(() => {
    const authData = async () => {

      try {
        const msisdnFromStorage = await getData(phone);
        console.log('STORAGE DATA IS: ', msisdnFromStorage);
        // console.log('PHONE NUMBER:', phone);

        const response = await checkAuthAPI(msisdnFromStorage);

        const message = response.message.toString().toLowerCase();
        console.log('MESSAGE: ', message);

        console.log('CHECK AUTH FINAL DATA: ', response);

        if (response.success == 'true' && message == 'user not authenticated!') {
          navigation.navigate('BottomTabNav', {
            Screen: 'HomeScreen',
            params: { movies: response.data }
          });
          // navigation.replace('BottomTabNav', {
          //   Screen: 'HomeScreen',
          //   params: { movies: response.data },
          // });
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
    console.log('Your msisdn is: ', phone);
    const responseData = await userLoginAPI(phone);

    console.log('MAIN USER LOGIN API RESPONSE: ', responseData);

    await storeData(phone);

    if (responseData.success == 'false') {
      setIsError(true);
      setErrorMessage(responseData['message']);
    } else if (responseData.success == 'true') {
      navigation.navigate('BottomTabNav', {
        Screen: 'HomeScreen',
        params: { movies: responseData.data }
      });
    }
    console.log('USER LOGIN API RESPONSE: ', responseData);

  }

  //REGISTER NAVIGATION
  const handleRegister = () => {
    navigation.navigate('Register');
  }

  return (
    <KeyboardAvoidingView
      style={[
        styles.container,
        {
          backgroundColor: AppStyles.generalColors.dark_four,
          padding: AppStyles.generalPadding.higher
        }
      ]}
      behavior={Platform.OS === 'android' ? 'padding' : 'height'}
    >
      <StatusBar translucent backgroundColor='transparent'></StatusBar>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={mciniLogo}
        >
        </Image>
      </View>
      <View>
        {/* {isError ? AlertComponent('Login', errorMessage) : ''} */}
        <View style={styles.innerContainer}>
          <Text style={[
            styles.title,
            {
              fontSize: AppStyles.generalFontSize.large,
              marginBottom: AppStyles.generalMargin.higher
            }
          ]}>Sign In</Text>
          {isError ? <Text style={{
            color: AppStyles.generalColors.red_one,
            fontWeight: AppStyles.generalFontWeight.weight_one,
            marginBottom: AppStyles.generalMargin.higher,
          }}>{errorMessage}</Text> : ''}
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
              backgroundColor: AppStyles.generalColors.red_one,
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
          <TouchableOpacity style={styles.innerContainer} onPress={handleRegister}>
            <Text style={styles.notRegistered}>Not a subscriber? Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
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