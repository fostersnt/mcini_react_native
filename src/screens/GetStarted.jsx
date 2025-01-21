import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
const imagePath = require('../assets/images/get_started_screen.png');
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function WelcomeSliderScreen() {
  const navigator = useNavigation();

  const { width: screenWidth, height: screenHeight } = Dimensions.get('screen');

  // Single image to show
  const image = imagePath;

  // useEffect(() => {
  //   // Navigate after 3 seconds
  //   const timer = setTimeout(() => {
  //     navigator.navigate('Home'); // Navigate to Home or your desired screen
  //   }, 3000);

  //   // Cleanup the timer when the component is unmounted
  //   return () => clearTimeout(timer);
  // }, [navigator]);

  return (
    <View style={styles.container}>
      {/* Single full-screen image */}
      <Image source={image} style={styles.image} />
      
      {/* Overlay with text and button */}
      <View style={styles.overlay}>
        <Text style={styles.text}>Welcome to Our App</Text>
        
        <TouchableOpacity style={styles.button} onPress={() => navigator.navigate('Login')}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
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
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay
  },
  text: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#1E90FF', // A blue button
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
