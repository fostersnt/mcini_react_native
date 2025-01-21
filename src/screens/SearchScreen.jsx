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
import SubscriptionModal from '../components/SubscriptionModal';
import {userSubscriptionCheck} from '../api/UserAPI';
import {showToast} from '../components/ToastAlert';
import {userData} from '../apiData/UserData';

export default function SearchScreen() {
  const movies = useSelector(state => state.movie.movies);
  const subscriber = useSelector(state => state.subscriber.subscriberDetails);

  const [foundMovies, setFoundMovies] = useState([]);
  const [myMovie, setMyMovie] = useState(null);
  // const [inputText, setInputText] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isStatusCheck, setIsStatusCheck] = useState(false);
  const [isPaymentCheck, setIsPaymentCheck] = useState(false);

  const myData = userData;
  const msisdn = subscriber ? subscriber.msisdn : 'N/A';
  const plan_id = myData.MTN_dailyPlanId;
  const network = myData.network.mtn;

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

  // const onMoviePressedFunc = () => {
  //   navigator.navigate('MoviePlayer', {singleMovie: currentMovie});
  // };

  return (
    <View style={styles.mainContainer}>
      {/* <StatusBar hidden={true}></StatusBar> */}
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
            setMyMovie(item);
            return (
              <View style={styles.componentContainer}>
                <TouchableOpacity
                  onPress={async () => {
                    // console.log("PRESSED === ", item);
                    setIsStatusCheck(true);
                    const statusCheck = await userSubscriptionCheck(
                      subscriber.msisdn,
                    );
                    console.log('SUBSCRIPTION STATUS CHECK === ', statusCheck);

                    setIsStatusCheck(false);
                    const status =
                      statusCheck.data != null
                        ? statusCheck.data.subscription_status
                        : 'N/A';
                    if (status.toLowerCase() === 'active') {
                      console.log("MY MOVIE === ", myMovie);
                      
                      navigator.navigate('MoviePlayer', {
                        singleMovie: myMovie,
                      });
                    } else if (status.toLowerCase() === 'inactive') {
                      setModalVisible(true);
                    } else {
                      showToast(
                        'Subscription Check',
                        'Unknown error occurred',
                        'error',
                        5000,
                      );
                      console.log('UNKNOWN SUBSCRIPTION STATUS');
                    }
                    console.log('STATUS CHECK RESPONSE === ', status);
                  }}>
                  <View style={styles.movieTitleContainer}>
                    <Octicons name="history" size={20} color={'white'} />
                    <Text style={styles.movieTitle}>{item.title}</Text>
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
      <SubscriptionModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        isStatusCheck={isStatusCheck}
        setIsStatusCheck={setIsStatusCheck}
        isPaymentCheck={isPaymentCheck}
        setIsPaymentCheck={setIsPaymentCheck}
        msisdn={msisdn}
        network={network}
        plan_id={plan_id}
        movie={myMovie}
        navigation={navigator}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  movieTitle: {
    color: 'white',
    marginLeft: 10,
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
    backgroundColor: AppStyles.generalColors.dark_one,
    // paddingTop: 40,
    padding: 10,
  },
  searchContainer: {
    marginTop: 50,
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
