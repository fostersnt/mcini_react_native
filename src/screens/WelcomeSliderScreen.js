import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
const imagePath = require('../assets/images/banner.png')
import { Dimensions } from 'react-native';
import { AppStyles } from '../utilities/AppStyles';
import Entypo from 'react-native-vector-icons/Entypo'
import { useNavigation } from '@react-navigation/native';

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

    const renderItem = ({ item }) => (
        <View style={styles.container}>
            <Image source={imagePath} style={[styles.image, { width: screenWidth }]} />
            <View style={styles.innerContainer}>
                <View style={styles.circleContainer}>
                    <Entypo name='circle' size={15} color={'white'} />
                    <Entypo name='circle' size={15} color={'white'} />
                    <Entypo name='circle' size={15} color={'white'} />
                </View>
                <TouchableOpacity
                    onPress={() => {
                        navigator.navigate('Login')
                    }}
                >
                    <View>
                        <Text style={styles.text}>Skip</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View >
    );

    return (
        <FlatList
            data={images}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            horizontal
        />
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        flex: 1,
        backgroundColor: AppStyles.generalColors.dark_four
    },
    image: {
        height: '100%',
        marginBottom: 10,
    },
    innerContainer: {
        flex: 1,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute', // Position text absolutely
        bottom: 40, // Position text 10 pixels from the bottom
        // left: 10, // Position text 10 pixels from the left
        color: 'white', // Text color
        fontSize: 16, // Font size
        // backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional: semi-transparent background for better readability
        padding: 5, // Padding around the text
    },
    circleContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: 100,
        marginBottom: 30
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20
    }
});