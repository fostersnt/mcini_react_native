import { View, Text, TouchableOpacity, Modal, StyleSheet, Button, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { AppStyles } from '../utilities/AppStyles'
import WebView from 'react-native-webview'
import { useNavigation } from '@react-navigation/native'
import MoviePlayerScreen from '../screens/MoviePlayerScreen'
import { userData } from '../apiData/UserData'
import { user_MTN_subscription, userSubscriptionCheck } from '../api/UserAPI'
import Toast from 'react-native-toast-message'
import { showToast } from './ToastAlert'

export default function SingleMovieCard({ movie, myWidth, subscriber }) {
    const navigator = useNavigation()

    const [modalVisible, setModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isStatusCheck, setIsStatusCheck] = useState(false);

    const size = myWidth / 3;

    const myData = userData;

    const msisdn = subscriber != null ? subscriber.msisdn : 'N/A'
    const plan_id = myData.dailyPlanId;
    const network = myData.network.mtn;

    return (
        <TouchableOpacity
            onPress={async () => {
                setIsStatusCheck(true)
                setIsLoading(false)

                const subStatus = subscriber != null ? subscriber.subscription_status : 'N/A';

                console.log('CHECK STARTED');

                const statusCheck = await userSubscriptionCheck(msisdn);

                setIsStatusCheck(false)

                console.log('CHECK COMPLETED === ', statusCheck);

                var message_type = statusCheck['success'] == 'true' ? 'success' : 'error';

                if (statusCheck['data'] != null && statusCheck['data']['subscription_status'] == 'active') {
                    // showToast('Subscription status', statusCheck['message'], message_type, 3000);

                    setTimeout(() => {
                        navigator.navigate('MoviePlayer', {
                            singleMovie: movie
                        }, 3000);
                    })
                } else {
                    showToast('Subscription status', statusCheck['message'], message_type, 3000);
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

            {/* ACTION MODAL */}
            <Modal
                transparent={true}
                visible={modalVisible}
                animationType="slide" // You can use 'fade' or 'none' for other effects
                onRequestClose={() => setModalVisible(false)} // For Android back button
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalText}>No active subscription available</Text>
                        {
                            isLoading ? <ActivityIndicator color={'white'} /> : ''
                        }
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

                                const result = await user_MTN_subscription(payload);

                                console.log('SUBSCRIPTION REQUEST COMPLETED === ', result);

                                var message_type = result['success'] == 'true' ? 'success' : 'error';

                                setModalVisible(false)

                                setIsLoading(false)

                                if (result['success'] == 'true') {
                                    showToast('Subscription Request', result['message'], message_type, 3000);

                                    //WRITE CODE TO VERIFY SUBSCRIPTION STATUS
                                    //result['data'] != null && result['data']['subscription_status'] == 'active'

                                    // setTimeout(() => {
                                    //     navigator.navigate('MoviePlayer', {
                                    //         singleMovie: movie
                                    //     }, 3000);
                                    // })
                                } else {
                                    showToast('Subscription Request', result['message'], 'error', 5000);
                                }
                            }}>
                                <Text style={styles.modalBtnText}>Subscribe</Text>
                            </TouchableOpacity>
                            {/* <Button style={styles.modalButtonRed} title="Cancel" color={'red'} /> */}
                            {/* <Button style={styles.modalButtonBlue} title="Subscribe" onPress={() => setModalVisible(false)} /> */}
                        </View>
                    </View>
                </View>
            </Modal>

            <WebView
                style={{
                    backgroundColor: AppStyles.generalColors.dark_four,
                    // padding: 10,
                    // flex: 1,
                    borderRadius: 10,
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