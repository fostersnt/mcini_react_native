import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Dimensions, StatusBar, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { useSelector } from 'react-redux';
import { AppStyles } from '../utilities/AppStyles';
import * as Animatable from 'react-native-animatable';

const WatchListScreen = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [key, setKey] = useState(0);

    const { width: screenWidth } = Dimensions.get('screen');
    const videoWidth = (screenWidth - 20) / 2;
    const subscriberWatchList = useSelector((state) => state.movie.watchList);
    console.log('USER WATCHLIST: ', subscriberWatchList.length);

    const renderItem = ({ item }) => (
        <View style={{
            flex: 1,
            width: videoWidth,
            height: videoWidth,
            margin: 5,
            backgroundColor: AppStyles.generalColors.dark_four,
        }}>
            {loading && !error && (
                <ActivityIndicator size="large" color="#fff" style={styles.loader} />
            )}
            {!error ? (
                <WebView
                    source={{ uri: item.video_url }}
                    style={{
                        backgroundColor: AppStyles.generalColors.dark_one
                    }}
                    javaScriptEnabled={true}
                    domStorageEnabled
                    allowsInlineMediaPlayback
                    mediaPlaybackRequiresUserAction={true}
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
                />
            ) : (
                <View style={styles.retryContainer}>
                    {/* <Text style={styles.errorText}>Failed to load the video.</Text> */}
                    <Button title="Retry" onPress={handleRetry} />
                </View>
            )}
            <Text style={styles.title}>{item.title}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={subscriberWatchList}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                numColumns={2} // Display items in grid format (3 per row)
            // contentContainerStyle={styles.list}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 10,
        paddingTop: 40,
        paddingBottom: 20,
        backgroundColor: AppStyles.generalColors.dark_four,
    },
    title: {
        marginTop: 5,
        fontSize: 14,
        textAlign: 'center',
        color: AppStyles.generalColors.white_one,
        // color: '#333',
    },
    loader: {
        color: AppStyles.generalColors.white_one,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -25 }, { translateY: -25 }], // Adjust for centering
        zIndex: 1,
    },
});

export default WatchListScreen;
