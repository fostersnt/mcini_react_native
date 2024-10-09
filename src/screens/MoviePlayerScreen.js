import { useRoute } from '@react-navigation/native';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar
} from 'react-native';
import WebView from 'react-native-webview';

const handleHttpError = (syntheticEvent) => {
  const { nativeEvent } = syntheticEvent;
  console.log('HTTP Error:', nativeEvent);
};

const handleOnRenderProcessGone = (syntheticEvent) => {
  const { nativeEvent } = syntheticEvent;
  console.warn('WebView Crashed: ', nativeEvent.didCrash);
}

function MoviePlayerScreen() {
const route = useRoute();
const {singleMovie} = route.params;
  const url = "https://iframe.mediadelivery.net/embed/182548/e941715e-7de1-4875-a42b-c52a982fa72c?autoplay=true";
  console.log('SINGLE MOVIE TEST === ', singleMovie);
  
  return (
    <WebView
      style={styles.videoContainer}
      source={{ uri: singleMovie['video_url'] }}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      allowsInlineMediaPlayback={true}
      onHttpError={handleHttpError}
      onError={handleOnRenderProcessGone}
      renderError={() => (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Failed to load page.</Text>
        </View>
      )}

      onRenderProcessGone={handleOnRenderProcessGone}
    >
      <StatusBar translucent backgroundColor={'transparent'}></StatusBar>

    </WebView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  videoContainer: {
    flex: 1,
    width: '100%',  // Use '100%' instead of '100'
    height: 300,    // Set a specific height
    // marginBottom: 20
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8d7da',
  },
  errorText: {
    color: '#721c24',
    fontSize: 18,
  },
});

export default MoviePlayerScreen;
