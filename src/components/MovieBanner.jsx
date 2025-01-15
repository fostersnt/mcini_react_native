import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Button,
} from 'react-native';
import WebView from 'react-native-webview';
import {Text} from 'react-native-animatable';
import {AppStyles} from '../utilities/AppStyles';
import Video from 'react-native-video';
import RNFS from 'react-native-fs';
import {videos} from '../utilities/banner_videos';

export default function MovieBanner({movieKey}) {
  const {width: screenWidth} = Dimensions.get('window');
  const widthSize = screenWidth - 20;

  // console.log('MOVIE: ', movie);
  // const static_videos = videos;

  // State to manage loading and error
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleHttpError = syntheticEvent => {
    const {nativeEvent} = syntheticEvent;
    console.log('HTTP Error:', nativeEvent);
    setIsLoading(false);
    setHasError(true);
  };

  const handleOnRenderProcessGone = syntheticEvent => {
    const {nativeEvent} = syntheticEvent;
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

  // Dynamically resolve the video key
  const getVideoSource = key => {
    var video_url = '';
    switch (key) {
      case 1:
        video_url = require('../assets/videos/banner_movies/OMOGE.mp4');
        break;
      case 2:
        video_url = require('../assets/videos/banner_movies/Emaa_Pe_Aware.mp4');
        break;
      case 3:
        video_url = require('../assets/videos/banner_movies/AMERICAN_BOY.mp4');
        break;
      default:
        video_url = '';
    }

    return video_url;
  };

  // console.log('MOVIE ARRAY ID: ', movieKey);

  const videoSource = getVideoSource(movieKey);

  // console.log('MOVIE: ', videoSource);

  return (
    <View style={[styles.webViewContainer]}>
      {isLoading && (
        <ActivityIndicator
          style={styles.loader}
          size="large"
          color={AppStyles.generalColors.primary}
        />
      )}

      {/* WebView */}
      {/* <WebView
        style={[styles.webView, { width: widthSize }]}
        source={{
          // uri: movie.video_url,
          uri: movie,
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
      /> */}
      <Video
        source={videoSource}
        style={[styles.video, {width: widthSize}]}
        // controls={true}
        // resizeMode="contain"
        autoPlay={true}
        // playInBackground={false}
        // playWhenInactive={true}
        muted={true}
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
  video: {
    borderRadius: 20,
    height: 250,
    margin: 10,
    backgroundColor: AppStyles.generalColors.dark_one,
  },
  loader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{translateX: -25}, {translateY: -25}],
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
