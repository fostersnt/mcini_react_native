import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native';
import MoviePlayerScreen from '../screens/MoviePlayerScreen';
import WebView from 'react-native-webview';
import ViewAllMoviesPlayer from './ViewAllMoviesPlayer';

export default function ViewAllMoviesComponent() {
  const route = useRoute()

  const { similar_movies, single_movie } = route.params;

  // console.log('COLLECTION NAME === ',  collection_name);
  // console.log('SINGLE MOVIE === ',  single_movie);

  console.log('SIMILAR MOVIES VIEW ALL NOW === ',  single_movie);

  return (
    // <View style={styles.videoContainer}>
    //   <WebView
    //   style={styles.videoContainer}
    //   source={{ uri: single_movie['video_url'], headers: { Referer: 'https://mcini.tv' } }}
    //   javaScriptEnabled={true}
    //   domStorageEnabled={true}
    //   allowsInlineMediaPlayback={true}
    //   // onHttpError={handleHttpError}
    //   // onError={handleOnRenderProcessGone}
    //   renderError={() => (
    //     <View style={styles.errorContainer}>
    //       <Text style={styles.errorText}>Failed to load page.</Text>
    //     </View>
    //   )}

    //   // onRenderProcessGone={handleOnRenderProcessGone}
    // />
    // </View>
    <ViewAllMoviesPlayer 
      singleMovie={single_movie}
      similar_movies={similar_movies}
    />
  )
}

const styles = StyleSheet.create({
  videoContainer: {
    // flex: 1,
    height: '50%'
  }
})