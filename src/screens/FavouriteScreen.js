import { View, Text } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'

export default function FavouriteScreen() {
  const route = useRoute();
  const {favourites} = route.params

  console.log('FAVOURITES === ', favourites);
  
  return (
    <View
      style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      {favourites != null && favourites.length > 0 ? <Text>FAVOURITE MOVIES ARE AVAILABLE</Text> : ''}
      <Text>FavouriteScreen</Text>
      <Text>FavouriteScreen</Text>
    </View>
  )
}