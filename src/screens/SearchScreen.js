import { View, Text, ScrollView, StyleSheet, StatusBar, FlatList, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { movieListAPI } from '../api/MovieAPI';
import { AppStyles } from '../utilities/AppStyles';
import SingleSearchCard from './search/SingleSearchCard';
import Icon from 'react-native-vector-icons/FontAwesome5'
import Etypto from 'react-native-vector-icons/Entypo'
import { showToast } from '../components/ToastAlert';

export default function SearchScreen() {
  const [movies, setMovies] = useState(null);
  const [history, setHistory] = useState([]);
  const [foundMovies, setFoundMovies] = useState([]);
  const [inputText, setInputText] = useState([]);

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

  const handleUserInput = (text) => {
    const searchText = text.toLowerCase();
    if (searchText != '') {
      availableMovies = (movies == null || movies.length < 1) ? [] :
        movies.filter((item) => item.title.toLowerCase().includes(searchText))

      setFoundMovies(availableMovies);

      if (foundMovies.length > 0) {
        console.log('TOTAL FOUND MOVIES === ', foundMovies.length);
      } else {
        console.log('NO MOVIE FOUND === ', foundMovies[0]);
      }
    } else {
      setFoundMovies([])
      showToast('Search Error', 'No text entered', 'error', 3000);
    }
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.inputStyle}
          placeholder="Type something..."
          value={inputText}
          onChangeText={(userInput) => {
            setInputText(userInput)
            // handleUserInput(userInput)
          }}
        ></TextInput>
        <TouchableOpacity onPress={() => {
          console.log('SEARCH BUTTON CLICKED');
          handleUserInput(inputText)
        }}>
          <Icon name='search' color={'grey'} size={20} />
        </TouchableOpacity>
      </View>
      {foundMovies == null || foundMovies.length === 0 ? (
        <View style={styles.noMoviesContainer}>
          <Text style={{ color: 'white' }}>No movies found</Text>
        </View>
      ) : (
        <FlatList
          data={foundMovies}
          renderItem={({ item }) => {
            return (
              <View style={styles.componentContainer}>
                <Etypto name='cross' size={20} color={'white'} />
                <SingleSearchCard movie={item} />
                <View style={{width: 50}}>
                  <Text>{item['title']}</Text>
                </View>
                <TouchableOpacity>
                  <Etypto name='cross' size={20} color={'white'} />
                </TouchableOpacity>
              </View>
            )
          }}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: AppStyles.generalColors.dark_four,
    paddingTop: 40,
  },
  searchContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: AppStyles.generalColors.white_one,
    borderWidth: 1,
    borderColor: AppStyles.generalColors.white_one,
    paddingHorizontal: AppStyles.generalPadding.low,
    alignItems: 'center',
    marginHorizontal: AppStyles.generalMargin.low,
    marginBottom: AppStyles.generalMargin.higher,
    borderRadius: 20
  },
  componentContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    marginBottom: AppStyles.generalMargin.higher
  },
  inputStyle: {
    // color: AppStyles.generalColors.white_one,
    width: '90%'
  },
  noMoviesContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
})