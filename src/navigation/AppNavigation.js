import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'
// import MoviePlayerScreen from '../screens/MoviePlayerScreen'
import BottomTabNav from './BottomTabNav'
import MoviePlayerScreen from '../screens/MoviePlayerScreen'
import TermsAndConditionsScreen from '../screens/profile/TermsAndConditionsScreen'

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='Login' screenOptions={{headerShown: false}}>
        {/* <Stack.Screen name="MoviePlayer" component={MoviePlayerScreen} /> */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="MoviePlayer" component={MoviePlayerScreen} />
        <Stack.Screen name="BottomTabNav" component={BottomTabNav} />
        <Stack.Screen name="TermsAndConditions" component={TermsAndConditionsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}