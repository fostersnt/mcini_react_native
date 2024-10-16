import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'
// import MoviePlayerScreen from '../screens/MoviePlayerScreen'
import BottomTabNav from './BottomTabNav'
import MoviePlayerScreen from '../screens/MoviePlayerScreen'
import TermsAndConditionsScreen from '../screens/profile/TermsAndConditionsScreen'
import PrivacyPolicyScreen from '../screens/profile/PrivacyPolicyScreen'
import WelcomeSliderScreen from '../screens/WelcomeSliderScreen'
import ViewAllMoviesComponent from '../components/ViewAllMoviesComponent'
import ViewAllMoviesPlayer from '../components/ViewAllMoviesPlayer'
import { AppStyles } from '../utilities/AppStyles'

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='WelcomeSlider' screenOptions={{headerShown: false}}>
        {/* <Stack.Screen name="MoviePlayer" component={MoviePlayerScreen} /> */}
        <Stack.Screen name="WelcomeSlider" component={WelcomeSliderScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="MoviePlayer" component={MoviePlayerScreen} />
        <Stack.Screen name="TermsAndConditions" component={TermsAndConditionsScreen} />
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
        <Stack.Screen name="ViewAllMovies" component={ViewAllMoviesComponent} />
        <Stack.Screen name="ViewAllMoviesPlayer" component={ViewAllMoviesPlayer} />
        <Stack.Screen name="BottomTabNav" component={BottomTabNav} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}