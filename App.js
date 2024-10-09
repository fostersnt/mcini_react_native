import React from 'react';

import {
  StyleSheet,
  View,
} from 'react-native';

import AppNavigation from './src/navigation/AppNavigation';
import Toast from 'react-native-toast-message';

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
    padding: '50'
  }
});

export default App;
