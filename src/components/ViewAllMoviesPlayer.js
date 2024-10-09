import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView
} from 'react-native';
import WebView from 'react-native-webview';
import { Dimensions } from 'react-native';
import { AppStyles } from '../utilities/AppStyles';

const handleHttpError = (syntheticEvent) => {
    const { nativeEvent } = syntheticEvent;
    console.log('HTTP Error:', nativeEvent);
};

const handleOnRenderProcessGone = (syntheticEvent) => {
    const { nativeEvent } = syntheticEvent;
    console.warn('WebView Crashed: ', nativeEvent.didCrash);
}

function ViewAllMoviesPlayer({ singleMovie }) {
    const { width: screenWidth, height: screenHeight } = Dimensions.get('screen')

    console.log('NEW SINGLE MOVIE PLAYER === ', singleMovie['video_url']);

    return (
        <ScrollView style={styles.scrollView}>
            <View style={{
                    // width: screenWidth,
                    // height: screenHeight / 2,
                    borderRadius: 30,
                    overflow: 'hidden',
                    // backgroundColor: 'transparent'
                    marginBottom: AppStyles.generalMargin.higher
                }}>
            <WebView
                style={{
                    width: screenWidth,
                    height: screenHeight / 2,
                }}
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
            </WebView>
            </View>
            <View style={styles.contentContainer}>

            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        padding: 10,
        // backgroundColor: AppStyles.generalColors.dark_four
    },
    contentContainer: {
        height: 700,
        backgroundColor: AppStyles.generalColors.dark_one
    },
});

export default ViewAllMoviesPlayer;
