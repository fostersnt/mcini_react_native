import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
const imagePath = require('../assets/images/banner.png')
import { Dimensions } from 'react-native';
import { AppStyles } from '../utilities/AppStyles';
import Entypo from 'react-native-vector-icons/Entypo'
import { useNavigation } from '@react-navigation/native';
import Swiper from 'react-native-swiper';

export default function WelcomeSliderScreen() {

    const navigator = useNavigation();

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

    const onSkipPress = () => {
        navigator.navigate('BottomTabNav', { screen: 'Login' }); // Navigate to the login screen
    };

    return (
        <Swiper loop={false} showsPagination={true} style={styles.swiper}
            dot={<View style={styles.dot} />} // Custom dot style
            activeDot={<View style={styles.activeDot} />} // Custom active dot style
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