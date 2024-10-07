import { View, Text, TouchableOpacity, Modal, StyleSheet, Button } from 'react-native'
import React, { useState } from 'react'
import { AppStyles } from '../utilities/AppStyles'
import WebView from 'react-native-webview'
import { useNavigation } from '@react-navigation/native'
import MoviePlayerScreen from '../screens/MoviePlayerScreen'

export default function SingleMovieCard({ movie, myWidth, subscriber }) {
    const navigator = useNavigation()

    const [modalVisible, setModalVisible] = useState(false);

    const size = myWidth / 3;

    return (
        <TouchableOpacity
            onPress={() => {
                const subStatus = subscriber != null ? subscriber.subscription_status : 'N/A';
                if (subStatus == 'active') {
                    navigator.navigate('MoviePlayer', {
                        singleMovie: movie
                    });
                } else {
                    setModalVisible(true)
                }
            }}
        >
            <Modal
                transparent={true}
                visible={modalVisible}
                animationType="slide" // You can use 'fade' or 'none' for other effects
                onRequestClose={() => setModalVisible(false)} // For Android back button
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalText}>No active subscription available</Text>
                        <View style={styles.modalButtonsContainer}>
                            <TouchableOpacity style={styles.modalButtonRed} onPress={() => setModalVisible(false)}>
                                <Text style={styles.modalBtnText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalButtonBlue} onPress={() => setModalVisible(false)}>
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
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalText: {
        marginBottom: 20,
        textAlign: 'center',
        fontSize: 16,
    },
    modalBtnText: {
        // marginBottom: 20,
        textAlign: 'center',
        fontSize: 16,
        color: AppStyles.generalColors.white_one,
        fontWeight: AppStyles.generalFontWeight.weight_one
    },
});