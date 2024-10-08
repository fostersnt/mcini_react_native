import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { AppStyles } from '../../utilities/AppStyles'
import WebView from 'react-native-webview'

export default function SingleSearchCard({ movie }) {
    // console.log('DATA DATA === ', movie['video_url']);

    return (
        // <View style={styles.viewContainer}>
        //     <View style={styles.innerContainer}>
                <WebView
                style={styles.webView}
                    source={{ uri: movie['default_thumbnail_filename'], headers: { Referer: 'https://mcini.tv' } }}
                >
                </WebView>
        //         <Text style={styles.textStyle}>SingleSearchCard</Text>
        //     </View>
        // </View>
    )
}

const styles = StyleSheet.create({
    viewContainer: {
        padding: AppStyles.generalPadding.low,
        display: 'flex',
        justifyContent: 'space-between'
    },
    webView: {
        flex: 1,
        width: 100,
        height: 100,
        borderRadius: 30,
        marginHorizontal: 5,
    },
    innerContainer: {
        display: 'flex',
        flexDirection: 'row',
    },
    textStyle: {
        color: AppStyles.generalColors.white_one
    }
})