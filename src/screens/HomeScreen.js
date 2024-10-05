import { View, Text, StyleSheet, ScrollView, StatusBar } from 'react-native'
import React, { useState, useEffect } from 'react'
import MoviePlayerScreen from './MoviePlayerScreen'
import MovieBanner from '../components/MovieBanner'
import { movieListAPI } from '../api/MovieAPI'
import { AppStyles } from '../utilities/AppStyles'
import { useRoute } from '@react-navigation/native'

export default function HomeScreen() {
  //Retrieving route data
  const route = useRoute();
  const {movies} = route.params;
  console.log('HOME SCREEN MOVIES === ', movies);
  
  const [userWatchList, setUserWatchList] = useState(movies)
  
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const getMovieData = async () => {
      const movieData = await movieListAPI()
      setMovieList(movieData)
    };

    getMovieData();
  }, []);

  return (
    <View style={[
      styles.homeView,
      {
        backgroundColor: AppStyles.generalColors.dark_one,
        paddingTop: AppStyles.generalPadding.top,
        padding: AppStyles.generalPadding.low
      }
    ]}>
      <StatusBar translucent backgroundColor={'transparent'}></StatusBar>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <MoviePlayerScreen videoURL={userWatchList[0]['video_url']}></MoviePlayerScreen>
        <MovieBanner />
        <MovieBanner />
        <MovieBanner />
        <MovieBanner />
        <MovieBanner />
        <MovieBanner />
        <MovieBanner />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  homeView: {
    flex: 1,
    // backgroundColor: 'yellow'
    // width: '100%',
    // height: '50%'
  },
  scrollView: {
    flex: 1,
  },
  content: {
    // padding: 10
  }
})