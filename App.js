import React from 'react';

import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import AppNavigation from './src/navigation/AppNavigation';
import Toast from 'react-native-toast-message';
import ToastWithRef from './src/components/ToastAlert';
import ToastAlertConfig from './src/components/ToastAlertConfig';

function App() {
  return (
    <View style={styles.viewContainer}>
      <AppNavigation />
      {/* <Toast config={ToastAlertConfig} /> */}
      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: 'plum',
    padding: '50'
  }
});

export default App;
