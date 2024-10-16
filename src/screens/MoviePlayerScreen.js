import { useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ActivityIndicator,
  Button,
} from 'react-native';
import WebView from 'react-native-webview';
import { AppStyles } from '../utilities/AppStyles';

function MoviePlayerScreen() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [key, setKey] = useState(0);

  const route = useRoute();

  const singleMovie = route.params?.singleMovie;

  if (!singleMovie) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No movie data available.</Text>
      </View>
    );
  }

  const handleHttpError = (syntheticEvent) => {
    const { nativeEvent } = syntheticEvent;
    console.log('HTTP Error:', nativeEvent);
  };

  const handleOnRenderProcessGone = (syntheticEvent) => {
    const { nativeEvent } = syntheticEvent;
    console.warn('WebView Crashed: ', nativeEvent.didCrash);
  };

  const handleRetry = () => {
    setError(false);
    setKey((prevKey) => prevKey + 1);
  };

  return (
    <View style={styles.videoContainer}>
      {loading && !error && (
        <ActivityIndicator size="large" color="#fff" style={styles.loader} />
      )}
      {!error ? (
        <WebView
          key={key} // Add key to force re-render on retry
          style={styles.webView}
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
              <Button title="Retry" onPress={handleRetry} />
            </View>
          )}
          onRenderProcessGone={handleOnRenderProcessGone}
        >
          <StatusBar translucent backgroundColor={'transparent'} />
        </WebView>
      ) : (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Failed to load the video.</Text>
          <Button title="Retry" onPress={handleRetry} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  videoContainer: {
    flex: 1,
    width: '100%',
    height: 300, // Fixed height for the video container
    backgroundColor: AppStyles.generalColors.dark_four,
    justifyContent: 'center',
    alignItems: 'center', // Center content horizontally
  },
  webView: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  loader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -25 }, { translateY: -25 }], // Adjust for centering
    zIndex: 1, // Ensure it appears above the WebView
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8d7da',
    padding: 20,
  },
  errorText: {
    color: '#721c24',
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default MoviePlayerScreen;
