import { View, StyleSheet, FlatList, Dimensions, Text, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, memo } from 'react';
import MovieBanner from '../components/MovieBanner';
import { AppStyles } from '../utilities/AppStyles';
import SingleMovieCard from '../components/SingleMovieCard';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const MemoizedMovieBanner = memo(MovieBanner);
const MemoizedSingleMovieCard = memo(SingleMovieCard);

export default function HomeScreen() {
  const navigator = useNavigation();
  const { width: screenWidth } = Dimensions.get('window');
  const mySize = screenWidth / 3;

  const subscriber = useSelector((state) => state.subscriber.subscriberDetails)
  const movies = useSelector((state) => state.movie.movies)
  const favorites = useSelector((state) => state.movie.favoriteMovies);
  const watchList = useSelector((state) => state.movie.watchList)

  // console.log('SUBSCRIBER DATA === ', subscriber);
  // console.log('MOVIES === ', movies);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [homeBanner, setHomeBanner] = useState([]);

  const handleMoviePressedFunc = (movie) => {
    navigator.navigate('ViewAllMoviesPlayer', { singleMovie: movie });
  };

  useEffect(() => {
    const funcCall = async () => {
      const newBanner = homeBannerData();
      setHomeBanner(newBanner);
    }
    funcCall()
  }, [movies]);

  function homeBannerData() {
    let result = [];
    if (movies && movies.length > 0) {
      result = movies.slice(0, 10);
    }
    return result;
  }

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Refresh logic here
    setIsRefreshing(false);
  };

  const groupedMovies = movies != null ? movies.reduce((result, item) => {
    const { collection_name } = item;
    if (!result[collection_name] || collection_name.toLowerCase() == 'free') {
      result[collection_name] = [];
    }
    // if (collection_name.toLowerCase() != 'free') {
    result[collection_name].push(item);
    // }
    return result;
  }, {}) : [];

  const groupedDataArray = Object.keys(groupedMovies)
    .filter(collection_name => collection_name.toLowerCase() !== 'free') // Filter out "free"
    .map(collection_name => ({
      collection_name,
      items: groupedMovies[collection_name],
    }));

  // console.log('TESTING FOR DATA === ', groupedDataArray[0]);

  const renderedItem = (items) => {
    const displayItems = items.slice(0, 5);
    const showViewAll = items.length > 5;

    const currentCollectionName = showViewAll ? items[0].collection_name : '';

    return (
      <FlatList
        data={displayItems}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(subItem) => {
          return subItem.id.toString();
        }}
        renderItem={({ item }) => {
          return (
            <MemoizedSingleMovieCard
              movie={item}
              onMoviePressedFunc={handleMoviePressedFunc}
            />
          )
        }}
        ListFooterComponent={showViewAll ? (
          <TouchableOpacity
            onPress={() => {
              // setCurrentMovie(item)      
              navigator.navigate('ViewAllMovies', {
                similar_movies: items,
                // single_movie: null,
                subscriber: subscriber
              })
              console.log('CURRENT COLLECTION NAME === ', currentCollectionName);
              console.log('CURRENT COLLECTION DATA === ', items[0]);

            }}
          >
            <View style={[styles.viewAllContainer, { width: mySize }]}>
              <Text style={styles.viewAllText}>VIEW ALL</Text>
            </View>
          </TouchableOpacity>
        ) : null}
      />
    );
  };

  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={[{ collection_name: 'bannerCollection' }, ...groupedDataArray]}
        keyExtractor={(item) => item.collection_name}
        renderItem={({ item }) => {
          if (item.collection_name == 'bannerCollection') {
            return (
              <FlatList
                pagingEnabled
                data={homeBanner}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <MemoizedMovieBanner
                    // myWidth={screenWidth}
                    movie={item}
                  />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                refreshing={isRefreshing}
                onRefresh={handleRefresh}
              />
            )
          } else {
            return (
              <View style={{ marginBottom: 20 }}>
                <Text style={styles.collectionName}>{item.collection_name}</Text>
                {renderedItem(item.items)}
              </View>
            )
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    padding: 0,
    flex: 1,
    paddingTop: 25,
    backgroundColor: AppStyles.generalColors.dark_four,
  },
  collectionName: {
    fontWeight: AppStyles.generalFontWeight.weight_one,
    fontSize: AppStyles.generalFontSize.large,
    color: AppStyles.generalColors.white_one,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  viewAllContainer: {
    flex: 1,
    height: 200,
    borderRadius: 20,
    backgroundColor: AppStyles.generalColors.dark_one,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  viewAllText: {
    color: AppStyles.generalColors.white_one,
    fontWeight: AppStyles.generalFontWeight.weight_one,
    fontSize: AppStyles.generalFontSize.large
  }
});
