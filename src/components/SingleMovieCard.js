import React, { useState } from 'react';
import { View, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import { AppStyles } from '../utilities/AppStyles';
import WebView from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import { userData } from '../apiData/UserData';
import { userSubscriptionCheck } from '../api/UserAPI';
import { showToast } from './ToastAlert';
import { useSelector } from 'react-redux';
import SubscriptionModal from './SubscriptionModal'; // Import the new modal component

export default function SingleMovieCard({ movie, onMoviePressedFunc }) {
    const navigator = useNavigation();
    const similar_movies = useSelector((state) => state.movie.movies);
    const subscriber = useSelector((state) => state.subscriber.subscriberDetails);
    const { width: screenWidth } = Dimensions.get('screen');

    const [modalVisible, setModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isStatusCheck, setIsStatusCheck] = useState(false);
    const [isPaymentCheck, setIsPaymentCheck] = useState(false);

    const myData = userData;
    const msisdn = subscriber ? subscriber.msisdn : 'N/A';
    const plan_id = myData.dailyPlanId;
    const network = myData.network.mtn;

    const size = (screenWidth / 3) - 10;

    onMoviePressedFunc = async () => {
        setIsStatusCheck(true);
        const statusCheck = await userSubscriptionCheck(msisdn);
        setIsStatusCheck(false);

        if (statusCheck['data']?.subscription_status === 'active') {
            navigator.navigate('ViewAllMoviesPlayer', { singleMovie: movie });
        } else {
            showToast('Subscription status', 'You have no active subscription', 'error', 5000);
            setModalVisible(true);
        }
    };

    return (
        <View style={{ borderRadius: 25, overflow: 'hidden' }}>
            <TouchableOpacity onPress={onMoviePressedFunc}>
                <WebView
                    style={{
                        backgroundColor: AppStyles.generalColors.dark_four,
                        marginHorizontal: 5,
                        width: size,
                        height: 200
                    }}
                    source={{ uri: movie['default_thumbnail_filename'], headers: { Referer: 'https://mcini.tv' } }}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    allowsInlineMediaPlayback={true}
                    renderError={() => (
                        <View style={styles.errorContainer}>
                            <Text style={styles.errorText}>Failed to load page.</Text>
                        </View>
                    )}
                />
            </TouchableOpacity>
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
    );
}

const styles = StyleSheet.create({
    modalButtonsContainer: {
        marginTop: 30,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    modalButtonRed: {
        width: 100,
        marginRight: 20,
        backgroundColor: 'red',
        paddingVertical: 10
    },
    modalButtonBlue: {
        width: 100,
        marginRight: 20,
        backgroundColor: AppStyles.generalColors.blue,
        paddingVertical: 10
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    },
    modalContainer: {
        width: '80%',  // Set width of modal
        height: 200, // Set height of modal
        backgroundColor: AppStyles.generalColors.dark_one, //This color changes dynamically for the subscription modal
        borderRadius: 10,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalText: {
        marginBottom: 20,
        textAlign: 'center',
        fontSize: 16,
        color: AppStyles.generalColors.white_one
    },
    modalBtnText: {
        // marginBottom: 20,
        textAlign: 'center',
        fontSize: 16,
        color: AppStyles.generalColors.white_one,
        fontWeight: AppStyles.generalFontWeight.weight_one
    },
});
