import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import { userLoginAPI } from '../api/userLoginAPI';

export default function LoginScreen() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isError, setIsError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  const handleLogin = async () => {
    // console.log('Your email is: ', email);
    console.log('Your password is: ', password);
    const responseData = await userLoginAPI(email, password);
    if (responseData['success'] == 'false') {
      setIsError(true);
      setErrorMessage(responseData['message']);
    }
    console.log('USER LOGIN API RESPONSE: ', responseData);
    
  }

  const handleRegister = () => {
    console.log('Navigate to register screen');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      {isError ? <Text style={styles.errorText}>{errorMessage}</Text> : ''}
      <TextInput
        style={styles.input}
        placeholder='email'
        // placeholderTextColor={'grey'}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder='password'
        // placeholderTextColor={'grey'}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
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