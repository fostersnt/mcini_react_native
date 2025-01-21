import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
const imagePath = require('../assets/images/splash_screen.png');
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function WelcomeSliderScreen() {
  const navigator = useNavigation();

  const { width: screenWidth, height: screenHeight } = Dimensions.get('screen');

  // Single image to show
  const image = imagePath;

  useEffect(() => {
    // Navigate after 2 seconds
    const timer = setTimeout(() => {
      navigator.navigate('GetStarted');
    }, 3000);

    // Cleanup the timer when the component is unmounted
    return () => clearTimeout(timer);
  }, [navigator]);

  return (
    <View style={styles.container}>
      {/* Single full-screen image */}
      <Image source={image} style={styles.image} />

      {/* Optional: Add Skip button */}
      {/* <View style={styles.skipButtonContainer}>
        <TouchableOpacity onPress={() => navigator.navigate('Login')}>
          <Text style={styles.skip}>Skip</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // Ensure the image covers the entire screen
  },
  skipButtonContainer: {
    position: 'absolute',
    bottom: 20, // Position the Skip button at the bottom
    right: 20,  // Position the Skip button to the right
  },
  skip: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
