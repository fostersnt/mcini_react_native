import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    FlatList,
    TouchableOpacity
} from 'react-native';
import WebView from 'react-native-webview';
import { Dimensions } from 'react-native';
import { AppStyles } from '../utilities/AppStyles';
import SingleMovieCard from './SingleMovieCard';
import { useRoute } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { getStorageData, storeData } from '../utilities/LocalStorage';
import { addOrRemoveFavourite } from '../api/UserAPI';

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
    const [madeFavourite, setMadeFavourite] = useState();
    const [favourites, setFavourites] = useState([]);
    const [isFavourite, setIsFavourite] = useState(0);
    const [dataFromStorage, setDataFromStorage] = useState(null);

    const route = useRoute();

    const { singleMovie, similar_movies, subscriber } = route.params;

    const isDescription = (singleMovie != null && singleMovie['description'] != null);

    // console.log('SUBSCRIBER DATA === ', subscriber);

    // console.log('NEW SINGLE MOVIE PLAYER === ', singleMovie['id']);

    useEffect(() => {
        const fetchStorageData = async () => {
            const storageData = await getStorageData();

            setDataFromStorage(storageData);
            setFavourites(dataFromStorage.favourites);

            console.log('STORAGE FAVOURITE MOVIES === ', dataFromStorage['favourites']);
            
            const subscriberFavourites = storageData.favourites || [];
            setFavourites(subscriberFavourites);
            if (favourites != null && favourites.length > 0) {
                const checkExistence = favourites.find((item) => item.id == singleMovie.id);
                setIsFavourite(checkExistence.length > 0 ? 1 : 0);
            }
        }
        fetchStorageData();
    }, []);

    const handleAndOrRemoveFavourites = async () => {

        setIsFavourite(isFavourite == 1 ? 0 : 1);

        const apiFavourite = isFavourite;

        let newFavourites = null;

        try {
            const payload = {
                msisdn: subscriber.msisdn,
                movieId: `${singleMovie.id}`,
                isFavorite: `${apiFavourite}`
            }

            if (isFavourite == 1) {
                // newFavourites = favourites != null ? favourites.push(singleMovie) : null;
                // dataFromStorage.favourites = newFavourites
            } else {
                // newFavourites = favourites != null ? favourites.filter((item) => item.id != singleMovie.id) : null;
                // dataFromStorage.favourites = newFavourites
            }

            // setIsFavourite(0);

            console.log('FAVOURITES === ', favourites);
            console.log('PAYLOAD === ', payload);
            
            await storeData(dataFromStorage)

            const result = await addOrRemoveFavourite(payload);

            console.log('ADD / REMOVE FROM FAVOURITE RESPONSE === ', result);
        } catch (error) {
            console.log('ERROR OCCURED === ', error.toString());
        }
    }

    const renderMainMovie = () => {
        return (
            <View style={styles.mainVideo}>
                <WebView
                    style={{
                        width: screenWidth,
                        height: screenHeight / 2,
                        // marginBottom: 30
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
                {
                    isDescription ?
                        (<View style={styles.descriptionContainer}>
                            <Text style={styles.descriptionText}>{singleMovie['description']}</Text>
                        </View>) : ''
                }
                <View style={[styles.iconsContainer, { marginTop: isDescription ? 0 : 20 }]}>
                    <View style={{ marginLeft: 10 }}><FontAwesome name='thumbs-o-up' size={25} color={'#fff'} /></View>
                    <View style={{ marginLeft: 20 }}><Entypo name='share' size={25} color={'#fff'} /></View>
                    <View style={{ marginLeft: 20 }}>
                        <TouchableOpacity onPress={() => {
                            handleAndOrRemoveFavourites();
                        }}>
                            <MaterialIcons name='favorite' size={25} color={isFavourite == 1 ? '#00aeef' : '#fff'} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.contentContainer}>
            <FlatList
                numColumns={3}
                data={[{ id: 0, title: 'my video' }, ...similar_movies]}
                /*
                    { id: 0, title: 'my video' } is intentionally added to control rendering
                */
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    if (item.id == 0) {
                        return renderMainMovie()
                    } else {
                        // console.log('ID OF CLICKED ITEM === ', singleMovie['id']);
                        return (
                            <View style={{ marginBottom: 10 }}>
                                <SingleMovieCard similar_movies={similar_movies} movie={item} subscriber={subscriber} />
                            </View>
                        )
                    }
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        paddingTop: 30,
        backgroundColor: AppStyles.generalColors.dark_four,
    },
    mainVideo: {
        borderRadius: 30,
        // paddingHorizontal: 10,
        overflow: 'hidden',
    },
    descriptionContainer: {
        marginBottom: 20,
        color: 'white',
    },
    descriptionText: {
        color: 'white',
        fontSize: 16,
        marginTop: AppStyles.generalMargin.higher
    },
    iconsContainer: {
        marginBottom: 20,
        display: 'flex',
        flexDirection: 'row'
    },
});

export default ViewAllMoviesPlayer;
