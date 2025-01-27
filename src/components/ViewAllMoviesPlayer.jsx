import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Button,
} from 'react-native';
import WebView from 'react-native-webview';
import {Dimensions} from 'react-native';
import {AppStyles} from '../utilities/AppStyles';
import SingleMovieCard from './SingleMovieCard';
import {useNavigation, useRoute} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {
  addMovieToFavorites,
  setFavoriteMovies,
} from '../redux/slice/MovieSlice';
import {isInternetActive} from '../utilities/InternetConnection';
import {addOrRemoveFavorite} from '../api/UserAPI';
import {userData} from '../apiData/UserData';

const ViewAllMoviesPlayer = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [key, setKey] = useState(0);

  const {width: screenWidth, height: screenHeight} = Dimensions.get('screen');
  const myWidth = screenWidth / 3 - 10;
  const myHeight = 200;

  const widthSize = screenWidth;
  const [isFavorite, setIsFavorite] = useState(false);
  const navigator = useNavigation();

  const dispatch = useDispatch();
  const route = useRoute();
  const {singleMovie} = route.params;

  const movies = useSelector(state => state.movie.movies);
  const favorites = useSelector(state => state.movie.favoriteMovies);
  const subscriber = useSelector(state => state.subscriber.subscriberDetails);

  const similar_movies =
    movies != null
      ? movies.filter(
          currentMovie =>
            currentMovie.collection_name === singleMovie.collection_name,
        )
      : null;

  // console.log('SINGLE MOVIE COLLECTION NAME === ', singleMovie.collection_name);

  const isDescription = singleMovie?.description != null;

  const handleSingleMoviePress = movie => {
    navigator.navigate('ViewAllMoviesPlayer', {singleMovie: movie});
  };

  const handleRetry = () => {
    setLoading(true);
    setError(false);
    setKey(prevKey => prevKey + 1);
  };

  const toggleFavorite = async () => {
    const currentFavoriteState = isFavorite;
    let isFavoriteParameter = 0;
    //NB: setIsFavorite() doesn't immediately update the isFavorite state. That's how useSate() works
    setIsFavorite(!isFavorite);
    if (currentFavoriteState === true) {
      const updatedFavorites =
        favorites != null && favorites.length > 0
          ? favorites.filter(item => item.id != singleMovie.id)
          : null;
      dispatch(setFavoriteMovies(updatedFavorites));
    } else {
      dispatch(addMovieToFavorites(singleMovie));
      isFavoriteParameter = 1;
    }

    //Set favorite action to the API
    const payload = {
      msisdn: `${subscriber.msisdn}`,
      isFavorite: `${isFavoriteParameter}`,
      movieId: `${singleMovie.id}`,
    };

    try {
      const result = await addOrRemoveFavorite(payload);
      console.log('FAVORITE DETAILS: ', result);
    } catch (error) {
      console.log('FAVORITE ADD/REMOVE ERROR: ', error.toString());
    }
  };

  useEffect(() => {
    const checkInternet = async () => {
      const favoriteCheck =
        favorites != null && favorites.length > 0
          ? favorites.some(item => item.id === singleMovie.id)
          : false;
      if (favoriteCheck === true) {
        setIsFavorite(true);
      }
      const isActive = await isInternetActive();
      if (isActive) {
        console.log('Internet is active');
      } else {
        console.log('No active internet connection');
      }
    };
    checkInternet();
  }, [favorites, singleMovie]);

  const FavoriteIcon = React.memo(({isFavorite, toggleFavorite}) => {
    return (
      <TouchableWithoutFeedback onPress={toggleFavorite}>
        <Ionicons
          name={isFavorite ? 'heart' : 'heart-outline'}
          size={25}
          color={isFavorite ? '#00aeef' : '#fff'}
          style={{marginLeft: 20}}
        />
      </TouchableWithoutFeedback>
    );
  });

  return (
    <View style={styles.contentContainer}>
      <View>
        {loading && !error && (
          <ActivityIndicator size="large" color="#fff" style={styles.loader} />
        )}
        {!error ? (
          <View style={[styles.webView, {width: widthSize}]}>
            <WebView
              key={key}
              source={{
                uri: singleMovie.video_url,
                headers: {Referer: 'https://mcini.tv'},
              }}
              javaScriptEnabled
              domStorageEnabled
              onLoadStart={() => setLoading(true)}
              onLoadEnd={() => setLoading(false)}
              onError={() => setError(true)}
              allowsInlineMediaPlayback
              // mediaPlaybackRequiresUserAction={false}
              // onShouldStartLoadWithRequest={(request) => {
              //     return request.url.startsWith('https://trusted-video-source.com');  // Filter out non-trusted sources
              // }}
            />
            {isDescription && (
              <Text style={[styles.descriptionText]}>
                {singleMovie.description}
              </Text>
            )}
          </View>
        ) : (
          <View style={[styles.retryContainer, {width: widthSize}]}>
            <View style={[styles.retryView, {width: widthSize / 2}]}>
              <Button title="Retry" onPress={handleRetry} />
            </View>
          </View>
        )}
        <View
          style={[styles.iconsContainer, {marginTop: isDescription ? 0 : 20}]}>
          <FontAwesome
            name="thumbs-o-up"
            size={25}
            color="#fff"
            style={{marginLeft: 10}}
          />
          <Entypo
            name="share"
            size={25}
            color="#fff"
            style={{marginLeft: 20}}
          />
          <FavoriteIcon
            isFavorite={isFavorite}
            toggleFavorite={toggleFavorite}
          />
        </View>
      </View>
      {/* renderMainMovie() */}
      <FlatList
        contentContainerStyle={styles.flatlistContainer}
        numColumns={3}
        data={similar_movies}
        // data={[{id: 0, title: 'my video'}, ...similar_movies]}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View style={{marginBottom: 10}}>
            <SingleMovieCard
              movie={item}
              onMoviePressedFunc={handleSingleMoviePress}
              myWidth={myWidth}
              myHeight={myHeight}
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  retryContainer: {
    backgroundColor: AppStyles.generalColors.dark_four,
    height: 400,
    zIndex: 1,
    flex: 1,
    flexDirection: 'column',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatlistContainer: {
    // alignItems: 'center',
  },
  webView: {
    backgroundColor: AppStyles.generalColors.dark_four,
    height: 350,
    zIndex: 1,
    // marginHorizontal: 5,
  },
  loader: {
    position: 'absolute',
    top: 200,
    left: '50%',
    transform: [{translateX: -25}, {translateY: -25}],
    zIndex: 10,
  },
  contentContainer: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: AppStyles.generalColors.dark_one,
  },
  descriptionContainer: {
    // alignItems: 'center',
    marginBottom: 20,
    color: 'white',
    padding: 5,
  },
  descriptionText: {
    color: 'white',
    backgroundColor: AppStyles.generalColors.dark_one,
    fontSize: 16,
    // flexWrap: 'wrap',
    // textAlign: 'left',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  iconsContainer: {
    marginBottom: 20,
    flexDirection: 'row',
  },
});

export default ViewAllMoviesPlayer;
