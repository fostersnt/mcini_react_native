import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    StatusBar
} from 'react-native';
import WebView from 'react-native-webview';

const handleHttpError = (syntheticEvent) => {
    const { nativeEvent } = syntheticEvent;
    console.log('HTTP Error:', nativeEvent);
};

const handleOnRenderProcessGone = (syntheticEvent) => {
    const { nativeEvent } = syntheticEvent;
    console.warn('WebView Crashed: ', nativeEvent.didCrash);
}

function ViewAllMoviesPlayer({ singleMovie }) {

    // console.log('NEW SINGLE MOVIE PLAYER === ', singleMovie);

    return (
        <View style={styles.videoContainer}>
            <WebView
                style={styles.videoContainer}
                source={{ uri: singleMovie['video_url'], headers: { Referer: 'https://mcini.tv' } }}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                allowsInlineMediaPlayback={true}
                onHttpError={handleHttpError}
                onError={handleOnRenderProcessGone}
                renderError={() => (
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>Failed to load page.</Text>
                    </View>
                )}

                onRenderProcessGone={handleOnRenderProcessGone}
            >
                {/* <StatusBar translucent backgroundColor={'transparent'}></StatusBar> */}

            </WebView>
        </View>
    );
}

const styles = StyleSheet.create({
    videoContainer: {
        // flex: 1,
        width: '100%',  // Use '100%' instead of '100'
        height: '50%',    // Set a specific height
        // marginBottom: 20
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8d7da',
    },
    errorText: {
        color: '#721c24',
        fontSize: 18,
    },
});

export default ViewAllMoviesPlayer;
