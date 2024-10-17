import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator, Button } from 'react-native';
import WebView from 'react-native-webview';
import { Dimensions } from 'react-native';
import { AppStyles } from '../utilities/AppStyles';
import SingleMovieCard from './SingleMovieCard';
import { useNavigation, useRoute } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { addMovieToFavorites, setFavoriteMovies } from '../redux/slice/MovieSlice';

const ViewAllMoviesPlayer = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [key, setKey] = useState(0);

    const { width: screenWidth, height: screenHeight } = Dimensions.get('screen');
    const widthSize = screenWidth - 20;
    const [isFavorite, setIsFavorite] = useState(false);
    const navigator = useNavigation();

    const dispatch = useDispatch();
    const route = useRoute();
    const { singleMovie } = route.params;

    const similar_movies = useSelector((state) => state.movie.movies);
    const subscriber = useSelector((state) => state.subscriber.subscriberDetails);
    const favorites = useSelector((state) => state.movie.favoriteMovies);

    const isDescription = singleMovie?.description != null;

    const handleSingleMoviePress = (movie) => {
        navigator.navigate('ViewAllMoviesPlayer', { singleMovie: movie });
    };

    // Handle add or remove from favorites
    // const handleAndOrRemoveFavorites = () => {
    //     console.log('IS FAVORITE INITIAL === ', isFavorite);
    //     setIsFavorite(isFavorite == 0 ? 1 : 0);
    //     if (isFavorite == 0) {
    //         dispatch(addMovieToFavorites(singleMovie));
    //     } else {
    //         const updatedMovies = favorites != null && favorites.length > 0 ? favorites.filter((item) => item.id != singleMovie.id) : null;
    //         if (updatedMovies != null) {
    //             dispatch(setFavoriteMovies(updatedMovies));
    //         }
    //     }

    //     console.log('IS FAVORITE FINAL === ', isFavorite);
    // };

    const handleRetry = () => {
        setLoading(true)
        setError(false);
        setKey((prevKey) => prevKey + 1);
    };

    // useEffect(() => {
    //     const checkFavorite = () => {
    //         const outcome = favorites != null && favorites.length > 0 ? favorites.some((item) => item.id == singleMovie.id) : false;
    //         if (isFavorite == 0) {
    //             dispatch(addMovieToFavorites(singleMovie));
    //         } else {
    //             const updatedMovies = favorites != null && favorites.length > 0 ? favorites.filter((item) => item.id != singleMovie.id) : null;
    //             dispatch(setFavoriteMovies(updatedMovies));
    //         }
    //         console.log('SOME DATA === ', outcome);
    //     }

    //     checkFavorite()
    // }, [isFavorite])

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
    }

    const FavoriteIcon = React.memo(({ isFavorite, toggleFavorite }) => {
        
        return (
            <TouchableOpacity onPress={toggleFavorite}>
                <Ionicons
                    name={isFavorite ? 'heart' : 'heart-outline'} size={25}
                    color={isFavorite ? '#00aeef' : '#fff'}
                    style={{ marginLeft: 20 }}
                />
            </TouchableOpacity>
        )
    })

    const renderMainMovie = () => (
        <View>
            <View
                style={[
                    styles.mainVideo,
                    {
                        backgroundColor: AppStyles.generalColors.dark_four,
                        width: widthSize,
                        height: 400,
                    },
                ]}
            >
                {loading && !error && <ActivityIndicator size="large" color="#fff" style={styles.loader} />}
                {!error ? (
                    <WebView
                        key={key}
                        style={{
                            backgroundColor: AppStyles.generalColors.dark_four,
                            width: widthSize,
                            height: 400,
                            zIndex: 1, // Ensures WebView content stays behind loader
                        }}
                        source={{ uri: singleMovie['video_url'], headers: { Referer: 'https://mcini.tv' } }}
                        javaScriptEnabled
                        domStorageEnabled
                        onLoadStart={() => setLoading(true)}
                        onLoadEnd={() => setLoading(false)}
                        onError={() => setError(true)}
                        allowsInlineMediaPlayback
                        mediaPlaybackRequiresUserAction={false}
                    />
                ) : (
                    <View>
                        <Button title="Retry" onPress={handleRetry} />
                    </View>
                )}
            </View>
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
        top: '50%',
        left: '50%',
        transform: [{ translateX: -25 }, { translateY: -25 }], // Adjust for centering
        zIndex: 10, // Ensure it appears above the WebView
    },
    contentContainer: {
        flex: 1,
        paddingTop: 30,
        backgroundColor: AppStyles.generalColors.dark_four,
    },
    mainVideo: {
        position: 'relative',
        borderRadius: 30,
        overflow: 'hidden',
        marginHorizontal: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    descriptionContainer: {
        marginBottom: 20,
        color: 'white',
        padding: 5,
    },
    descriptionText: {
        color: 'white',
        fontSize: 16,
        marginTop: AppStyles.generalMargin.higher,
    },
    iconsContainer: {
        marginBottom: 20,
        display: 'flex',
        flexDirection: 'row',
    },
    errorContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 400,
    },
    errorText: {
        color: 'white',
    },
});

export default ViewAllMoviesPlayer;
