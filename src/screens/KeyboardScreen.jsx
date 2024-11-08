import React from 'react';
import { StyleSheet, View, TextInput, Button, KeyboardAvoidingView, Platform } from 'react-native';

const KeyboardScreen = () => {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.inner}>
        <TextInput
          placeholder="Enter your email"
          style={styles.input}
        />
        <TextInput
          placeholder="Enter your password"
          secureTextEntry
          style={styles.input}
        />
        <Button title="Submit" onPress={() => {}} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
});

export default KeyboardScreen;
