import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { addOrRemoveFavorite} from '../api/UserAPI';
import { getStorageData } from '../utilities/LocalStorage';
import WebView from 'react-native-webview';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { AppStyles } from '../utilities/AppStyles';

export default function FavoriteScreen() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const truncateTitle = (title) => {
    return title != null && title.length > 20 ? `${title.substring(0, 20)}...` : title;
  };

  useEffect(() => {
    const myFavorites = async () => {
      try {
        const storageData = await getStorageData();

        const subscriberFavorites = storageData.favorites;

        if (subscriberFavorites != null && subscriberFavorites.length > 0) {
          console.log('SUBSCRIBER WATCH-LIST FROM STORAGE === ', subWatchList[0]['video_url']);
        }
        console.log('NO SUBSCRIBER WATCH-LIST FROM STORAGE');

        setFavorites(subscriberFavorites);  // Use data.data as per your API response
        // console.log('USER FAVOURITE MOVIES === ', data.data);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      } finally {
        setLoading(false);  // Always set loading to false after the fetch
      }
    };

    myFavorites();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={{ flex: 1, justifyContent: 'center' }} />;
  }

  return (
    <View style={{
      flex: 1,
      backgroundColor: AppStyles.generalColors.dark_four,
    }}>
      {favorites != null && favorites.length > 0 ? (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View
              style={{
                backgroundColor: AppStyles.generalColors.dark_one,
                flex: 1,
                // width: '100%',
                height: 100,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
                padding: 10,
                marginBottom: 10
              }}
            >
              <View
                style={{
                  width: '40%',
                  marginRight: 5,
                }}
              >
                <WebView
                  source={{ uri: item['video']['default_thumbnail_filename'] }}
                  javaScriptEnabled={true}
                  domStorageEnabled={true}
                  allowsInlineMediaPlayback={true}
                  style={{
                    borderRadius: 10
                  }}
                />
              </View>
              <View
                style={{
                  // flexDirection: 'row',
                  // flexWrap: 'wrap'
                  // marginRight: 5,
                }}
              >
                <Text
                  style={{
                    flexWrap: 'wrap',
                    color: AppStyles.generalColors.white_one,
                  }}
                >{truncateTitle(item['video']['title'])}</Text>
              </View>
              <View>
                <TouchableOpacity onPress={async () => {
                  console.log('FAVOURITE MOVIE DELETED');
                  const msisdn = await getStorageData();
                  const movieId = item.id;
                  const payload = {
                    msisdn: msisdn,
                    movieId: movieId,
                    isFavorite: 0
                  }
                  const result = await addOrRemoveFavorite(payload);
                  if (result['success'] == 'true') {
                    const updatedMovies = favorites.filter(currentMovie => currentMovie.id !== item.id);
                    setFavorites(updatedMovies)
                  }
                }}>
                  <Ionicons name='remove-circle-outline' size={20}
                    style={{
                      color: AppStyles.generalColors.white_one,
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
          contentContainerStyle={{ paddingTop: 40 }}
        />
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text
            style={{ color: AppStyles.generalColors.white_one }}
          >No favorites available</Text>
        </View>
      )}
    </View>
  );
}
