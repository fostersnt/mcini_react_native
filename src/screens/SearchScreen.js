import { View, Text, ScrollView, StyleSheet, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import { movieListAPI } from '../api/MovieAPI';
import { AppStyles } from '../utilities/AppStyles';

export default function SearchScreen() {
  const [movies, setMovies] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      console.log('SEARCH MOVIE API STARTED');

      const movieResult = await movieListAPI();
      const movieData = movieResult['data'];
      setMovies(movieData)

      console.log('SEARCH SCREEN COMPLETED');
      // console.log('SEARCH RESULT === ', movieResult['data'][0]);
    }

    fetchMovies();
  }, []);

  return (
    <ScrollView style={styles.mainContainer}>
      <View>
        <Text>SearchScreen</Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: AppStyles.generalColors.red_one
  }
})