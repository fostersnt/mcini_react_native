import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    FlatList
} from 'react-native';
import WebView from 'react-native-webview';
import { Dimensions } from 'react-native';
import { AppStyles } from '../utilities/AppStyles';
import SingleMovieCard from './SingleMovieCard';
import { useRoute } from '@react-navigation/native';

const handleHttpError = (syntheticEvent) => {
    const { nativeEvent } = syntheticEvent;
    console.log('HTTP Error:', nativeEvent);
};

const handleOnRenderProcessGone = (syntheticEvent) => {
    const { nativeEvent } = syntheticEvent;
    console.warn('WebView Crashed: ', nativeEvent.didCrash);
}

function ViewAllMoviesPlayer() {
    const { width: screenWidth, height: screenHeight } = Dimensions.get('screen')
    const route = useRoute();

    const { singleMovie, similar_movies, subscriber } = route.params;

    console.log('SUBSCRIBER DATA === ', subscriber);

    console.log('NEW SINGLE MOVIE PLAYER === ', singleMovie['video_url']);

    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.mainVideo}>
                <WebView
                    style={{
                        width: screenWidth,
                        height: screenHeight / 2,
                    }}
                    source={{ uri: singleMovie['video_url'], headers: { Referer: 'https://mcini.tv' } }}
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
                </WebView>
            </View>
            <View style={styles.descriptionContainer}>
                <Text style={styles.descriptionText}>{singleMovie['description']}</Text>
            </View>
            <View style={styles.contentContainer}>
                <FlatList
                    numColumns={3}
                    data={similar_movies}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => {
                        return (
                            <View>
                                <SingleMovieCard similar_movies={similar_movies} movie={item} subscriber={subscriber} />
                            </View>
                        )
                        // return (
                        //     <View style={{ marginBottom: 20 }}>
                        //         <Text style={{ color: 'white' }}>
                        //             {item.title}
                        //         </Text>
                        //         {/* {renderedItem(item.items)} */}
                        //     </View>
                        // )
                    }}
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        padding: 5,
        backgroundColor: AppStyles.generalColors.dark_one
    },
    mainVideo: {
        borderRadius: 20,
        overflow: 'hidden',
        marginBottom: AppStyles.generalMargin.higher
    },
    descriptionContainer: {
        marginBottom: 20,
        color: 'white',
        height: 100
    },
    descriptionText: {
        color: 'white',
        fontSize: 16
    },
    contentContainer: {
        // height: 700,
        // backgroundColor: AppStyles.generalColors.dark_one
    },
});

export default ViewAllMoviesPlayer;
