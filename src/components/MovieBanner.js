import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { AppStyles } from '../utilities/AppStyles'
import WebView from 'react-native-webview';

export default function MovieBanner({ movie, myWidth }) {
    // console.log('WIDTH === ', myWidth);
    const size = myWidth;

    const handleHttpError = (syntheticEvent) => {
        const { nativeEvent } = syntheticEvent;
        console.log('HTTP Error:', nativeEvent);
      };
      
      const handleOnRenderProcessGone = (syntheticEvent) => {
        const { nativeEvent } = syntheticEvent;
        console.warn('WebView Crashed: ', nativeEvent.didCrash);
      }

    return (
        <WebView
            style={{
                backgroundColor: AppStyles.generalColors.dark_four,
                // padding: 10,
                // flex: 1,
                borderRadius: 10,
                // marginRight: 10,
                marginBottom: 10,
                width: size,
                height: 400
            }}
            source={{ uri: movie['default_thumbnail_filename'] }}
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
    )
}

const styles = StyleSheet.create({

})