import { View, Text } from 'react-native'
import React from 'react'
import { AppStyles } from '../utilities/AppStyles'

export default function SingleMovieCard({movie}) {
  return (
    <View
        style={{
            backgroundColor: AppStyles.generalColors.white_one,
            padding: 10,
            borderRadius: 10,
            margin: 10
        }}
    >
      <Text>{movie['video_url']}</Text>
    </View>
  )
}