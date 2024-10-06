import { View, Text, StyleSheet, ScrollView, StatusBar, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import MoviePlayerScreen from './MoviePlayerScreen'
import MovieBanner from '../components/MovieBanner'
import { movieListAPI } from '../api/MovieAPI'
import { AppStyles } from '../utilities/AppStyles'
import { useRoute } from '@react-navigation/native'
import SingleMovieCard from '../components/SingleMovieCard'

export default function HomeScreen() {
  //Retrieving route data
  const route = useRoute();

  const { subscriber, movies, favourites, watchList } = route.params;

  // console.log('HOME SCREEN MOVIES === ', movies);
  console.log('HOME SCREEN MOVIE URL === ', movies[0]['video_url']);


  const [subscriberData, setSubsciber] = useState(subscriber)

  const [movieList, setMovieList] = useState(movies);

  const [favouritesData, setFavouritesData] = useState(favourites);

  const [watchListData, setWatchListData] = useState(watchList);

  const [isRefreshing, setIsRefreshing] = useState(false);


  // useEffect(() => {
  //   const getMovieData = async () => {
  //     const movieData = await movieListAPI()
  //     setMovieList(movieData)
  //   };

  //   getMovieData();
  // }, []);
  const handleRefresh = () => {
    console.log('HELLO WORLD');
  }

  const renderedItem = ({ item }) => {
    return (<SingleMovieCard
      movie={item}
    />)
  }

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
      <MoviePlayerScreen
        videoURL={movieList[0]['video_url']}
      />
      <FlatList
        pagingEnabled
        data={movieList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={ renderedItem }
        // horizontal
        showsHorizontalScrollIndicator
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
        style={{
          // backgroundColor: AppStyles.generalColors.white_one
        }}
      />
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
    // flex: 1,
  },
  content: {
    // padding: 10
  }
})