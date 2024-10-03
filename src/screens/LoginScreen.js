import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'

export default function LoginScreen() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = () => {
    console.log('Your username is: ', username);
    
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <TextInput
        style={styles.input}
        placeholder='username'
        // placeholderTextColor={'grey'}
        onChangeText={(text) => setUsername(text)}
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
    }
})