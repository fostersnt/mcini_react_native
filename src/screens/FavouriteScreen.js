import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { addOrRemoveFavorite } from '../api/UserAPI';
import { getStorageData, storeData } from '../utilities/LocalStorage';
import WebView from 'react-native-webview';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AppStyles } from '../utilities/AppStyles';
import { showToast } from '../components/ToastAlert';
import { useSelector } from 'react-redux';
import { reduceStringLength } from '../utilities/Validations';

export default function FavoriteScreen() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [dataFromStorage, setDataFromStorage] = useState(null);
  const [subscriberData, setSubscriberData] = useState(null);

  // const subData = useSelector((state) => state.subscriber.subscriberDetails);
  const favorites = useSelector((state) => state.movie.favoriteMovies);

  // const fetchFavorites = async () => {
  //   setLoading(true);
  //   setRefreshing(true);

  //   try {
  //     const storageData = await getStorageData();
  //     if (storageData != null) {
  //       setDataFromStorage(storageData);
  //       setFavorites(storageData.favorites);
  //       setSubscriberData(storageData.subscriber);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching favorites:', error);
  //   } finally {
  //     setLoading(false);
  //     setRefreshing(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchFavorites();
  // }, []);

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
                marginBottom: 10
              }}
            >
              <View style={{ width: '40%', marginRight: 5 }}>
                <WebView
                  source={{ uri: item['default_thumbnail_filename'] }}
                  javaScriptEnabled={true}
                  domStorageEnabled={true}
                  allowsInlineMediaPlayback={true}
                  style={{ borderRadius: 10 }}
                />
              </View>
              <View>
                <Text style={{ flexWrap: 'wrap', color: AppStyles.generalColors.white_one }}>
                  {reduceStringLength(item['title'])}
                </Text>
              </View>
              <View>
                <TouchableOpacity onPress={async () => {
                  // const favorites = dataFromStorage != null ? dataFromStorage.favorites : [];

                  if (favorites != null && favorites.length > 0) {
                    const updatedMovies = favorites.filter(currentMovie => currentMovie.id !== item.id);
                    console.log('UPDATED FAVOURITES === ', updatedMovies);
                    
                    setFavorites(updatedMovies);
                    dataFromStorage.favorites = favorites;
                    await storeData(dataFromStorage)
                    console.log('STORAGE STORAGE');

                  }
                  console.log('EXISTING FAVOURITES === ', favorites);
                  
                  if (favorites != null && favorites.length == 0) {
                    console.log('ggggggggg');
                    
                    setFavorites([]);
                  }

                  console.log('FAVOURITE MOVIE DELETED');

                  const data = dataFromStorage;
                  const msisdn = data.msisdn;

                  const movieId = item.id;
                  const payload = {
                    msisdn: msisdn,
                    movieId: `${movieId}`,
                    isFavorite: `${0}`
                  };

                  const result = await addOrRemoveFavorite(payload);

                  console.log('FAVOURITES RESPONSE === ', result);

                  if (result['success'] === 'true') {
                    showToast('Favorites', result['message'], 'success', 3000)
                  } else {
                    showToast('Favorites', result['message'], 'error', 5000)
                  }
                }}>
                  <Ionicons name='remove-circle-outline' size={20} style={{ color: AppStyles.generalColors.white_one }} />
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
        <Text style={{ color: AppStyles.generalColors.white_one }}>
          {refreshing ? 'Refreshing...' : 'No favorites available'}
        </Text>
        <TouchableOpacity onPress={() => console.log('REFRESH BUTTON CLICKED')} style={{
          marginTop: 20,
          padding: 10,
          backgroundColor: AppStyles.generalColors.dark_one, // Adjust your button styles here
          borderRadius: 5
        }}>
          <Text style={{ color: '#fff' }}>Refresh</Text>
        </TouchableOpacity>
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
