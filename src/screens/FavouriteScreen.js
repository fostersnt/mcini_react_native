import { View, Text, FlatList, ActivityIndicator, StatusBar, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { userWatchListAPI } from '../api/UserAPI';
import { getStorageData } from '../utilities/LocalStorage';
import SingleFavouriteScreen from '../components/SingleFavouriteScreen';
import WebView from 'react-native-webview';
import AntIcons from 'react-native-vector-icons/AntDesign'
import { AppStyles } from '../utilities/AppStyles';

export default function FavouriteScreen() {
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);

  const truncateTitle = (title) => {
    return title != null && title.length > 20 ? `${title.substring(0, 20)}...` : title;
  };

  useEffect(() => {
    const myFavourites = async () => {
      try {
        const msisdn = await getStorageData();
        console.log('MY STORAGE DATA === ', msisdn);

        const data = await userWatchListAPI(msisdn);
        setFavourites(data.data);  // Use data.data as per your API response
        console.log('USER FAVOURITE MOVIES === ', data.data);
      } catch (error) {
        console.error('Error fetching favourites:', error);
      } finally {
        setLoading(false);  // Always set loading to false after the fetch
      }
    };

    myFavourites();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={{ flex: 1, justifyContent: 'center' }} />;
  }

  return (
    <View style={{
      flex: 1,
      backgroundColor: AppStyles.generalColors.dark_four,

    }}>
      {favourites != null && favourites.length > 0 ? (
        <FlatList
          data={favourites}
          keyExtractor={(item) => item.video.id.toString()}
          renderItem={({ item }) => (
            // <SingleFavouriteScreen movie={item.video} />
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
                padding: 10
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
                <TouchableOpacity onPress={() => {
                  console.log('FAVOURITE MOVIE DELETED');
                  const updatedMovies = favourites.filter(currentMovie => currentMovie.id !== item.id);
                  setFavourites(updatedMovies)
                }}>
                  <AntIcons name='delete' size={20}
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
          <Text>No favourites available</Text>
        </View>
      )}
    </View>
  );
}
