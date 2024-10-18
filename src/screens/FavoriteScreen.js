import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, Dimensions } from 'react-native';
import React, { useState } from 'react';
import { addOrRemoveFavorite } from '../api/UserAPI';
import WebView from 'react-native-webview';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AppStyles } from '../utilities/AppStyles';
import { useDispatch, useSelector } from 'react-redux';
import { reduceStringLength } from '../utilities/Validations';
import { addMovieToFavorites, setFavoriteMovies } from '../redux/slice/MovieSlice';
import { useNavigation } from '@react-navigation/native';

export default function FavoriteScreen() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const subscriber = useSelector((state) => state.subscriber.subscriberDetails);
  const favorites = useSelector((state) => state.movie.favoriteMovies);
  const { width: screenWidth } = Dimensions.get('screen');

  const navigator = useNavigation();

  // console.log('FAVORITE === ', favorites);

  const renderContent = () => {
    if (loading && !refreshing) {
      return <ActivityIndicator size="large" color="white" style={{ flex: 1, justifyContent: 'center' }} />;
    }

    if (favorites && favorites.length > 0) {
      return (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View
              style={{
                backgroundColor: AppStyles.generalColors.dark_one,
                flex: 1,
                height: 100,
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
                padding: 10,
                marginHorizontal: 10,
                marginBottom: 10,
                borderRadius: 20
              }}
            >
              <TouchableOpacity
                style={{
                  // width: '40%',
                  marginRight: 5,
                  borderRadius: 20,
                  overflow: 'hidden'
                }}
                onPress={
                  () => {
                    console.log('LOG');

                    navigator.navigate('MoviePlayer', { singleMovie: item });
                  }
                }>
                <View style={{
                  // width: '40%',
                  flex: 1,
                  marginRight: 5,
                  borderRadius: 20,
                  overflow: 'hidden'
                }}>
                  <WebView
                    source={{ uri: item['default_thumbnail_filename'], headers: { Referer: 'https://mcini.tv' } }}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    allowsInlineMediaPlayback={true}
                    style={{ borderRadius: 10, width: screenWidth / 3, height: 100 }}
                  />
                </View>
              </TouchableOpacity>
              <View style={{ width: screenWidth / 3 }}>
                <Text style={{ flexWrap: 'wrap', color: AppStyles.generalColors.white_one }}>
                  {reduceStringLength(40, item['title'])}
                </Text>
              </View>
              <View>
                <TouchableOpacity onPress={async () => {
                  if (favorites != null && favorites.length > 0) {
                    const updatedMovies = favorites.filter(currentMovie => currentMovie.id != item.id);
                    dispatch(setFavoriteMovies(updatedMovies));
                  }

                  const msisdn = subscriber.msisdn;

                  const movieId = item.id;
                  const payload = {
                    msisdn: `${msisdn}`,
                    movieId: `${movieId}`,
                    isFavorite: `${0}`
                  };

                  const result = await addOrRemoveFavorite(payload);

                  console.log('FAVOURITES RESPONSE === ', result);

                  if (result['success'] != 'true') {
                    dispatch(addMovieToFavorites(item));
                  }
                }}>
                  <Ionicons name='remove-circle-outline' size={25} style={{ color: AppStyles.generalColors.white_one }} />
                </TouchableOpacity>
              </View>
            </View>
          )}
          contentContainerStyle={{ paddingTop: 40 }}
        // refreshing={refreshing}
        // onRefresh={fetchFavorites}
        />
      );
    }

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: AppStyles.generalColors.white_one }}>No favorites available</Text>
      </View>
    );
  };

  return (
    <View style={{
      flex: 1,
      backgroundColor: AppStyles.generalColors.dark_four,
    }}>
      {renderContent()}
    </View>
  );
}
