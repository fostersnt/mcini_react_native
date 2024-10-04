import { View, Text, StyleSheet, ScrollView, StatusBar } from 'react-native'
import React from 'react'
import MoviePlayerScreen from './MoviePlayerScreen'
import HeaderComponent from '../components/HeaderComponent'

export default function HomeScreen() {
  return (
    <ScrollView style={styles.homeView} contentContainerStyle={styles.content}>
        <StatusBar hidden={true}></StatusBar>
        {/* <MoviePlayerScreen/> */}
        <HeaderComponent/>
        <HeaderComponent/>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    homeView: {
        flex: 1,
        // backgroundColor: 'yellow'
        // width: '100%',
        // height: '50%'
    },
    content: {
        // padding: 10
    }
})