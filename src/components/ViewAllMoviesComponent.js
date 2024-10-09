import { View, Text, StyleSheet, FlatList, StatusBar } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native';
import MoviePlayerScreen from '../screens/MoviePlayerScreen';
import WebView from 'react-native-webview';
import ViewAllMoviesPlayer from './ViewAllMoviesPlayer';
import SingleMovieCard from './SingleMovieCard';
import { AppStyles } from '../utilities/AppStyles';

export default function ViewAllMoviesComponent() {
  const route = useRoute()

  const { similar_movies, subscriber } = route.params;

  // console.log('COLLECTION NAME === ',  collection_name);
  // console.log('SINGLE MOVIE === ',  single_movie);

  // console.log('SIMILAR MOVIES VIEW ALL NOW === ', single_movie);

  return (
    <View style={styles.mainContainer}>
      <StatusBar translucent backgroundColor={'transparent'}></StatusBar>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{similar_movies[0].collection_name}</Text>
      </View>
      <FlatList
        numColumns={3}
        data={similar_movies}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <View
              style={styles.viewAllContainer}
            >
              <SingleMovieCard similar_movies={similar_movies} movie={item} subscriber={subscriber} />
            </View>
          )
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: AppStyles.generalColors.dark_one,
    paddingTop: 30
  },
  titleContainer: {
    // flex: 1,
    display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
    marginLeft: 5
  },
  titleText: {
    fontSize: 20,
    color: 'white'
  },
  viewAllContainer: {
    flex: 1,
    paddingTop: 10
    // height: '50%'
  }
})