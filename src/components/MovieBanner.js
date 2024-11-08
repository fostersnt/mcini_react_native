import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import React from 'react';
import {AppStyles} from '../utilities/AppStyles';
import WebView from 'react-native-webview';
import FastImage from 'react-native-fast-image';

export default function MovieBanner({movie}) {
  // console.log('WIDTH === ', myWidth);
  /*
        The value 10 is based on the padding given to the parent container of this component. This component is used
        in HomeScreen.js
    */
  const {width: screenWidth, height: screenHeight} = Dimensions.get('screen');
  const widthSize = screenWidth - 10;
  const heightSize = screenHeight;

  const handleHttpError = syntheticEvent => {
    const {nativeEvent} = syntheticEvent;
    console.log('HTTP Error:', nativeEvent);
  };

  const handleOnRenderProcessGone = syntheticEvent => {
    const {nativeEvent} = syntheticEvent;
    console.warn('WebView Crashed: ', nativeEvent.didCrash);
  };

  return (
    <View style={styles.webViewContainer}>
      <FastImage
        style={[styles.webView, {width: widthSize}]}
        source={{
          uri: movie.default_thumbnail_filename,
          headers: {Referer: 'https://mcini.tv'},
          cache: FastImage.cacheControl.immutable,
        }}
        resizeMode={FastImage.resizeMode.cover}/>
      {/* <WebView
        style={[styles.webView, {width: widthSize}]}
        source={{
          uri: movie.default_thumbnail_filename,
          headers: {Referer: 'https://mcini.tv'},
        }}
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
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  webViewContainer: {
    borderRadius: 40,
    overflow: 'hidden',
  },
  webView: {
    // backgroundColor: AppStyles.generalColors.dark_four,
    marginBottom: 10,
    height: 250,
    // borderRadius: 60,
    // overflow: 'hidden',
    margin: 5,
  },
});
