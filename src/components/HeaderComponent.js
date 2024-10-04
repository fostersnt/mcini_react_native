import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function HeaderComponent() {
    return (
        <View style={styles.viewContainer}>
            <Text>HeaderComponent</Text>
            <Text>HeaderComponent</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    viewContainer: {
        // flex: 1,
        // width: '100%',
        height: 500,
        backgroundColor: 'red',
        padding: 20,
        marginBottom: 20,
        // borderRadius: 20,
    }
})