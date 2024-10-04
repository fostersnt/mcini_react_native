import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/HomeScreen'
import SettingsScreen from '../screens/SettingsScreen'
import SearchScreen from '../screens/SearchScreen'
import FavouriteScreen from '../screens/FavouriteScreen'
import Icon from 'react-native-vector-icons/FontAwesome5'
import IonIcons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntIcons from 'react-native-vector-icons/AntDesign'

const Tab = createBottomTabNavigator();

const getIcon = ({name, color, size}) => {
    return (
        <Icon name={name} color={color} size={size}/>
    )
}

export default function BottomTabNav() {
  return (
    <Tab.Navigator 
    // initialRouteName='Home'
    screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#23527c',
        tabBarInactiveTintColor: '#fff',
        tabBarInactiveBackgroundColor: '#23527c',
        tabBarActiveBackgroundColor: '#fff',
        tabBarShowLabel: false
        }}>
      <Tab.Screen name="Home" component={HomeScreen} options={{tabBarIcon: ({color, size}) => (
        <AntIcons name='home' color={color} size={size} />
      )}} />
      <Tab.Screen name="Search" component={SearchScreen} options={{tabBarIcon: ({color, size}) => (
        <Icon name='search' color={color} size={size} />
      )}} />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{tabBarIcon: ({color, size}) => (
        <IonIcons name='settings-outline' color={color} size={size} />
      )}} />
      <Tab.Screen name="Favourites" component={FavouriteScreen} options={{tabBarIcon: ({color, size}) => (
        <MaterialIcons name='favorite-outline' color={color} size={size} />
      )}} />
    </Tab.Navigator>
  )
}