import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator, Button } from 'react-native';
import WebView from 'react-native-webview';
import { Dimensions } from 'react-native';
import { AppStyles } from '../utilities/AppStyles';
import SingleMovieCard from './SingleMovieCard';
import { useNavigation, useRoute } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { addMovieToFavorites, setFavoriteMovies } from '../redux/slice/MovieSlice';
import { isInternetActive } from '../utilities/InternetConnection';

const ViewAllMoviesPlayer = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [key, setKey] = useState(0);

    const { width: screenWidth } = Dimensions.get('screen');
    const widthSize = screenWidth;
    const [isFavorite, setIsFavorite] = useState(false);
    const navigator = useNavigation();

    const dispatch = useDispatch();
    const route = useRoute();
    const { singleMovie } = route.params;

    const similar_movies = useSelector((state) => state.movie.movies);
    const favorites = useSelector((state) => state.movie.favoriteMovies);

    const isDescription = singleMovie?.description != null;

    const handleSingleMoviePress = (movie) => {
        navigator.navigate('ViewAllMoviesPlayer', { singleMovie: movie });
    };

    const handleRetry = () => {
        setLoading(true);
        setError(false);
        setKey((prevKey) => prevKey + 1);
    };

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
    };

    useEffect(() => {
        const checkInternet = async () => {
            const isActive = await isInternetActive();
            if (isActive) {
                console.log('Internet is active');
            } else {
                console.log('No active internet connection');
            }
        };
        checkInternet();
    }, []);

    const FavoriteIcon = React.memo(({ isFavorite, toggleFavorite }) => {
        return (
            <TouchableOpacity onPress={toggleFavorite}>
                <Ionicons
                    name={isFavorite ? 'heart' : 'heart-outline'} size={25}
                    color={isFavorite ? '#00aeef' : '#fff'}
                    style={{ marginLeft: 20 }}
                />
            </TouchableOpacity>
        );
    });

    const renderMainMovie = () => (
        <View>
            {loading && !error && <ActivityIndicator size="large" color="#fff" style={styles.loader} />}
            {!error ? (
                <WebView
                    key={key}
                    style={{
                        backgroundColor: AppStyles.generalColors.dark_four,
                        width: widthSize,
                        height: 400,
                        zIndex: 1,
                    }}
                    source={{ uri: singleMovie['video_url'], headers: { Referer: 'https://mcini.tv' } }}
                    javaScriptEnabled
                    domStorageEnabled
                    onLoadStart={() => setLoading(true)}
                    onLoadEnd={() => setLoading(false)}
                    onError={() => setError(true)}
                    allowsInlineMediaPlayback
                mediaPlaybackRequiresUserAction={false}
                // onShouldStartLoadWithRequest={(request) => {
                //     return request.url.startsWith('https://trusted-video-source.com');  // Filter out non-trusted sources
                // }}
                />
            ) : (
                <View>
                    <Button title="Retry" onPress={handleRetry} />
                </View>
            )}
            {isDescription && (
                <View style={styles.descriptionContainer}>
                    <Text style={styles.descriptionText}>{singleMovie.description}</Text>
                </View>
            )}
            <View style={[styles.iconsContainer, { marginTop: isDescription ? 0 : 20 }]}>
                <FontAwesome name="thumbs-o-up" size={25} color="#fff" style={{ marginLeft: 10 }} />
                <Entypo name="share" size={25} color="#fff" style={{ marginLeft: 20 }} />
                <FavoriteIcon isFavorite={isFavorite} toggleFavorite={toggleFavorite} />
            </View>
        </View>
    );

    // const mySingleMovieList = useMemo(() => {
    //     return (
    //         <FlatList
    //             numColumns={3}
    //             data={[{ id: 0, title: 'my video' }, ...similar_movies]}
    //             keyExtractor={(item) => item.id.toString()}
    //             renderItem={({ item }) =>
    //                 item.id === 0 ? (
    //                     renderMainMovie()
    //                 ) : (
    //                     <View style={{ marginBottom: 10 }}>
    //                         <SingleMovieCard movie={item} onMoviePressedFunc={handleSingleMoviePress} />
    //                     </View>
    //                 )
    //             }
    //         />
    //     );
    // }, [similar_movies]);

    return (
        <View style={styles.contentContainer}>
            <FlatList
                numColumns={3}
                data={[{ id: 0, title: 'my video' }, ...similar_movies]}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) =>
                    item.id === 0 ? (
                        renderMainMovie()
                    ) : (
                        <View style={{ marginBottom: 10 }}>
                            <SingleMovieCard movie={item} onMoviePressedFunc={handleSingleMoviePress} />
                        </View>
                    )
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    loader: {
        position: 'absolute',
        top: 200,
        left: '50%',
        transform: [{ translateX: -25 }, { translateY: -25 }],
        zIndex: 10,
    },
    contentContainer: {
        flex: 1,
        paddingTop: 30,
        backgroundColor: AppStyles.generalColors.dark_four,
    },
    descriptionContainer: {
        marginBottom: 20,
        color: 'white',
        padding: 5,
    },
    descriptionText: {
        color: 'white',
        fontSize: 16,
    },
    iconsContainer: {
        marginBottom: 20,
        flexDirection: 'row',
    },
});

export default ViewAllMoviesPlayer;
