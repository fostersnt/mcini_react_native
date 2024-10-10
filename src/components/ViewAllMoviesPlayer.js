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
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

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

    const isDescription = (singleMovie != null && singleMovie['description'] != null);

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
            {
            isDescription ? 
            (<View style={styles.descriptionContainer}>
                <Text style={styles.descriptionText}>{singleMovie['description']}</Text>
            </View>) : ''
            }
            <View style={styles.iconsContainer}>
                <View style={{ marginLeft: 10 }}><FontAwesome name='thumbs-o-up' size={25} color={'#00aeef'} /></View>
                <View style={{ marginLeft: 20 }}><Entypo name='share' size={25} color={'#00aeef'} /></View>
                <View style={{ marginLeft: 20 }}><MaterialIcons name='favorite' size={25} color={'#00aeef'} /></View>
            </View>
            <View style={styles.contentContainer}>
                <FlatList
                    numColumns={3}
                    data={similar_movies}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => {
                        return (
                            <View style={{ marginBottom: 10 }}>
                                <SingleMovieCard similar_movies={similar_movies} movie={item} subscriber={subscriber} />
                            </View>
                        )
                    }}
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        paddingHorizontal: 5,
        paddingTop: 30,
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
    },
    descriptionText: {
        color: 'white',
        fontSize: 16
    },
    iconsContainer: {
        marginBottom: 20,
        display: 'flex',
        flexDirection: 'row'
    },
});

export default ViewAllMoviesPlayer;
