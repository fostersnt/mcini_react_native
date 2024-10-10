import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { addOrRemoveFavourite } from '../api/UserAPI';
import { getStorageData, storeData } from '../utilities/LocalStorage';
import WebView from 'react-native-webview';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AppStyles } from '../utilities/AppStyles';
import { showToast } from '../components/ToastAlert';

export default function FavouriteScreen() {
  const [favourites, setFavourites] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [dataFromStorage, setDataFromStorage] = useState(null);
  const [subscriberData, setSubscriberData] = useState(null);

  const truncateTitle = (title) => {
    return title != null && title.length > 20 ? `${title.substring(0, 20)}...` : title;
  };

  const fetchFavourites = async () => {

    setLoading(true);
    setRefreshing(true);

    try {
      const storageData = await getStorageData();
      if (storageData != null) {
        setDataFromStorage(storageData);
        setFavourites(storageData.favourites);
        setSubscriberData(storageData.subscriber);
      }
    } catch (error) {
      console.error('Error fetching favourites:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchFavourites();
  }, []);

  const renderContent = () => {
    if (loading && !refreshing) {
      return <ActivityIndicator size="large" color="white" style={{ flex: 1, justifyContent: 'center' }} />;
    }

    if (favourites && favourites.length > 0) {
      return (
        <FlatList
          data={favourites}
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
                  {truncateTitle(item['title'])}
                </Text>
              </View>
              <View>
                <TouchableOpacity onPress={async () => {
                  // const favourites = dataFromStorage != null ? dataFromStorage.favourites : [];

                  if (favourites != null && favourites.length > 0) {
                    const updatedMovies = favourites.filter(currentMovie => currentMovie.id !== item.id);
                    console.log('UPDATED FAVOURITES === ', updatedMovies);
                    
                    setFavourites(updatedMovies);
                    dataFromStorage.favourites = favourites;
                    await storeData(dataFromStorage)
                    console.log('STORAGE STORAGE');

                  }
                  console.log('EXISTING FAVOURITES === ', favourites);
                  
                  if (favourites != null && favourites.length == 0) {
                    console.log('ggggggggg');
                    
                    setFavourites([]);
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

                  const result = await addOrRemoveFavourite(payload);

                  console.log('FAVOURITES RESPONSE === ', result);

                  if (result['success'] === 'true') {
                    showToast('Favourites', result['message'], 'success', 3000)
                  } else {
                    showToast('Favourites', result['message'], 'error', 5000)
                  }
                }}>
                  <Ionicons name='remove-circle-outline' size={20} style={{ color: AppStyles.generalColors.white_one }} />
                </TouchableOpacity>
              </View>
            </View>
          )}
          contentContainerStyle={{ paddingTop: 40 }}
          refreshing={refreshing}
          onRefresh={fetchFavourites}
        />
      );
    }

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: AppStyles.generalColors.white_one }}>
          {refreshing ? 'Refreshing...' : 'No favourites available'}
        </Text>
        <TouchableOpacity onPress={fetchFavourites} style={{
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
