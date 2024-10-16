import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
const imagePath = require('../assets/images/banner.png')
import { Dimensions } from 'react-native';
import { AppStyles } from '../utilities/AppStyles';
import Entypo from 'react-native-vector-icons/Entypo'
import { useNavigation } from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import { checkAuthAPI } from '../api/UserAPI';
import { useSelector } from 'react-redux';

export default function WelcomeSliderScreen() {

  const subscriberData = useSelector((state) => state.subscriber.subscriberDetails);
  const navigator = useNavigation();

  const [sliderIndex, setSliderIndex] = useState(0);

    const { width: screenWidth } = Dimensions.get('screen');

    const images = [
        {
            id: '1',
            image: imagePath, // Replace with your image URL
        },
        {
            id: '2',
            image: imagePath, // Replace with your image URL
        },
        {
            id: '3',
            image: imagePath, // Replace with your image URL
        },
    ];

    useEffect(() => {
        const authData = async () => {
          try {
            // setCurrentSubscriber(subscriberData);
            console.log('DATA DATA === ', subscriberData);
            
            if (subscriberData != null && subscriberData.msisdn != '') {
              const response = await checkAuthAPI(subscriberData.msisdn);
    
              const message = response['message'].toString().toLowerCase();
    
              console.log('MESSAGE: ', message);
    
              if (response.success == 'true' && message == 'user authenticated!') {
                navigator.navigate('BottomTabNav', {
                  Screen: 'Home',
                });
              }
            }
          } catch (error) {
            console.log('USE EFFECT ERROR AT LOGIN SCREEN: ', error.toString());
          }
        }
        //Calling the authCheck function
        authData();
      }, []);

    const onSkipPress = () => {
        navigator.navigate('Login'); 
        // navigator.navigate('BottomTabNav', { screen: 'Login' });
    };

    const onIndexChangedFunc = (index) => {
        if (index === images.length - 1) {
            setSliderIndex(0)
          navigator.navigate('Login');
        }
      };

    return (
        <Swiper loop={false} showsPagination={true} style={styles.swiper}
            dot={<View style={styles.dot} />}
            activeDot={<View style={styles.activeDot} />}
            onIndexChanged={onIndexChangedFunc}
            index={sliderIndex}
        >
            {/* First image */}
            <View style={styles.slide}>
                <Image source={images[0].image} style={styles.image} />
                <View style={[styles.absoluteTouchableOpacity, { left: (screenWidth / 2) - 20 }]}>
                    <TouchableOpacity onPress={onSkipPress}><Text style={styles.skip}>Skip</Text></TouchableOpacity>
                </View>
            </View>

            {/* Second image */}
            <View style={styles.slide}>
                <Image source={images[1].image} style={styles.image} />
                <View style={[styles.absoluteTouchableOpacity, { left: (screenWidth / 2) - 20 }]}>
                    <TouchableOpacity onPress={onSkipPress}><Text style={styles.skip}>Skip</Text></TouchableOpacity>
                </View>
            </View>

            {/* Third image */}
            <View style={styles.slide}>
                <Image source={images[2].image} style={styles.image} />
                <View style={[styles.absoluteTouchableOpacity, { left: (screenWidth / 2) - 20 }]}>
                    <TouchableOpacity onPress={onSkipPress}><Text style={styles.skip}>Skip</Text></TouchableOpacity>
                </View>
            </View>
        </Swiper>
    );
};

const styles = StyleSheet.create({
    swiper: {
        position: 'relative'
    },
    skip: {
        color: '#fff',
        fontSize: 18
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#fff',
    },
    image: {
        flex: 1,
        // width: '100%',
        // height: '100%',
        // resizeMode: 'cover',
    },
    absoluteTouchableOpacity: {
        position: 'absolute',
        bottom: 70, // Distance from the top (you can adjust this)
        // right: 50, // Distance from the right side (you can adjust this)
    },
    dot: {
        backgroundColor: 'rgba(255, 255, 255, 0.3)', // Semi-transparent white for inactive dots
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3,
      },
      activeDot: {
        backgroundColor: '#fff', // Fully opaque white for active dot
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3,
      },
});