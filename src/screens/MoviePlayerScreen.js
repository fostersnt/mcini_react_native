import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  ActivityIndicator
} from 'react-native';
import { useRoute } from '@react-navigation/native';
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

function MoviePlayerScreen() {
  const route = useRoute();
  const { singleMovie } = route.params;
  const [loading, setLoading] = useState(true); // State to manage loading

  return (
    <View style={styles.container}>
      {loading && (
        <ActivityIndicator 
          size="large" 
          color="#fff" // Customize your loading indicator color
          // color="#00aeef" // Customize your loading indicator color
          style={styles.loadingIndicator} 
        />
      )}
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
        onLoadStart={() => setLoading(true)} // Show loading indicator
        onLoadEnd={() => setLoading(false)} // Hide loading indicator
      />
      <StatusBar translucent backgroundColor={'transparent'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  videoContainer: {
    flex: 1,
    width: '100%',
    height: 300,
    backgroundColor: AppStyles.generalColors.dark_four,
  },
  loadingIndicator: {
    // position: 'absolute',
    // top: '50%',
    // left: '50%',
    // marginLeft: -15, // Half the width of the indicator
    // marginTop: -15, // Half the height of the indicator
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
