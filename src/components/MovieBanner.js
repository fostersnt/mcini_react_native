import { View, Text, StyleSheet, Image, Dimensions } from 'react-native'
import React from 'react'
import { AppStyles } from '../utilities/AppStyles'
import WebView from 'react-native-webview';

export default function MovieBanner({ movie, myWidth }) {
    // console.log('WIDTH === ', myWidth);
    /*
        The value 10 is based on the padding given to the parent container of this component. This component is used
        in HomeScreen.js
    */
   const {width: screenWidth, height: screenHeight} = Dimensions.get('screen');
    const widthSize = screenWidth; 
    const heightSize = screenHeight; 

    const handleHttpError = (syntheticEvent) => {
        const { nativeEvent } = syntheticEvent;
        console.log('HTTP Error:', nativeEvent);
    };

    const handleOnRenderProcessGone = (syntheticEvent) => {
        const { nativeEvent } = syntheticEvent;
        console.warn('WebView Crashed: ', nativeEvent.didCrash);
    }

    return (
        <View style={{
            borderRadius: 20,
            overflow: 'hidden',
            // padding: 10,
        }}>
            <WebView
                style={{
                    backgroundColor: AppStyles.generalColors.dark_four,
                    // flex: 1,
                    // marginRight: 10,
                    marginBottom: 10,
                    width: widthSize,
                    height: 400
                }}
                source={{ uri: movie['default_thumbnail_filename'], headers: { Referer: 'https://mcini.tv' } }}
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
    )
}

const styles = StyleSheet.create({

})