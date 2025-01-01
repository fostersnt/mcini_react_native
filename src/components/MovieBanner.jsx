import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, ActivityIndicator, Button } from 'react-native';
import WebView from 'react-native-webview';
import { Text } from 'react-native-animatable';
import { AppStyles } from '../utilities/AppStyles';

export default function MovieBanner({ movie }) {
  const { width: screenWidth } = Dimensions.get('window');
  const widthSize = screenWidth - 20;

  // State to manage loading and error
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleHttpError = (syntheticEvent) => {
    const { nativeEvent } = syntheticEvent;
    console.log('HTTP Error:', nativeEvent);
    setIsLoading(false);
    setHasError(true);
  };

  const handleOnRenderProcessGone = (syntheticEvent) => {
    const { nativeEvent } = syntheticEvent;
    console.warn('WebView Crashed: ', nativeEvent.didCrash);
    setIsLoading(false);
    setHasError(true);
  };

  const handleLoadEnd = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleRetry = () => {
    setIsLoading(true);
    setHasError(false);
  };

  return (
    <View style={[styles.webViewContainer]}>
      {isLoading && (
        <ActivityIndicator style={styles.loader} size="large" color={AppStyles.generalColors.primary} />
      )}
      
      {/* WebView */}
      <WebView
        style={[styles.webView, { width: widthSize }]}
        source={{
          uri: movie.video_url,
          headers: { Referer: 'https://mcini.tv' },
        }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
        onLoadEnd={handleLoadEnd} // Called when loading is done
        onHttpError={handleHttpError} // Handle HTTP errors
        onError={handleOnRenderProcessGone} // Handle WebView crashes
        renderError={() => (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Failed to load page.</Text>
            {hasError && (
              <Button title="Retry" onPress={handleRetry} />
            )}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  webViewContainer: {
    marginTop: 20,
    marginBottom: 10,
  },
  webView: {
    borderRadius: 20,
    height: 250,
    margin: 10,
    backgroundColor: AppStyles.generalColors.dark_one,
  },
  loader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -25 }, { translateY: -25 }],
    backgroundColor: AppStyles.generalColors.blue,
  },
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 250,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});
