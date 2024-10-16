import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import WebView from 'react-native-webview';
import { Dimensions } from 'react-native';
import { AppStyles } from '../utilities/AppStyles';
import SingleMovieCard from './SingleMovieCard';
import { useNavigation, useRoute } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { addOrRemoveFavorite } from '../api/UserAPI';
import { useDispatch, useSelector } from 'react-redux';
import { addMovieToFavorites, setFavoriteMovies } from '../redux/slice/MovieSlice';

const ViewAllMoviesPlayer = () => {
    const { width: screenWidth, height: screenHeight } = Dimensions.get('screen');
    const widthSize = screenWidth - 20;
    const [isFavorite, setIsFavorite] = useState(0);
    const [favoriteColor, setFavoriteColor] = useState('green');
    const navigator = useNavigation();

    const dispatch = useDispatch();
    const route = useRoute();
    const { singleMovie } = route.params;

    const similar_movies = useSelector((state) => state.movie.movies);
    const subscriber = useSelector((state) => state.subscriber.subscriberDetails);
    const favorites = useSelector((state) => state.movie.favoriteMovies);

    useEffect(() => {
        const isFavouriteChange = () => {
            // if (favorites && favorites.length > 0) {
            //     const isFav = favorites.some((item) => item.id === singleMovie.id);
            //     setIsFavorite(isFav ? 1 : 0);
            //     console.log('SAMPLE CHECK === ', isFav);
            // }
            console.log('IS FAVORITE USEEFFECT === ', isFavorite);
        };

        isFavouriteChange();
    }, [isFavorite]);


    const isDescription = singleMovie?.description != null;

    const handleSingleMoviePress = (movie) => {
        navigator.navigate('ViewAllMoviesPlayer', { singleMovie: movie });
    };

    const handleAndOrRemoveFavorites = async () => {

        console.log('IS FAVORITE INITIAL === ', isFavorite);
        setIsFavorite(isFavorite == 0 ? 1 : 0);
        if (isFavorite == 1) {
            setFavoriteColor('pink')
        } else {

            setFavoriteColor('red')
        }
        console.log('IS FAVORITE FINAL === ', isFavorite);

        // const favoriteCheck = favorites?.some((item) => item.id === singleMovie.id) ? 1 : 0;
        // const apiFavorite = isFavorite;

        // try {
        //     const payload = {
        //         msisdn: subscriber.msisdn,
        //         movieId: `${singleMovie.id}`,
        //         isFavorite: `${apiFavorite}`,
        //     };

        //     if (apiFavorite === 1) {
        //         dispatch(addMovieToFavorites(singleMovie));
        //     } else {
        //         const newFavorites = favorites.filter((item) => item.id !== singleMovie.id);
        //         dispatch(setFavoriteMovies(newFavorites));
        //     }

        //     await addOrRemoveFavorite(payload);
        // } catch (error) {
        //     console.error('ERROR OCCURRED === ', error.toString());
        // }
    };

    const ActionIcons = React.memo(({ actionFunc }) => {
        return (

            <TouchableOpacity onPress={actionFunc}>
                <MaterialIcons name='favorite' size={25} color={favoriteColor} style={{ marginLeft: 20 }} />
                {/* <MaterialIcons name='favorite' size={25} color={isFavorite === 1 ? '#00aeef' : '#fff'} style={{ marginLeft: 20 }} /> */}
            </TouchableOpacity>
        )
    });

    const renderMainMovie = () => (
        <View>
            <View style={styles.mainVideo}>
                <WebView
                    style={{
                        backgroundColor: AppStyles.generalColors.dark_four,
                        width: widthSize,
                        // height: screenHeight / 2,
                        height: 400
                    }}
                    source={{ uri: singleMovie['video_url'], headers: { Referer: 'https://mcini.tv' } }}
                    javaScriptEnabled
                    domStorageEnabled
                    allowsInlineMediaPlayback
                    renderError={() => (
                        <View style={styles.errorContainer}>
                            <Text style={styles.errorText}>Failed to load page.</Text>
                        </View>
                    )}
                />
            </View>
            {/* ACTION ICONS HERE */}
            {isDescription && (
                <View style={styles.descriptionContainer}>
                    <Text style={styles.descriptionText}>{singleMovie.description}</Text>
                </View>
            )}
            <View style={[styles.iconsContainer, { marginTop: isDescription ? 0 : 20 }]}>
                <FontAwesome name='thumbs-o-up' size={25} color='#fff' style={{ marginLeft: 10 }} />
                <Entypo name='share' size={25} color='#fff' style={{ marginLeft: 20 }} />
                <ActionIcons actionFunc={handleAndOrRemoveFavorites} />
            </View>
        </View>
    );

    return (
        <View style={styles.contentContainer}>
            <FlatList
                numColumns={3}
                data={[{ id: 0, title: 'my video' }, ...similar_movies]}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (item.id === 0 ? renderMainMovie() : (
                    <View style={{ marginBottom: 10 }}>
                        <SingleMovieCard movie={item} onMoviePressedFunc={handleSingleMoviePress} />
                    </View>
                ))}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        paddingTop: 30,
        backgroundColor: AppStyles.generalColors.dark_four,
    },
    mainVideo: {
        borderRadius: 30,
        overflow: 'hidden',
        marginHorizontal: 10,
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
});

export default ViewAllMoviesPlayer;
