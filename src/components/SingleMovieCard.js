import React, { useState } from 'react';
import { View, TouchableOpacity, Dimensions, StyleSheet, Text, ActivityIndicator, Button } from 'react-native';
import { AppStyles } from '../utilities/AppStyles';
import WebView from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import { userData } from '../apiData/UserData';
import { useSelector } from 'react-redux';
import SubscriptionModal from './SubscriptionModal'; // Import the new modal component

const imagePath = require('../assets/images/banner.png')

export default function SingleMovieCard({ movie, onMoviePressedFunc }) {
    const navigator = useNavigation();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [key, setKey] = useState(0);

    const similar_movies = useSelector((state) => state.movie.movies);
    const subscriber = useSelector((state) => state.subscriber.subscriberDetails);

    const { width: screenWidth } = Dimensions.get('screen');
    const size = (screenWidth / 3) - 10;  // Calculate WebView size

    const [modalVisible, setModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isStatusCheck, setIsStatusCheck] = useState(false);
    const [isPaymentCheck, setIsPaymentCheck] = useState(false);

    const myData = userData;
    const msisdn = subscriber ? subscriber.msisdn : 'N/A';
    const plan_id = myData.dailyPlanId;
    const network = myData.network.mtn;

    // Retry logic in case of error
    const handleRetry = () => {
        setError(false);
        setKey(prevKey => prevKey + 1); // Increment the key to refresh the WebView
    };

    return (
        <View style={{ borderRadius: 25, overflow: 'hidden' }}>
            {/* Loader - Displayed only when loading is true and error is false */}
            {loading && !error && (
                <ActivityIndicator size="large" color="#fff" style={styles.loader} />
            )}

            <View>
                {!error ? (
                    <TouchableOpacity onPress={async () => { onMoviePressedFunc(movie) }}>
                        {/* WebView */}
                        <WebView
                            key={key}
                            style={{
                                backgroundColor: AppStyles.generalColors.dark_four,
                                marginHorizontal: 5,
                                width: size,
                                height: 200,
                                zIndex: 1  // Ensure WebView stays behind the loader
                            }}
                            source={{ uri: movie['default_thumbnail_filename'], headers: { Referer: 'https://mcini.tv' } }}
                            javaScriptEnabled={true}
                            domStorageEnabled={true}
                            allowsInlineMediaPlayback={true}
                            onLoadStart={() => setLoading(true)}  // Set loading state to true on load start
                            onLoadEnd={() => setLoading(false)}  // Set loading state to false on load end
                            onError={() => setError(true)}  // Set error state if WebView fails to load
                            renderError={() => (
                                <View style={styles.errorContainer}>
                                    <Text style={styles.errorText}>Failed to load page.</Text>
                                </View>
                            )}
                        />
                    </TouchableOpacity>
                ) : (
                    <View>
                        {/* Retry Button */}
                        <Button title="Retry" onPress={handleRetry} />
                    </View>
                )}

                {/* Subscription Modal */}
                <SubscriptionModal
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                    isStatusCheck={isStatusCheck}
                    setIsStatusCheck={setIsStatusCheck}
                    isPaymentCheck={isPaymentCheck}
                    setIsPaymentCheck={setIsPaymentCheck}
                    msisdn={msisdn}
                    network={network}
                    plan_id={plan_id}
                    movie={movie}
                    navigation={navigator}
                />
            </View>
        </View>
    );
}

// Styles
const styles = StyleSheet.create({
    loader: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -25 }, { translateY: -25 }], // Center the loader
        zIndex: 10,  // Ensure loader is above the WebView
    },
    errorContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 200,
    },
    errorText: {
        color: 'white',
    },
    modalButtonsContainer: {
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    modalButtonRed: {
        width: 100,
        marginRight: 20,
        backgroundColor: 'red',
        paddingVertical: 10,
    },
    modalButtonBlue: {
        width: 100,
        marginRight: 20,
        backgroundColor: AppStyles.generalColors.blue,
        paddingVertical: 10,
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Semi-transparent background
    },
    modalContainer: {
        width: '80%',
        height: 200,
        backgroundColor: AppStyles.generalColors.dark_one,
        borderRadius: 10,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalText: {
        marginBottom: 20,
        textAlign: 'center',
        fontSize: 16,
        color: AppStyles.generalColors.white_one,
    },
    modalBtnText: {
        textAlign: 'center',
        fontSize: 16,
        color: AppStyles.generalColors.white_one,
        fontWeight: AppStyles.generalFontWeight.weight_one,
    },
});
