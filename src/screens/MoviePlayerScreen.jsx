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
import Video from 'react-native-video';

function MoviePlayerScreen() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [key, setKey] = useState(0);

  const route = useRoute();

  const {singleMovie} = route.params;
  // const singleMovie = route.params?.singleMovie;
console.log("SINGLE MOVIE === ", singleMovie);


  const handleRetry = () => {
    setLoading(true)
    setError(false);
    setKey((prevKey) => prevKey + 1);
  };

  // console.log('MY SINGLE MOVIE === ', singleMovie['video_url']);


  return (
    <View style={styles.videoContainer}>
      {loading && !error && (
        <ActivityIndicator size="large" color="#fff" style={styles.loader} />
      )}
      {!error ? (
      //   <Video
      //   source={{ uri: singleMovie.video_url, headers: { Referer: 'https://mcini.tv' }}} // Replace with the path to your video file
      //   style={styles.backgroundVideo}
      //   resizeMode="cover"
      //   repeat
      //   muted
      //   // fullscreen
      //   paused={false}
      // />
        <WebView
          key={key} // Add key to force re-render on retry
          style={styles.webView}
          source={{ uri: singleMovie.video_url, headers: { Referer: 'https://mcini.tv' } }}
          javaScriptEnabled
          domStorageEnabled
          allowsInlineMediaPlayback
          mediaPlaybackRequiresUserAction={false}
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
          onError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            console.warn('WebView error: ', nativeEvent);
            setError(true);
          }}
          renderError={() => (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>Failed to load the video.</Text>
              <Button title="Retry" onPress={handleRetry} />
            </View>
          )}
        >
          {/* <StatusBar translucent backgroundColor={'transparent'} /> */}
        </WebView>
      ) : (
        <View style={styles.retryContainer}>
          {/* <Text style={styles.errorText}>Failed to load the video.</Text> */}
          <Button title="Retry" onPress={handleRetry} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  videoContainer: {
    flex: 1,
    backgroundColor: AppStyles.generalColors.dark_four,
    // width: '100%',
    // height: '100%',
    // justifyContent: 'center',
    // alignItems: 'center', // Center content horizontally
  },
  webView: {
    backgroundColor: AppStyles.generalColors.dark_four,
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

  errorText: {
    color: '#721c24',
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default MoviePlayerScreen;
