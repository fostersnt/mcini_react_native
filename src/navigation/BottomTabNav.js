import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/HomeScreen'
import SettingsScreen from '../screens/SettingsScreen'
import SearchScreen from '../screens/SearchScreen'
import FavouriteScreen from '../screens/FavouriteScreen'

const Tab = createBottomTabNavigator();

export default function BottomTabNav() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
      <Tab.Screen name="Favourites" component={FavouriteScreen} />
    </Tab.Navigator>
  )
}