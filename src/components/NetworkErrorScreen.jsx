import React from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
const network_error_image = require('../assets/images/network_error.png');

export const NetworkErrorScreen = ({ onRetry }) => {
  return (
    <View style={styles.container}>
      <Image
        source={network_error_image} // Add an image of your choice for network error
        style={styles.image}
      />
      <Text style={styles.title}>Network Error</Text>
      <Text style={styles.message}>There seems to be an issue with your connection. Please try again later.</Text>
      <Button title="Retry" onPress={onRetry} color="#FF6347" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 20,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6347',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
});
