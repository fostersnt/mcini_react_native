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
import FastImage from 'react-native-fast-image';

const loadingImage = require('../assets/images/banner.png');

export default function MovieBanner({movieKey}) {
  const {width: screenWidth} = Dimensions.get('window');
  const widthSize = screenWidth - 20;

  // console.log('MOVIE: ', movie);
  // const static_videos = videos;

  // State to manage loading and error
  const [isLoading, setIsLoading] = useState(false);
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
        <View style={styles.indicatorContainer}>
          {/* <FastImage
          source={loadingImage}
          style={[styles.myImage, {width: widthSize}]}
          /> */}
          <ActivityIndicator
            style={styles.loader}
            size="large"
            color={AppStyles.generalColors.white_one}
          />
        </View>
      )}
      <Video
        source={videoSource}
        style={[styles.video, {width: widthSize}]}
        // controls={true}
        resizeMode="cover"
        autoPlay={true}
        playInBackground={true}
        playWhenInactive={true}
        muted={true}
        paused={false}
        onBuffer={() => {
          setIsLoading(true);
          console.log('Video is buffering... === ', movieKey);
        }}
        onLoad={() => {
          setIsLoading(false);
        }}
        poster={loadingImage}
        // posterResizeMode="cover"
        // bufferConfig={{
        //   minBufferMs: 2500,
        //   maxBufferMs: 3000,
        //   bufferForPlaybackMs: 2500,
        //   bufferForPlaybackAfterRebufferMs: 2500,
        // }}
        ignoreSilentSwitch={'ignore'}
        // useTextureView={false}
        controls={false}
        disableFocus={true}
        repeat={true}
        hideShutterView
        // minLoadRetryCount={5}
        shutterColor="transparent"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  indicatorContainer: {
    position: 'absolute',
    zIndex: 2,
    // top: 25,
    // left: 25,
    // transform: [{translateX: -25}, {translateY: -25}],
    // backgroundColor: AppStyles.generalColors.blue,
    // marginBottom: 100,
    justifyContent: 'center',
  },
  loader: {
    position: 'absolute',
    transform: [{translateX: -25}, {translateY: -25}],
    top: '50%',
    left: '50%',
    // zIndex: 1,
  },
  // myImage: {
  //   height: 250,
  //   margin: 10,
  // },
  webViewContainer: {
    marginTop: 20,
    marginBottom: 10,
    position: 'relative',
    borderRadius: 15,
  },
  video: {
    borderRadius: 15,
    height: 250,
    margin: 10,
    backgroundColor: AppStyles.generalColors.dark_one,
    overflow: 'hidden',
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
