import { View, Text } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'

export default function SearchScreen() {
  const route = useRoute();
  const {movies} = route.params;
  console.log('SEARCH MOVIES SCREEN === ', movies != null && movies.length > 0 ? movies[0] : []);
  
  return (
    <View>
      <Text>SearchScreen</Text>
    </View>
  )
}