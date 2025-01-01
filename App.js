import React, {useEffect} from 'react';

import {StatusBar, StyleSheet, View} from 'react-native';

import AppNavigation from './src/navigation/AppNavigation';
import Toast from 'react-native-toast-message';
import {appStore} from './src/redux/store/appStore';
import {Provider} from 'react-redux';
import {AppStyles} from './src/utilities/AppStyles';


function App() {
  // useEffect(() => {
  //   // Start the background task when the app loads
  //   const initBackgroundTask = () => {
  //     bgTask(); // Call the function to start the background task
  //   };
  //   initBackgroundTask();
  // }, []);

  return (
    <Provider store={appStore}>
      <View style={styles.viewContainer}>
        <AppNavigation />
        {/* <Toast config={ToastAlertConfig} /> */}
        <Toast />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    padding: '50',
  },
});

export default App;
