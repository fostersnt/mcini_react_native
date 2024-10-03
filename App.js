import React from 'react';

import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import AppNavigation from './src/navigation/AppNavigation';

function App() {
  return (
    // <SafeAreaView style={styles.viewContainer}>
      <View style={styles.viewContainer}>
        <AppNavigation />
      </View>
    // </SafeAreaView>
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
