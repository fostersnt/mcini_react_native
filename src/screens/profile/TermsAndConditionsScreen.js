import { View, Text } from 'react-native'
import React from 'react'
import { TermsAndConditions } from '../../utilities/TermsAndConditions'

export default function TermsAndConditionsScreen() {
  return (
    <View>
      <Text>
        {TermsAndConditions.introduction}
      </Text>
    </View>
  )
}