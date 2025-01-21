import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import {addOrRemoveFavorite} from '../api/UserAPI';
import WebView from 'react-native-webview';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AppStyles} from '../utilities/AppStyles';
import {useDispatch, useSelector} from 'react-redux';
import {reduceStringLength} from '../utilities/Validations';
import {
  addMovieToFavorites,
  setFavoriteMovies,
} from '../redux/slice/MovieSlice';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

export default function FavoriteScreen() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const subscriber = useSelector(state => state.subscriber.subscriberDetails);
  const favorites = useSelector(state => state.movie.favoriteMovies);
  const {width: screenWidth} = Dimensions.get('screen');

  const navigator = useNavigation();

  // console.log('FAVORITE === ', favorites);

  const renderContent = () => {
    // if (loading && !refreshing) {
    //   return <ActivityIndicator size="large" color="white" style={{ flex: 1, justifyContent: 'center' }} />;
    // }

    if (favorites && favorites.length > 0) {
      return (
        <FlatList
          data={favorites}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <View style={styles.mainContainer}>
              <TouchableOpacity
                onPress={() => {
                  console.log('LOG');
                  navigator.navigate('MoviePlayer', {singleMovie: item});
                }}>
                <View style={styles.imageAndTextContainer}>
                  <FastImage
                    source={{
                      uri: item.default_thumbnail_filename,
                      headers: {Referer: 'https://mcini.tv'},
                      cache: FastImage.cacheControl.immutable,
                      priority: FastImage.priority.high,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                    style={[styles.fastImage, {width: screenWidth / 3 + 20, height: 200}]}
                  />
                  <View style={{width: screenWidth / 2}}>
                    <Text
                      style={styles.titleText}>
                      {reduceStringLength(20, item.title)}
                    </Text>
                    <Text
                      style={styles.descriptionText}>
                      {reduceStringLength(90, item.description)}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
              <View>
                <TouchableOpacity
                  onPress={async () => {
                    if (favorites != null && favorites.length > 0) {
                      const updatedMovies = favorites.filter(
                        currentMovie => currentMovie.id !== item.id,
                      );
                      dispatch(setFavoriteMovies(updatedMovies));
                    }

                    const msisdn = subscriber.msisdn;

                    const movieId = item.id;
                    const payload = {
                      msisdn: `${msisdn}`,
                      movieId: `${movieId}`,
                      isFavorite: `${0}`,
                    };

                    const result = await addOrRemoveFavorite(payload);

                    if (result.success !== 'true') {
                      dispatch(addMovieToFavorites(item));
                    }
                    console.log('FAVORITE REMOVAL RESPONSE === ', result);

                  }}>
                  <Ionicons
                    name="remove-circle-outline"
                    size={25}
                    style={{color: AppStyles.generalColors.white_one}}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
          contentContainerStyle={{paddingTop: 40}}
          // refreshing={refreshing}
          // onRefresh={fetchFavorites}
        />
      );
    }

    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{color: AppStyles.generalColors.white_one}}>
          No favorites available
        </Text>
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: AppStyles.generalColors.dark_one,
        paddingTop: 20,
      }}>
      {renderContent()}
    </View>
  );
}

const styles = StyleSheet.create({
  descriptionText: {
    marginTop: 5,
    color: AppStyles.generalColors.white_one,
    // fontWeight: AppStyles.generalFontWeight.weight_one,
  },
  titleText: {
    // flexWrap: 'wrap',
    color: AppStyles.generalColors.white_one,
    fontWeight: AppStyles.generalFontWeight.weight_one,
  },
  imageAndTextContainer: {
    // paddingVertical: 25,
    height: 200,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingTop: 10,
  },
  mainContainer: {
    backgroundColor: AppStyles.generalColors.dark_one,
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 5,
    marginBottom: 10,
  },
  fastImage: {
    borderRadius: 15,
    marginRight: 10,
  },
});
