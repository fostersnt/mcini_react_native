import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import { useSelector } from 'react-redux';

const WatchListScreen = () => {
    const {width: screenWidth} = Dimensions.get('screen');
    const videoWidth = (screenWidth - 20) / 2;
    const subscriberWatchList = useSelector((state) => state.movie.watchList);
    console.log('USER WATCHLIST: ', subscriberWatchList.length);

    const renderItem = ({ item }) => (
        // <TouchableOpacity style={styles.itemContainer}>
        <View style={{
            flex: 1,
            width:videoWidth,
            height:videoWidth,
            margin: 5
        }}>
            <WebView
                source={{ uri: item.video_url }}
                style={styles.thumbnail}
                javaScriptEnabled={true}
            />
            <Text style={styles.title}>{item.title}</Text>
        </View>
        // </TouchableOpacity>
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
        padding: 10,
        backgroundColor: '#fff',
    },
    itemContainer: {
        flex: 1,
        margin: 10,
        // alignItems: 'center',
    },
    title: {
        marginTop: 5,
        fontSize: 14,
        textAlign: 'center',
        color: '#333',
    },
});

export default WatchListScreen;
