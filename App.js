import React from 'react';

import {
  StyleSheet,
  View,
} from 'react-native';

import AppNavigation from './src/navigation/AppNavigation';
import Toast from 'react-native-toast-message';
import { appStore } from './src/redux/store/appStore';
import { Provider } from 'react-redux';

function App() {
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
    padding: '50'
  }
});

export default App;
