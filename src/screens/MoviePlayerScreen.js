import { useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  ActivityIndicator
} from 'react-native';
import WebView from 'react-native-webview';
import { AppStyles } from '../utilities/AppStyles';

const handleHttpError = (syntheticEvent) => {
  const { nativeEvent } = syntheticEvent;
  console.log('HTTP Error:', nativeEvent);
};

const handleOnRenderProcessGone = (syntheticEvent) => {
  const { nativeEvent } = syntheticEvent;
  console.warn('WebView Crashed: ', nativeEvent.didCrash);
}

const handleRetry = () => {
  setError(false);
  setKey((prevKey) => prevKey + 1);
};

function MoviePlayerScreen() {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [key, setKey] = useState(0);

  const route = useRoute();
  const { singleMovie } = route.params;
  const url = "https://iframe.mediadelivery.net/embed/182548/e941715e-7de1-4875-a42b-c52a982fa72c?autoplay=true";
  console.log('SINGLE MOVIE TEST === ', singleMovie);

  return (
    <View
      style={styles.videoContainer}
    >
      {loading && !error && <ActivityIndicator size="large" color="#fff" style={styles.loader} />}
      {!error ? (
        <WebView
          style={styles.videoContainer}
          source={{ uri: singleMovie['video_url'] }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          allowsInlineMediaPlayback={true}
          onHttpError={handleHttpError}
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
          onError={() => setError(true)}
          renderError={() => (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>Failed to load page.</Text>
            </View>
          )}

          onRenderProcessGone={handleOnRenderProcessGone}
        >
          <StatusBar translucent backgroundColor={'transparent'}></StatusBar>

        </WebView>
      ) : (
        <View>
          <Button title="Retry" onPress={handleRetry} />
        </View>
      )}
    </View>
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
    backgroundColor: AppStyles.generalColors.dark_four
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
