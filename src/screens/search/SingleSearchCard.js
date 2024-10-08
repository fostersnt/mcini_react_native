import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { AppStyles } from '../../utilities/AppStyles'
import WebView from 'react-native-webview'

export default function SingleSearchCard({ movies, movie_id }) {
    return (
        <ScrollView>
            <View style={styles.viewContainer}>
                {/* <View style={styles.innerContainer}>
                    <WebView>

                    </WebView>
                </View> */}
                <Text style={styles.textStyle}>SingleSearchCard</Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    viewContainer: {
        padding: AppStyles.generalPadding.low,
        borderColor: 'grey',
        borderBottomWidth: 1,
        display: 'flex',
        justifyContent: 'space-between'
    },
    innerContainer: {
        display: 'flex',
        flexDirection: 'row',
    },
    textStyle: {
        color: AppStyles.generalColors.white_one
    }
})