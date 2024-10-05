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
    const authData = async (subcriberPhone) => {

      const storageData = await getData(phone);
      console.log('STORAGE DATA IS: ', storageData);

      const response = await checkAuthAPI(subcriberPhone);
      console.log('CHECK AUTH FINAL DATA: ', response);
      if (response.success == 'true') {
        navigation.navigate('BottomTabNav', {
          Screen: 'HomeScreen',
          params: { movies: response.data }
        });
      }
    }

    //Calling the authCheck function
    try {
      authData(phone);
    } catch (error) {
      console.log('USE EFFECT ERROR: ', error);

    }

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
      style={[styles.container, {backgroundColor: AppStyles.generalColors.dark_four}]}
      behavior={Platform.OS === 'android' ? 'padding' : 'height'}
    >
      <StatusBar translucent backgroundColor='transparent'></StatusBar>
      {/* <StatusBar hidden={true}></StatusBar> */}
      <View style = {styles.logoContainer}>
        <Image
          style={styles.logo}
          source={mciniLogo}
        >
        </Image>
      </View>
      <View>
        {/* {isError ? AlertComponent('Login', errorMessage) : ''} */}
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Sign In</Text>
          {isError ? <Text style={styles.errorText}>{errorMessage}</Text> : ''}
          <TextInput
            style={styles.input}
            placeholder='phone number'
            // placeholderTextColor={'grey'}
            onChangeText={(text) => setPhone(text)}
          />
          <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
            <Text style={styles.loginText}>Login</Text>
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
    padding: 20,
    // backgroundColor: 'black',
    display: 'flex',
    justifyContent: 'center',
  },
  errorText: {
    color: 'red',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'flex-start'
  },
  input: {
    height: 40,
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 5,
    paddingHorizontal: 10,
    // fontSize: 20,
    marginBottom: 20
  },
  loginButton: {
    height: 40,
    backgroundColor: 'red',
    width: '100%',
    borderRadius: 5,
    padding: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  innerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    // backgroundColor: 'red',
    width: '100%',
    marginTop: 20
  },
  notRegistered: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  },
})