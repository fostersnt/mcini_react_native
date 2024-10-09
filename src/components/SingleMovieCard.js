import { View, Text, TouchableOpacity, Modal, StyleSheet, Button, ActivityIndicator, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { AppStyles } from '../utilities/AppStyles'
import WebView from 'react-native-webview'
import { useNavigation } from '@react-navigation/native'
import { userData } from '../apiData/UserData'
import { user_MTN_subscription, userSubscriptionCheck } from '../api/UserAPI'
import { showToast } from './ToastAlert'

export default function SingleMovieCard({ similar_movies, movie, subscriber }) {
    const navigator = useNavigation()
    // console.log('MOVIES === ', similar_movies);

    const {width: screenWidth, height: screenHeight} = Dimensions.get('screen');

    const [modalVisible, setModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isStatusCheck, setIsStatusCheck] = useState(false);
    const [isPaymentCheck, setIsPaymentCheck] = useState(false);

    const [verifySubscription, setVerifySubscription] = useState(null);

    verifySubscription

    const size = (screenWidth / 3) - 10;

    const myData = userData;

    const msisdn = subscriber != null ? subscriber.msisdn : 'N/A'
    const plan_id = myData.dailyPlanId;
    const network = myData.network.mtn;

    return (
        <View style={{borderRadius: 25, overflow: 'hidden'}}>
        <TouchableOpacity
            onPress={async () => {
                setIsStatusCheck(true)
                // setIsLoading(false)

                const subStatus = subscriber != null ? subscriber.subscription_status : 'N/A';

                console.log('CHECK STARTED');

                const statusCheck = await userSubscriptionCheck(msisdn);

                setIsStatusCheck(false)

                console.log('CHECK COMPLETED === ', statusCheck);

                var message_type = statusCheck['success'] == 'true' ? 'success' : 'error';

                if (statusCheck['data'] != null && statusCheck['data']['subscription_status'] == 'active') {
                    setModalVisible(false)
                    navigator.navigate('ViewAllMoviesPlayer', {
                        similar_movies: similar_movies,
                        singleMovie: movie,
                        subscriber: subscriber
                    });
                }else if(statusCheck['data'] != null && statusCheck['data']['subscription_status'] == 'inactive'){
                    showToast('Subscription status', 'You have no active subscription', message_type, 5000);
                    setModalVisible(true)
                } else {
                    showToast('Subscription status', statusCheck['message'], message_type, 5000);
                    setModalVisible(true)
                }
            }}
        >

            {/* WAITING MODAL */}
            <Modal
                transparent={true}
                visible={isStatusCheck}
                animationType="slide" // You can use 'fade' or 'none' for other effects
                onRequestClose={() => isStatusCheck(false)} // For Android back button
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalText}>Checking subscription status...</Text>
                        <View style={styles.modalButtonsContainer}>
                            {
                                isStatusCheck ? <ActivityIndicator color={'white'} /> : ''
                            }
                        </View>
                    </View>
                </View>
            </Modal>

            {/* SUBSCRIPTION REQUEST & CONFIRMATION MODAL */}
            <Modal
                transparent={true}
                visible={modalVisible}
                animationType="slide" // You can use 'fade' or 'none' for other effects
                onRequestClose={() => setModalVisible(false)} // For Android back button
            >
                <View style={styles.modalBackground}>
                    <View style={[
                        styles.modalContainer,
                        isPaymentCheck ?
                            { backgroundColor: AppStyles.generalColors.dark_one } : { backgroundColor: AppStyles.generalColors.dark_one }
                    ]}>
                        <Text style={styles.modalText}>{isPaymentCheck ? 'Verifying payment...' : 'No active subscription available'}</Text>
                        {
                            isLoading ? <ActivityIndicator color={'white'} /> : ''
                        }
                        {
                            isPaymentCheck ? '' :
                                <View style={styles.modalButtonsContainer}>
                                    <TouchableOpacity style={styles.modalButtonRed} onPress={() => setModalVisible(false)}>
                                        <Text style={styles.modalBtnText}>Cancel</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.modalButtonBlue} onPress={async () => {
                                        setIsLoading(true);
                                        console.log('SUBSCRIPTION REQUEST STARTED');

                                        const payload = {
                                            msisdn: msisdn,
                                            network: network,
                                            plan_id: plan_id
                                        }
                                        //Subscribing to a package
                                        const result = await user_MTN_subscription(payload);

                                        console.log('SUBSCRIPTION REQUEST COMPLETED === ', result);

                                        var message_type = result['success'] == 'true' ? 'success' : 'error';
                                        var alertTitle = isPaymentCheck ? 'Payment confirmation' : 'Subscription Request';
                                        var alertMessage = result['message'];

                                        showToast(alertTitle, alertMessage, message_type, 5000);

                                        if (result['success'] == 'true') {
                                            //Verifying user subscription / payment
                                            setIsPaymentCheck(true)
                                            setIsLoading(true)

                                            setTimeout(async () => {
                                                const verifySubscription = await userSubscriptionCheck(msisdn)
                                                console.log('PAYMENT VERIFICATION COMPLETED === ', verifySubscription);

                                                setModalVisible(false)

                                                setIsLoading(false)

                                                setIsPaymentCheck(false)


                                                if (verifySubscription['data'] != null && verifySubscription['data']['subscription_status'] == 'active') {
                                                    showToast('Verification Completed', verifySubscription['message'], 'error', 5000);
                                                    // setTimeout(() => {
                                                    navigator.navigate('MoviePlayer', {
                                                        singleMovie: movie
                                                    });
                                                    // }, 6000);
                                                } else if (verifySubscription['data'] != null && verifySubscription['data']['subscription_status'] == 'inactive') {
                                                    showToast('Verification Completed', `Subscription status: ${verifySubscription['data']['subscription_status'].toUpperCase()}`, 'success', 5000);
                                                } else {
                                                    showToast('Verification Error', 'Unable to verify subscription', 'error', 5000);
                                                }
                                            }, 30000);
                                        } else {
                                            showToast('Subscription Request Error', result['message'], 'error', 5000);
                                        }
                                    }}>
                                        <Text style={styles.modalBtnText}>Subscribe</Text>
                                    </TouchableOpacity>
                                </View>
                        }
                    </View>
                </View>
            </Modal>

            <WebView
                style={{
                    backgroundColor: AppStyles.generalColors.dark_four,
                    // padding: 10,
                    // flex: 1,
                    marginHorizontal: 5,
                    // marginBottom: 10,
                    width: size,
                    height: 200
                }}
                // source={{ uri: movie['video_url'] }}
                source={{ uri: movie['default_thumbnail_filename'], headers: { Referer: 'https://mcini.tv' } }}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                allowsInlineMediaPlayback={true}
                // onHttpError={handleHttpError}
                // onError={handleOnRenderProcessGone}
                renderError={() => (
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>Failed to load page.</Text>
                    </View>
                )}

            // onRenderProcessGone={handleOnRenderProcessGone}
            >
            </WebView>
        </TouchableOpacity>
        </View>
    )
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