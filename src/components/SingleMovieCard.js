import { View, Text } from 'react-native'
import React from 'react'
import { AppStyles } from '../utilities/AppStyles'
import WebView from 'react-native-webview'

export default function SingleMovieCard({movie, myWidth}) {
    
    const size = myWidth / 3;
    
    return (
        <WebView
            style={{
                backgroundColor: AppStyles.generalColors.dark_four,
                // padding: 10,
                // flex: 1,
                borderRadius: 10,
                marginHorizontal: 5,
                marginBottom: 10,
                width: size,
                height: 200
            }}
            source={{ uri: movie['default_thumbnail_filename'] }}
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
    )
}