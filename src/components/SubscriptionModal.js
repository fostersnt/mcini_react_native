// SubscriptionModal.js
import React from 'react';
import { View, Text, Modal, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import { AppStyles } from '../utilities/AppStyles';
import { showToast } from './ToastAlert';
import { user_MTN_subscription, userSubscriptionCheck } from '../api/UserAPI';

const SubscriptionModal = ({
    modalVisible,
    setModalVisible,
    isLoading,
    setIsLoading,
    isStatusCheck,
    setIsStatusCheck,
    isPaymentCheck,
    setIsPaymentCheck,
    msisdn,
    network,
    plan_id,
    movie,
    navigation
}) => {

    const handleSubscribe = async () => {
        setIsLoading(true);
        const payload = { msisdn, network, plan_id };
        
        const result = await user_MTN_subscription(payload);
        const message_type = result['success'] === 'true' ? 'success' : 'error';
        const alertTitle = isPaymentCheck ? 'Payment confirmation' : 'Subscription Request';

        showToast(alertTitle, result['message'], message_type, 5000);

        if (result['success'] === 'true') {
            setIsPaymentCheck(true);
            setTimeout(async () => {
                const verifySubscription = await userSubscriptionCheck(msisdn);
                setModalVisible(false);
                setIsLoading(false);
                setIsPaymentCheck(false);
                
                if (verifySubscription['data']?.subscription_status === 'active') {
                    showToast('Verification Completed', verifySubscription['message'], 'success', 5000);
                    navigation.navigate('MoviePlayer', { singleMovie: movie });
                } else {
                    showToast('Verification Completed', `Subscription status: ${verifySubscription['data']['subscription_status'].toUpperCase()}`, 'error', 5000);
                }
            }, 30000);
        } else {
            showToast('Subscription Request Error', result['message'], 'error', 5000);
        }
    };

    return (
        <>
            {/* WAITING MODAL */}
            <Modal
                transparent={true}
                visible={isStatusCheck}
                animationType="slide"
                onRequestClose={() => setIsStatusCheck(false)}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalText}>Checking subscription status...</Text>
                        {isStatusCheck && <ActivityIndicator color={'white'} />}
                    </View>
                </View>
            </Modal>

            {/* SUBSCRIPTION REQUEST & CONFIRMATION MODAL */}
            <Modal
                transparent={true}
                visible={modalVisible}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalBackground}>
                    <View style={[styles.modalContainer, { backgroundColor: AppStyles.generalColors.dark_one }]}>
                        <Text style={styles.modalText}>{isPaymentCheck ? 'Verifying payment...' : 'No active subscription available'}</Text>
                        {isLoading && <ActivityIndicator color={'white'} />}
                        {!isPaymentCheck && (
                            <View style={styles.modalButtonsContainer}>
                                <TouchableOpacity style={styles.modalButtonRed} onPress={() => setModalVisible(false)}>
                                    <Text style={styles.modalBtnText}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.modalButtonBlue} onPress={handleSubscribe}>
                                    <Text style={styles.modalBtnText}>Subscribe</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                </View>
            </Modal>
        </>
    );
};

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
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
        color: AppStyles.generalColors.white_one
    },
    modalBtnText: {
        textAlign: 'center',
        fontSize: 16,
        color: AppStyles.generalColors.white_one,
        fontWeight: AppStyles.generalFontWeight.weight_one
    },
});

export default SubscriptionModal;
