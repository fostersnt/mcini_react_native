import {View, Text, StyleSheet, FlatList, StatusBar} from 'react-native';
import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import SingleMovieCard from './SingleMovieCard';
import {AppStyles} from '../utilities/AppStyles';
import {useSelector} from 'react-redux';

export default function ViewAllMoviesComponent() {
  const route = useRoute();
  const navigator = useNavigation();

  const movies = useSelector(state => state.movie.movies);

  const {collection_name} = route.params;

  const similar_movies =
    movies != null
      ? movies.filter(
          currentMovie => currentMovie.collection_name === collection_name,
        )
      : null;

  const handleMoviePressedFunc = movie => {
    navigator.navigate('ViewAllMoviesPlayer', {singleMovie: movie});
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar translucent backgroundColor={'transparent'} />
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>
          {similar_movies[0].collection_name}
        </Text>
      </View>
      <FlatList
        initialNumToRender={3}
        maxToRenderPerBatch={2}
        removeClippedSubviews
        numColumns={3}
        data={similar_movies}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return (
            <View style={styles.viewAllContainer}>
              <SingleMovieCard
                movie={item}
                onMoviePressedFunc={handleMoviePressedFunc}
              />
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: AppStyles.generalColors.dark_one,
    paddingTop: 30,
    paddingBottom: 40,
  },
  titleContainer: {
    display: 'flex',
    marginLeft: 5,
  },
  titleText: {
    fontSize: 20,
    color: 'white',
  },
  viewAllContainer: {
    flex: 1,
    paddingTop: 10,
  },
});
