import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
// import MoviePlayerScreen from '../screens/MoviePlayerScreen'
import BottomTabNav from './BottomTabNav';
import MoviePlayerScreen from '../screens/MoviePlayerScreen';
import TermsAndConditionsScreen from '../screens/profile/TermsAndConditionsScreen';
import PrivacyPolicyScreen from '../screens/profile/PrivacyPolicyScreen';
import WelcomeSliderScreen from '../screens/WelcomeSliderScreen';
import ViewAllMoviesComponent from '../components/ViewAllMoviesComponent';
import ViewAllMoviesPlayer from '../components/ViewAllMoviesPlayer';
import {AppStyles} from '../utilities/AppStyles';
import WatchListScreen from '../screens/WatchListScreen';
import GetStartedScreen from '../screens/GetStarted';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="WelcomeSlider"
        screenOptions={{
          // headerShown: true,
          // headerTitle: '',
          headerShown: false,
          headerStyle: {
            backgroundColor: AppStyles.generalColors.dark_one,
          },
          headerTintColor: AppStyles.generalColors.blue,
          // headerBackTitleVisible: false, // Hides the back button's title
          // headerTitle: '', // Ensures no header title
        }}>
        <Stack.Screen name="WelcomeSlider" component={WelcomeSliderScreen} />
        <Stack.Screen name="WatchList" component={WatchListScreen}
        options={{
          headerShown: true,
          title: 'Watch List',
        }}
        />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="MoviePlayer" component={MoviePlayerScreen}
        options={{
          headerShown: true,
          title: 'Movie Player',
        }}
        />
        <Stack.Screen
          name="TermsAndConditions"
          component={TermsAndConditionsScreen}
          options={{
            headerShown: true,
            title: 'Terms & Conditions',
          }}
        />
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen}
        options={{
          headerShown: true,
          title: 'Privacy Policy',
        }}
        />
        <Stack.Screen name="ViewAllMovies" component={ViewAllMoviesComponent}
        options={{
          headerShown: true,
          title: 'All Related Movies',
        }}
        />
        <Stack.Screen
          name="ViewAllMoviesPlayer"
          component={ViewAllMoviesPlayer}
        />
        <Stack.Screen
          name="GetStarted"
          component={GetStartedScreen}
        />
        <Stack.Screen
          name="BottomTabNav"
          component={BottomTabNav}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
