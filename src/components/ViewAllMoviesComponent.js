import { View, Text } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native';
import MoviePlayerScreen from '../screens/MoviePlayerScreen';

export default function ViewAllMoviesComponent() {
  const route = useRoute()

  const {similar_movies, single_movie} = route.params;
  
  // console.log('COLLECTION NAME === ',  collection_name);
  // console.log('SINGLE MOVIE === ',  single_movie);

  console.log('SIMILAR MOVIES VIEW ALL === ',  single_movie);
  
  return (
    <View>
      <MoviePlayerScreen 
        singleMovie = {single_movie}
      />
      <Text>ViewAllMoviesComponent</Text>
    </View>
  )
}