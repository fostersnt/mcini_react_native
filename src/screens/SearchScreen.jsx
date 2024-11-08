import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {AppStyles} from '../utilities/AppStyles';
import Etypto from 'react-native-vector-icons/Entypo';
import Octicons from 'react-native-vector-icons/Octicons';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

export default function SearchScreen() {
  const movies = useSelector(state => state.movie.movies);

  const [foundMovies, setFoundMovies] = useState([]);
  // const [inputText, setInputText] = useState([]);

  const inputRef = useRef();

  const navigator = useNavigation();

  const handleUserInput = text => {
    const searchText = text.toLowerCase();
    if (searchText !== '') {
      const availableMovies =
        movies == null || movies.length < 1
          ? []
          : movies.filter(item =>
              item.title.toLowerCase().includes(searchText),
            );

      setFoundMovies(availableMovies);
    }
  };

  const handleCancellation = movie => {
    const initialCount = foundMovies.length;

    const myAvailableMovies = foundMovies.filter(
      currentMovie => currentMovie.id !== movie.id,
    );

    const countFlag = initialCount - 1;

    setFoundMovies(myAvailableMovies);

    if (countFlag === 0) {
      inputRef.current = '';
      // setInputText('');
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.inputStyle}
          placeholder="Type movie title here..."
          placeholderTextColor={'white'}
          value={inputRef.current}
          onChangeText={userInput => {
            inputRef.current = userInput;
            // setInputText(userInput)
            if (userInput === '') {
              setFoundMovies([]);
            } else {
              // setTimeout(() => {
              handleUserInput(userInput);
              // }, 50);
            }
          }}
        />
        <TouchableOpacity
          onPress={() => {
            inputRef.current = '';
            // setInputText('')
            setFoundMovies([]);
          }}>
          <Etypto name="cross" size={20} color={'white'} />
        </TouchableOpacity>
      </View>
      {foundMovies == null || foundMovies.length === 0 ? (
        <View style={styles.noMoviesContainer}>
          <Text style={styles.noMovies}>No movies found</Text>
        </View>
      ) : (
        <FlatList
          data={foundMovies}
          renderItem={({item}) => {
            return (
              <View style={styles.componentContainer}>
                <TouchableOpacity
                  onPress={() => {
                    navigator.navigate('MoviePlayer', {singleMovie: item});
                  }}>
                  <View style={styles.movieTitleContainer}>
                    <Octicons name="history" size={20} color={'white'} />
                    <Text style={styles.movieTitle}>
                      {item.title}
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    handleCancellation(item);
                  }}>
                  <Etypto name="cross" size={20} color={'white'} />
                </TouchableOpacity>
              </View>
            );
          }}
          keyExtractor={item => item.id.toString()}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  movieTitle: {
    color: 'white',
    marginLeft: 10
  },
  movieTitleContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  noMovies: {
    color: 'white',
    fontSize: AppStyles.generalFontSize.small,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: AppStyles.generalColors.dark_four,
    paddingTop: 40,
    padding: 10,
  },
  searchContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: AppStyles.generalColors.white_one,
    backgroundColor: '#282d33',
    // borderWidth: 1,
    borderColor: AppStyles.generalColors.white_one,
    paddingHorizontal: AppStyles.generalPadding.low,
    alignItems: 'center',
    marginHorizontal: AppStyles.generalMargin.low,
    marginBottom: AppStyles.generalMargin.higher,
    borderRadius: 20,
  },
  componentContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    marginBottom: 40,
  },
  inputStyle: {
    // color: AppStyles.generalColors.white_one,
    // backgroundColor: '#282d33',
    color: 'white',
    width: '90%',
    fontSize: AppStyles.generalFontSize.small,
  },
  noMoviesContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
