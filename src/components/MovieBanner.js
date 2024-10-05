import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function MovieBanner() {
    return (
        <View style={styles.viewContainer}>
            <Text style={styles.txtContent}>MovieBanner</Text>
            <Text style={styles.txtContent}>MovieBanner</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    viewContainer: {
        // flex: 1,
        // width: '100%',
        height: 500,
        backgroundColor: 'black',
        padding: 20,
        marginBottom: 20,
        // borderRadius: 20,
    },
    txtContent: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
    }
})