import { View, Text, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { userFavouriteMoviesAPI, userWatchListAPI } from '../api/UserAPI';
import { getStorageData } from '../utilities/LocalStorage';

export default function FavouriteScreen() {

  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const myFavourites = async () => {
      const msisdn = await getStorageData();
      console.log('MY STORAGE DATA === ', msisdn);
      
      const data = await userWatchListAPI(msisdn);
      // const data = await userFavouriteMoviesAPI(msisdn);
      setFavourites(data['data']);
      console.log('USER FAVOURITE MOVIES === ', data);
      
    }

    myFavourites();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      {
        favourites != null && favourites.length > 0 ? (
        <FlatList 
          data={favourites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={{
              backgroundColor: 'yellow',
              height: 200,
              marginBottom: 10,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Text>{item['movie_guid']}</Text>
            </View>
          )}
          style={{
            marginTop: 40
          }}
        />
      ) : (
        <Text>No favourites available</Text>
      )}
    </View>
  )
}
