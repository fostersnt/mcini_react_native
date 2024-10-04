import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import { userLoginAPI, checkAuthAPI, userLogout } from '../api/UserAPI';
import AlertComponent from '../components/AlertComponent';
import { useNavigation } from '@react-navigation/native';
import { Screen } from 'react-native-screens';
import { storeData, getData } from '../utilities/LocalStorage';
// import RegisterScreen from './RegisterScreen';
// import AppNavigation from '../navigation/AppNavigation';

export default function LoginScreen() {
  const [phone, setPhone] = React.useState('');
  const [isError, setIsError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  React.useEffect(() => {
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

  const handleLogin = async () => {
    console.log('Your msisdn is: ', phone);
    const responseData = await userLoginAPI(phone);

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

  const handleRegister = () => {
    navigation.navigate('Register');
  }

  return (
    <View style={styles.container}>

      {/* {isError ? AlertComponent('Login', errorMessage) : ''} */}

      <Text style={styles.title}>Sign In</Text>
      {isError ? <Text style={styles.errorText}>{errorMessage}</Text> : ''}
      <TextInput
        style={styles.input}
        placeholder='phone'
        // placeholderTextColor={'grey'}
        onChangeText={(text) => setPhone(text)}
      />
      {/* <TextInput
        style={styles.input}
        placeholder='password'
        // placeholderTextColor={'grey'}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      /> */}
      <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.innerContainer} onPress={handleRegister}>
        <Text style={styles.notRegistered}>Not a subscriber? Register</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'black',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
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
    marginBottom: 20
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
    backgroundColor: 'blue',
    width: '100%',
    borderRadius: 5,
    padding: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  loginText: {
    color: 'white'
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