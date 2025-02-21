import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
const imagePath = require('../assets/images/get_started_screen.png');
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import { AppStyles } from '../utilities/AppStyles';
import LinearGradient from 'react-native-linear-gradient'; // Import the LinearGradient component

export default function WelcomeSliderScreen() {
  const navigator = useNavigation();
  const [sliderIndex, setSliderIndex] = useState(0);

  const image = imagePath;

  const images = [
    {
      id: '1',
      image: imagePath,
    },
    {
      id: '2',
      image: imagePath,
    },
  ];

  const onIndexChangedFunc = index => {
    if (index === images.length - 1) {
      setSliderIndex(0);
      //! The code below is intentionally commented to prevent navigation
      // navigator.navigate('Login');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} />
      {/* Apply LinearGradient to the overlay */}
      <LinearGradient
        colors={['rgba(5, 0, 0, 0)', 'rgba(5, 0, 0, 0.9)']} // Gradient from transparent to dark
        style={styles.overlay}
      >
        <View style={styles.swiperContainer}>
          <Swiper
            loop={false}
            showsPagination={true}
            style={styles.swiper}
            dot={<View style={styles.dot} />}
            activeDot={<View style={styles.activeDot} />}
            onIndexChanged={onIndexChangedFunc}
            index={sliderIndex}
          >
            <Text style={styles.text}>
              Immerse yourself in the richness of African cinema
            </Text>
            <Text style={styles.text}>
              Unique and diverse viewing experience for audiences worldwide
            </Text>
          </Swiper>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigator.navigate('Login')}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </LinearGradient>
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
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 50, // Add padding to ensure the button is visible in the dark area
  },
  text: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  swiperContainer: {
    padding: 10,
    marginHorizontal: 20,
    alignContent: 'center',
    borderRadius: 10,
    position: 'absolute',
    left: 10,
    right: 10,
    bottom: 200,
    zIndex: 1,
    height: 150,
    alignItems: 'center',
    textAlign: 'center',
  },
  button: {
    width: '80%',
    position: 'absolute',
    bottom: 100,
    backgroundColor: AppStyles.generalColors.blue,
    paddingVertical: 12,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  dot: {
    backgroundColor: AppStyles.generalColors.white_one,
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  activeDot: {
    backgroundColor: AppStyles.generalColors.blue,
    width: 30,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
});
